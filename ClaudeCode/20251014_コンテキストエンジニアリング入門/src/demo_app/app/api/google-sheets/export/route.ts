import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Google Apps Script URL (環境変数から取得することを推奨)
const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { reportIds } = body

    if (!reportIds || !Array.isArray(reportIds)) {
      return NextResponse.json(
        { error: 'Invalid request: reportIds must be an array' },
        { status: 400 }
      )
    }

    // データベースから月報を取得
    const reports = await prisma.monthlyReport.findMany({
      where: {
        id: { in: reportIds },
      },
      include: {
        student: true,
        teacher: true,
      },
    })

    if (reports.length === 0) {
      return NextResponse.json(
        { error: 'No reports found' },
        { status: 404 }
      )
    }

    // Google Apps Scriptに送信するデータを準備
    const exportData = reports.map((report) => ({
      id: report.id,
      studentName: `${report.student.lastName} ${report.student.firstName}`,
      teacherName: `${report.teacher.lastName} ${report.teacher.firstName}`,
      year: report.year,
      month: report.month,
      subject: report.subject,
      totalLessons: report.totalLessons,
      absences: report.absences,
      lateCount: report.lateCount,
      learningMotivation: report.learningMotivation,
      homeworkEngagement: report.homeworkEngagement,
      reviewEngagement: report.reviewEngagement,
      lessonContent: report.lessonContent,
      comprehension: report.comprehension,
      weeklyTestDates: report.weeklyTestDates,
      weeklyTestTopics: report.weeklyTestTopics,
      weeklyTestScores: report.weeklyTestScores,
      weeklyTestPassingScores: report.weeklyTestPassingScores,
      overallComment: report.overallComment,
    }))

    // Google Apps Scriptに転送
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({ reports: exportData }),
    })

    if (!response.ok) {
      throw new Error(`GAS request failed: ${response.statusText}`)
    }

    // GASからのレスポンス
    const gasData = await response.json()

    // スプレッドシートURLをデータベースに保存
    const spreadsheetUrls: Record<string, string> = {}
    if (gasData.spreadsheetUrls) {
      for (const report of reports) {
        const url = gasData.spreadsheetUrls[report.id]
        if (url) {
          await prisma.monthlyReport.update({
            where: { id: report.id },
            data: { googleSheetUrl: url },
          })
          spreadsheetUrls[report.id] = url
        }
      }
    }

    return NextResponse.json({
      success: true,
      spreadsheetUrls,
      message: `${reports.length}件の月報を出力しました`,
    })
  } catch (err) {
    console.error('Google Sheets export error:', err)
    return NextResponse.json(
      { error: 'Failed to export to Google Sheets' },
      { status: 500 }
    )
  }
}

// CORS対応 (必要に応じて)
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
