import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔌 データベース接続テスト開始...\n')

    // 接続テスト
    await prisma.$connect()
    console.log('✅ データベース接続成功！\n')

    // PostgreSQLバージョン確認
    const result: any = await prisma.$queryRaw`SELECT version();`
    console.log('📊 PostgreSQL バージョン:')
    console.log(result[0].version)
    console.log()

    // テーブル一覧の確認
    const tables: any = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `

    console.log('📋 作成されたテーブル一覧:')
    tables.forEach((table: any) => {
      console.log(`  - ${table.table_name}`)
    })
    console.log()

    // テーブルのレコード数を確認
    const userCount = await prisma.user.count()
    const studentCount = await prisma.student.count()
    const teacherCount = await prisma.teacher.count()
    const lessonCount = await prisma.lesson.count()
    const dailyReportCount = await prisma.dailyReport.count()
    const monthlyReportCount = await prisma.monthlyReport.count()

    console.log('📊 各テーブルのレコード数:')
    console.log(`  - users: ${userCount}`)
    console.log(`  - students: ${studentCount}`)
    console.log(`  - teachers: ${teacherCount}`)
    console.log(`  - lessons: ${lessonCount}`)
    console.log(`  - daily_reports: ${dailyReportCount}`)
    console.log(`  - monthly_reports: ${monthlyReportCount}`)
    console.log()

    console.log('🎉 データベースセットアップ完了！')
    console.log('🌐 Prisma Studio: http://localhost:5555')

  } catch (error) {
    console.error('❌ データベース接続エラー:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
