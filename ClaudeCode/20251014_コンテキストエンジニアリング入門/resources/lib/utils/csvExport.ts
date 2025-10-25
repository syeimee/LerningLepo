import type { MonthlyReport } from '../data'

export const exportMonthlyReportsToCSV = (
  reports: MonthlyReport[],
  getStudentName: (id: string) => string,
  getTeacherName: (id: string) => string
) => {
  // CSVヘッダー
  const headers = [
    '月',
    '生徒名',
    '科目',
    '講師名',
    '授業回数',
    '欠席回数',
    '遅刻回数',
    '学習意欲',
    '課題と宿題の取り組み',
    '復習の取り組み',
    '授業内容',
    '理解度',
    '週テスト実施日1',
    '週テスト実施日2',
    '週テスト実施日3',
    '週テスト実施日4',
  ]

  // CSVデータ行を作成
  const rows = reports.map((report) => [
    report.month,
    getStudentName(report.studentId),
    report.subject,
    getTeacherName(report.teacherId),
    report.lessonCount.toString(),
    report.absenceCount.toString(),
    report.lateCount.toString(),
    report.learningMotivation,
    report.homeworkEngagement,
    report.reviewEngagement,
    `"${report.lessonContent.replace(/"/g, '""')}"`, // ダブルクォートをエスケープ
    `"${report.understanding.replace(/"/g, '""')}"`, // ダブルクォートをエスケープ
    report.weeklyTestDates[0] || '',
    report.weeklyTestDates[1] || '',
    report.weeklyTestDates[2] || '',
    report.weeklyTestDates[3] || '',
  ])

  // CSVコンテンツを作成
  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')

  // BOM付きUTF-8に変換（Excelで正しく開くため）
  const bom = '\uFEFF'
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' })

  // ダウンロードリンクを作成
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `monthly_reports_${new Date().toISOString().slice(0, 10)}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
