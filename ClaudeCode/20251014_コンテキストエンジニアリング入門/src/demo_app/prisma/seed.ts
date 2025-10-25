import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 シードデータ投入開始...\n')

  // 既存データの削除
  console.log('📝 既存データをクリーンアップ中...')
  await prisma.monthlyReport.deleteMany()
  await prisma.dailyReport.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.student.deleteMany()
  await prisma.user.deleteMany()
  console.log('✅ クリーンアップ完了\n')

  // 生徒データの投入
  console.log('👨‍🎓 生徒データを投入中...')

  const students = [
    {
      lastName: '田中',
      firstName: '太郎',
      lastNameKana: 'タナカ',
      firstNameKana: 'タロウ',
      grade: '高3',
      targetUniversity: '東京大学理科三類',
      email: 'tanaka.taro@example.com',
      phone: '090-1234-5678',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 物理、化学',
    },
    {
      lastName: '佐藤',
      firstName: '花子',
      lastNameKana: 'サトウ',
      firstNameKana: 'ハナコ',
      grade: '高3',
      targetUniversity: '京都大学医学部',
      email: 'sato.hanako@example.com',
      phone: '090-2345-6789',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 数学',
    },
    {
      lastName: '鈴木',
      firstName: '一郎',
      lastNameKana: 'スズキ',
      firstNameKana: 'イチロウ',
      grade: '高2',
      targetUniversity: '大阪大学医学部',
      email: 'suzuki.ichiro@example.com',
      phone: '090-3456-7890',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 英語、化学',
    },
    {
      lastName: '高橋',
      firstName: '美咲',
      lastNameKana: 'タカハシ',
      firstNameKana: 'ミサキ',
      grade: '高3',
      targetUniversity: '慶應義塾大学医学部',
      email: 'takahashi.misaki@example.com',
      phone: '090-4567-8901',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 生物',
    },
    {
      lastName: '伊藤',
      firstName: '健太',
      lastNameKana: 'イトウ',
      firstNameKana: 'ケンタ',
      grade: '高3',
      targetUniversity: '東京医科歯科大学',
      email: 'ito.kenta@example.com',
      phone: '090-5678-9012',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 物理、数学',
    },
    {
      lastName: '渡辺',
      firstName: 'さくら',
      lastNameKana: 'ワタナベ',
      firstNameKana: 'サクラ',
      grade: '高2',
      targetUniversity: '順天堂大学医学部',
      email: 'watanabe.sakura@example.com',
      phone: '090-6789-0123',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 化学',
    },
    {
      lastName: '山本',
      firstName: '大輔',
      lastNameKana: 'ヤマモト',
      firstNameKana: 'ダイスケ',
      grade: '高3',
      targetUniversity: '名古屋大学医学部',
      email: 'yamamoto.daisuke@example.com',
      phone: '090-7890-1234',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 英語',
    },
    {
      lastName: '中村',
      firstName: '優子',
      lastNameKana: 'ナカムラ',
      firstNameKana: 'ユウコ',
      grade: '高2',
      targetUniversity: '北海道大学医学部',
      email: 'nakamura.yuko@example.com',
      phone: '090-8901-2345',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 数学、物理',
    },
    {
      lastName: '小林',
      firstName: '翔太',
      lastNameKana: 'コバヤシ',
      firstNameKana: 'ショウタ',
      grade: '高3',
      targetUniversity: '九州大学医学部',
      email: 'kobayashi.shota@example.com',
      phone: '090-9012-3456',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 生物、化学',
    },
    {
      lastName: '加藤',
      firstName: '愛美',
      lastNameKana: 'カトウ',
      firstNameKana: 'マナミ',
      grade: '高3',
      targetUniversity: '東北大学医学部',
      email: 'kato.manami@example.com',
      phone: '090-0123-4567',
      status: 'ACTIVE' as const,
      notes: '苦手科目: 物理',
    },
  ]

  for (const student of students) {
    await prisma.student.create({
      data: student,
    })
  }

  const studentCount = await prisma.student.count()
  console.log(`✅ ${studentCount}名の生徒データを投入しました\n`)

  // 管理者ユーザーの作成
  console.log('👤 管理者ユーザーを作成中...')
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@school.example.com',
      name: '管理者',
      role: 'ADMIN',
    },
  })
  console.log(`✅ 管理者ユーザーを作成: ${adminUser.email}\n`)

  // 講師ユーザーとTeacherレコードの作成
  console.log('👨‍🏫 講師データを投入中...')

  const teacherData = [
    {
      email: 'yamada.taro@school.example.com',
      name: '山田 太郎',
      lastName: '山田',
      firstName: '太郎',
      subjects: ['数学', '物理'],
    },
    {
      email: 'tanaka.hanako@school.example.com',
      name: '田中 花子',
      lastName: '田中',
      firstName: '花子',
      subjects: ['英語', '国語'],
    },
    {
      email: 'suzuki.jiro@school.example.com',
      name: '鈴木 次郎',
      lastName: '鈴木',
      firstName: '次郎',
      subjects: ['化学', '生物'],
    },
  ]

  for (const teacher of teacherData) {
    const user = await prisma.user.create({
      data: {
        email: teacher.email,
        name: teacher.name,
        role: 'TEACHER',
      },
    })

    await prisma.teacher.create({
      data: {
        userId: user.id,
        lastName: teacher.lastName,
        firstName: teacher.firstName,
        email: teacher.email,
        subjects: teacher.subjects,
        status: 'ACTIVE',
      },
    })
  }

  const teacherCount = await prisma.teacher.count()
  console.log(`✅ ${teacherCount}名の講師データを投入しました\n`)

  // 投入したデータを取得
  const allStudents = await prisma.student.findMany()
  const allTeachers = await prisma.teacher.findMany()

  // 授業データの投入
  console.log('📚 授業データを投入中...')

  // 今日の日付を基準に授業を作成
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 今週の月曜日を取得
  const getMonday = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    d.setDate(diff)
    return d
  }

  const thisMonday = getMonday(today)

  const lessonSchedule = [
    // 今週の授業
    { studentIndex: 0, teacherIndex: 0, subject: '数学', dayOffset: 0, startTime: '09:00', endTime: '10:00' }, // 月曜1限
    { studentIndex: 1, teacherIndex: 1, subject: '英語', dayOffset: 0, startTime: '10:10', endTime: '11:10' }, // 月曜2限
    { studentIndex: 2, teacherIndex: 2, subject: '化学', dayOffset: 1, startTime: '09:00', endTime: '10:00' }, // 火曜1限
    { studentIndex: 3, teacherIndex: 0, subject: '物理', dayOffset: 1, startTime: '14:30', endTime: '15:30' }, // 火曜5限
    { studentIndex: 4, teacherIndex: 1, subject: '英語', dayOffset: 2, startTime: '10:10', endTime: '11:10' }, // 水曜2限
    { studentIndex: 5, teacherIndex: 2, subject: '生物', dayOffset: 2, startTime: '13:20', endTime: '14:20' }, // 水曜4限
    { studentIndex: 6, teacherIndex: 0, subject: '数学', dayOffset: 3, startTime: '09:00', endTime: '10:00' }, // 木曜1限
    { studentIndex: 7, teacherIndex: 1, subject: '国語', dayOffset: 3, startTime: '11:20', endTime: '12:20' }, // 木曜3限
    { studentIndex: 8, teacherIndex: 2, subject: '化学', dayOffset: 4, startTime: '14:30', endTime: '15:30' }, // 金曜5限
    { studentIndex: 9, teacherIndex: 0, subject: '物理', dayOffset: 4, startTime: '15:40', endTime: '16:40' }, // 金曜6限

    // 来週の授業
    { studentIndex: 0, teacherIndex: 0, subject: '数学', dayOffset: 7, startTime: '09:00', endTime: '10:00' }, // 次週月曜1限
    { studentIndex: 1, teacherIndex: 1, subject: '英語', dayOffset: 7, startTime: '10:10', endTime: '11:10' }, // 次週月曜2限
    { studentIndex: 2, teacherIndex: 2, subject: '生物', dayOffset: 8, startTime: '13:20', endTime: '14:20' }, // 次週火曜4限
    { studentIndex: 3, teacherIndex: 0, subject: '数学', dayOffset: 9, startTime: '09:00', endTime: '10:00' }, // 次週水曜1限
    { studentIndex: 4, teacherIndex: 1, subject: '国語', dayOffset: 10, startTime: '14:30', endTime: '15:30' }, // 次週木曜5限
    { studentIndex: 5, teacherIndex: 2, subject: '化学', dayOffset: 11, startTime: '10:10', endTime: '11:10' }, // 次週金曜2限
  ]

  for (const schedule of lessonSchedule) {
    const lessonDate = new Date(thisMonday)
    lessonDate.setDate(thisMonday.getDate() + schedule.dayOffset)

    await prisma.lesson.create({
      data: {
        studentId: allStudents[schedule.studentIndex].id,
        teacherId: allTeachers[schedule.teacherIndex].id,
        subject: schedule.subject,
        date: lessonDate,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        status: 'SCHEDULED',
        notes: 'デモ授業',
      },
    })
  }

  const lessonCount = await prisma.lesson.count()
  console.log(`✅ ${lessonCount}件の授業データを投入しました\n`)

  // 日報データの投入（過去の授業に対して）
  console.log('📝 日報データを投入中...')

  // 先週の授業を取得してCOMPLETEDにし、日報を作成
  const pastDate = new Date(thisMonday)
  pastDate.setDate(thisMonday.getDate() - 7) // 先週

  const pastLessons = await prisma.lesson.findMany({
    where: {
      date: {
        lt: thisMonday,
      },
    },
    take: 5, // 5件の日報を作成
  })

  for (const lesson of pastLessons) {
    // 授業をCOMPLETEDに更新
    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { status: 'COMPLETED' },
    })

    // 日報を作成
    await prisma.dailyReport.create({
      data: {
        lessonId: lesson.id,
        teacherId: lesson.teacherId,
        studentId: lesson.studentId,
        subject: lesson.subject,
        lessonDate: lesson.date,
        theme: '基礎固めと応用問題演習',
        content: '前回の復習から始め、新しい単元の説明を行いました。演習問題を通じて理解度を確認し、苦手な部分を重点的に指導しました。',
        materials: '教科書、問題集、プリント',
        understanding: Math.floor(Math.random() * 2) + 3, // 3-5のランダム
        homework: '問題集 p.50-52、復習プリント',
        nextPlan: '次回は応用問題と過去問演習を行う予定です。',
        remarks: '集中力が高く、積極的に質問していました。',
      },
    })
  }

  const dailyReportCount = await prisma.dailyReport.count()
  console.log(`✅ ${dailyReportCount}件の日報データを投入しました\n`)

  // 月報データの投入
  console.log('📋 月報データを投入中...')

  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)

  // 最初の3人の生徒の月報を作成
  for (let i = 0; i < 3; i++) {
    await prisma.monthlyReport.create({
      data: {
        studentId: allStudents[i].id,
        teacherId: allTeachers[i % allTeachers.length].id,
        subject: ['数学', '英語', '化学'][i],
        year: lastMonth.getFullYear(),
        month: lastMonth.getMonth() + 1,
        totalLessons: 4,
        absences: 0,
        lateCount: 0,
        learningMotivation: 3,
        homeworkEngagement: 3,
        reviewEngagement: 2,
        lessonContent: '今月は基礎から応用まで幅広く学習しました。特に重要単元については時間をかけて丁寧に指導しました。',
        comprehension: '基本的な理解は十分です。応用問題にも積極的に取り組んでいます。',
        weeklyTestDates: [
          new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 7),
          new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 14),
        ],
        weeklyTestTopics: ['基礎演習', '応用問題'],
        weeklyTestScores: [85, 88],
        weeklyTestPassingScores: [80, 80],
        overallComment: '着実に実力をつけています。この調子で頑張ってください。',
      },
    })
  }

  const monthlyReportCount = await prisma.monthlyReport.count()
  console.log(`✅ ${monthlyReportCount}件の月報データを投入しました\n`)

  console.log('🎉 シードデータ投入完了！\n')
  console.log('📊 投入データサマリー:')
  console.log(`  - ユーザー: ${await prisma.user.count()}名`)
  console.log(`  - 生徒: ${await prisma.student.count()}名`)
  console.log(`  - 講師: ${await prisma.teacher.count()}名`)
  console.log(`  - 授業: ${await prisma.lesson.count()}件`)
  console.log(`  - 日報: ${await prisma.dailyReport.count()}件`)
  console.log(`  - 月報: ${await prisma.monthlyReport.count()}件`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ エラーが発生しました:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
