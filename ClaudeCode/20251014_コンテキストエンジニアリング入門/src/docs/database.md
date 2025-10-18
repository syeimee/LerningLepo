# データベース設計書

## 1. ER図

```
┌─────────────┐
│    User     │
└─────────────┘
      │ 1
      │
      │ 0..1
┌─────────────┐        1       ┌──────────────┐
│   Teacher   │────────────────│    Lesson    │
└─────────────┘     担当        └──────────────┘
                                      │ 1
                                      │
                     1                │ 1
┌─────────────┐────────────────┐     │
│   Student   │     受講        │     │
└─────────────┘                │     │
      │ 1                      │     │
      │                        │     │ 0..1
      │                        │     │
      │ *                      └─────┼────────────┐
      │                              │            │
      │                        ┌─────────────┐    │
      │                        │ DailyReport │    │
      │                        └─────────────┘    │
      │                              │ *          │
      │                              │            │
      │ *                            │ belongs to │
┌────────────────┐                   │            │
│ MonthlyReport  │◄──────────────────┘            │
└────────────────┘                                │
      ▲                                           │
      │                                           │
      │ * (created by)                            │
      └───────────────────────────────────────────┘
         (Teacher)
```

## 2. テーブル定義

### 2.1 User（ユーザー）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | String (UUID) | NO | uuid_generate_v4() | ユーザーID（主キー） |
| email | String | NO | - | メールアドレス（一意） |
| name | String | YES | NULL | 表示名 |
| image | String | YES | NULL | プロフィール画像URL |
| role | Enum | NO | TEACHER | ロール（ADMIN, TEACHER） |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- UNIQUE (email)

**リレーション:**
- User 1 -- 0..1 Teacher

---

### 2.2 Student（生徒）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | String (UUID) | NO | uuid_generate_v4() | 生徒ID（主キー） |
| lastName | String | NO | - | 姓 |
| firstName | String | NO | - | 名 |
| lastNameKana | String | YES | NULL | 姓（カナ） |
| firstNameKana | String | YES | NULL | 名（カナ） |
| grade | String | YES | NULL | 学年（例: 高3） |
| schoolName | String | YES | NULL | 在籍校名 |
| targetUniversity | String | YES | NULL | 志望校 |
| email | String | YES | NULL | メールアドレス |
| phone | String | YES | NULL | 電話番号 |
| parentName | String | YES | NULL | 保護者氏名 |
| parentEmail | String | YES | NULL | 保護者メール |
| parentPhone | String | YES | NULL | 保護者電話 |
| status | Enum | NO | ACTIVE | 在籍状況（ACTIVE, SUSPENDED, WITHDRAWN） |
| notes | Text | YES | NULL | 備考 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- INDEX (status)
- INDEX (lastName, firstName)

**リレーション:**
- Student 1 -- * Lesson
- Student 1 -- * MonthlyReport

---

### 2.3 Teacher（講師）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | String (UUID) | NO | uuid_generate_v4() | 講師ID（主キー） |
| userId | String (UUID) | NO | - | ユーザーID（外部キー） |
| lastName | String | NO | - | 姓 |
| firstName | String | NO | - | 名 |
| lastNameKana | String | YES | NULL | 姓（カナ） |
| firstNameKana | String | YES | NULL | 名（カナ） |
| email | String | NO | - | メールアドレス |
| phone | String | YES | NULL | 電話番号 |
| subjects | String[] | YES | [] | 指導可能科目（配列） |
| status | Enum | NO | ACTIVE | 在籍状況（ACTIVE, INACTIVE） |
| notes | Text | YES | NULL | 備考 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- UNIQUE (userId)
- INDEX (status)
- INDEX (email)

**リレーション:**
- Teacher * -- 1 User
- Teacher 1 -- * Lesson
- Teacher 1 -- * DailyReport
- Teacher 1 -- * MonthlyReport

---

### 2.4 Lesson（授業コマ）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | String (UUID) | NO | uuid_generate_v4() | 授業コマID（主キー） |
| studentId | String (UUID) | NO | - | 生徒ID（外部キー） |
| teacherId | String (UUID) | NO | - | 講師ID（外部キー） |
| subject | String | NO | - | 科目 |
| date | Date | NO | - | 授業日 |
| startTime | String | NO | - | 開始時間（例: "10:00"） |
| endTime | String | NO | - | 終了時間（例: "12:00"） |
| location | String | YES | NULL | 授業場所（教室名など） |
| status | Enum | NO | SCHEDULED | ステータス（SCHEDULED, COMPLETED, CANCELLED） |
| notes | Text | YES | NULL | 備考 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- INDEX (studentId)
- INDEX (teacherId)
- INDEX (date)
- INDEX (status)
- COMPOSITE INDEX (date, startTime, teacherId) -- 講師のスケジュール重複チェック用
- COMPOSITE INDEX (date, startTime, studentId) -- 生徒のスケジュール重複チェック用

**リレーション:**
- Lesson * -- 1 Student
- Lesson * -- 1 Teacher
- Lesson 1 -- 0..1 DailyReport

---

### 2.5 DailyReport（日報）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | String (UUID) | NO | uuid_generate_v4() | 日報ID（主キー） |
| lessonId | String (UUID) | NO | - | 授業コマID（外部キー・一意） |
| teacherId | String (UUID) | NO | - | 講師ID（外部キー） |
| studentId | String (UUID) | NO | - | 生徒ID（外部キー） |
| subject | String | NO | - | 科目 |
| lessonDate | Date | NO | - | 授業日 |
| theme | String | NO | - | 学習テーマ |
| content | Text | NO | - | 授業内容 |
| materials | String | YES | NULL | 使用教材 |
| understanding | Int | NO | 3 | 理解度（1-5） |
| homework | Text | YES | NULL | 宿題内容 |
| nextPlan | Text | YES | NULL | 次回予定内容 |
| remarks | Text | YES | NULL | 特記事項・保護者への連絡 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- UNIQUE (lessonId)
- INDEX (teacherId)
- INDEX (studentId)
- INDEX (lessonDate)

**リレーション:**
- DailyReport 1 -- 1 Lesson
- DailyReport * -- 1 Teacher
- DailyReport * -- 1 Student

**制約:**
- 日報作成時、対応するLessonのstatusをCOMPLETEDに更新

---

### 2.6 MonthlyReport（月報）

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | String (UUID) | NO | uuid_generate_v4() | 月報ID（主キー） |
| studentId | String (UUID) | NO | - | 生徒ID（外部キー） |
| teacherId | String (UUID) | NO | - | 作成講師ID（外部キー） |
| subject | String | NO | - | 科目 |
| year | Int | NO | - | 対象年 |
| month | Int | NO | - | 対象月（1-12） |
| totalLessons | Int | NO | 0 | 授業回数 |
| absences | Int | NO | 0 | 欠席数 |
| lateCount | Int | NO | 0 | 遅刻数 |
| learningMotivation | Int | NO | 2 | 学習意欲（1-3: 低い/普通/高い） |
| homeworkEngagement | Int | NO | 2 | 課題・宿題の取り組み（1-3） |
| reviewEngagement | Int | NO | 2 | 復習の取り組み（1-3） |
| lessonContent | Text | NO | - | 授業内容（500文字） |
| comprehension | Text | NO | - | 理解度（500文字） |
| weeklyTestDates | Date[] | YES | [] | 週テスト日付（最大4回分） |
| weeklyTestTopics | String[] | YES | [] | 週テスト出題内容（最大4回分） |
| weeklyTestScores | Int[] | YES | [] | 得点（最大4回分） |
| weeklyTestPassingScores | Int[] | YES | [] | 合格点（最大4回分） |
| overallComment | Text | NO | - | 総評（500文字） |
| googleSheetUrl | String | YES | NULL | Google SheetsのURL |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- INDEX (studentId)
- INDEX (teacherId)
- COMPOSITE INDEX (studentId, teacherId, subject, year, month) -- 生徒・講師・科目・年月の組み合わせで一意性確保
- INDEX (year, month)

**リレーション:**
- MonthlyReport * -- 1 Student
- MonthlyReport * -- 1 Teacher

**制約:**
- learningMotivation, homeworkEngagement, reviewEngagement: 1-3の範囲
- weeklyTestDates, weeklyTestTopics, weeklyTestScores, weeklyTestPassingScores: 配列長は最大4
- lessonContent, comprehension, overallComment: 最大500文字

---

## 3. Enumの定義

### 3.1 UserRole
```prisma
enum UserRole {
  ADMIN    // 管理者
  TEACHER  // 講師
}
```

### 3.2 StudentStatus
```prisma
enum StudentStatus {
  ACTIVE      // 在籍中
  SUSPENDED   // 休会
  WITHDRAWN   // 退会
}
```

### 3.3 TeacherStatus
```prisma
enum TeacherStatus {
  ACTIVE    // 在籍中
  INACTIVE  // 退職
}
```

### 3.4 LessonStatus
```prisma
enum LessonStatus {
  SCHEDULED  // 予定
  COMPLETED  // 完了
  CANCELLED  // キャンセル
}
```

---

## 4. Prismaスキーマ

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================================
// User
// ========================================
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  image     String?
  role      UserRole @default(TEACHER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  teacher Teacher?

  @@map("users")
}

enum UserRole {
  ADMIN
  TEACHER
}

// ========================================
// Student
// ========================================
model Student {
  id                String        @id @default(uuid())
  lastName          String
  firstName         String
  lastNameKana      String?
  firstNameKana     String?
  grade             String?
  schoolName        String?
  targetUniversity  String?
  email             String?
  phone             String?
  parentName        String?
  parentEmail       String?
  parentPhone       String?
  status            StudentStatus @default(ACTIVE)
  notes             String?       @db.Text
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  lessons        Lesson[]
  dailyReports   DailyReport[]
  monthlyReports MonthlyReport[]

  @@index([status])
  @@index([lastName, firstName])
  @@map("students")
}

enum StudentStatus {
  ACTIVE
  SUSPENDED
  WITHDRAWN
}

// ========================================
// Teacher
// ========================================
model Teacher {
  id            String        @id @default(uuid())
  userId        String        @unique
  lastName      String
  firstName     String
  lastNameKana  String?
  firstNameKana String?
  email         String
  phone         String?
  subjects      String[]
  status        TeacherStatus @default(ACTIVE)
  notes         String?       @db.Text
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  user           User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessons        Lesson[]
  dailyReports   DailyReport[]
  monthlyReports MonthlyReport[]

  @@index([status])
  @@index([email])
  @@map("teachers")
}

enum TeacherStatus {
  ACTIVE
  INACTIVE
}

// ========================================
// Lesson
// ========================================
model Lesson {
  id        String       @id @default(uuid())
  studentId String
  teacherId String
  subject   String
  date      DateTime     @db.Date
  startTime String
  endTime   String
  location  String?
  status    LessonStatus @default(SCHEDULED)
  notes     String?      @db.Text
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt

  student     Student      @relation(fields: [studentId], references: [id], onDelete: Cascade)
  teacher     Teacher      @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  dailyReport DailyReport?

  @@index([studentId])
  @@index([teacherId])
  @@index([date])
  @@index([status])
  @@index([date, startTime, teacherId])
  @@index([date, startTime, studentId])
  @@map("lessons")
}

enum LessonStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
}

// ========================================
// DailyReport
// ========================================
model DailyReport {
  id            String   @id @default(uuid())
  lessonId      String   @unique
  teacherId     String
  studentId     String
  subject       String
  lessonDate    DateTime @db.Date
  theme         String
  content       String   @db.Text
  materials     String?
  understanding Int      @default(3)
  homework      String?  @db.Text
  nextPlan      String?  @db.Text
  remarks       String?  @db.Text
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  lesson  Lesson  @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  teacher Teacher @relation(fields: [teacherId], references: [id], onDelete: Cascade)
  student Student @relation(fields: [studentId], references: [id], onDelete: Cascade)

  @@index([teacherId])
  @@index([studentId])
  @@index([lessonDate])
  @@map("daily_reports")
}

// ========================================
// MonthlyReport
// ========================================
model MonthlyReport {
  id                     String     @id @default(uuid())
  studentId              String
  teacherId              String
  subject                String
  year                   Int
  month                  Int
  totalLessons           Int        @default(0)
  absences               Int        @default(0)
  lateCount              Int        @default(0)
  learningMotivation     Int        @default(2)
  homeworkEngagement     Int        @default(2)
  reviewEngagement       Int        @default(2)
  lessonContent          String     @db.Text
  comprehension          String     @db.Text
  weeklyTestDates        DateTime[] @db.Date
  weeklyTestTopics       String[]
  weeklyTestScores       Int[]
  weeklyTestPassingScores Int[]
  overallComment         String     @db.Text
  googleSheetUrl         String?
  createdAt              DateTime   @default(now())
  updatedAt              DateTime   @updatedAt

  student Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
  teacher Teacher @relation(fields: [teacherId], references: [id], onDelete: Cascade)

  @@index([studentId])
  @@index([teacherId])
  @@index([studentId, teacherId, subject, year, month])
  @@index([year, month])
  @@map("monthly_reports")
}
```

---

## 5. インデックス戦略

### 5.1 パフォーマンス重視のインデックス
- **日付検索**: `lessons.date`, `daily_reports.lessonDate`
- **ステータス検索**: `students.status`, `teachers.status`, `lessons.status`
- **リレーション**: 外部キーには自動的にインデックスが作成される

### 5.2 複合インデックス
- **スケジュール重複チェック**: `(date, startTime, teacherId)`, `(date, startTime, studentId)`
- **月報の一意性**: `(studentId, year, month)`

---

## 6. データの整合性

### 6.1 外部キー制約
- `onDelete: Cascade`: 親レコード削除時に子レコードも削除
- `onDelete: SetNull`: 親レコード削除時に外部キーをNULLに設定

### 6.2 バリデーション
- **理解度**: 1-5の範囲
- **出席率**: 0-100%の範囲
- **月**: 1-12の範囲

### 6.3 トリガー・制約（アプリケーションレベル）
- 日報作成時、対応するLessonのstatusをCOMPLETEDに更新
- スケジュール重複チェック
- 月報の重複作成防止

---

## 7. サンプルクエリ

### 7.1 生徒の授業スケジュール取得
```typescript
const lessons = await prisma.lesson.findMany({
  where: {
    studentId: "student-id",
    date: {
      gte: startDate,
      lte: endDate,
    },
  },
  include: {
    teacher: true,
    dailyReport: true,
  },
  orderBy: [
    { date: 'asc' },
    { startTime: 'asc' },
  ],
});
```

### 7.2 講師の日報一覧取得
```typescript
const reports = await prisma.dailyReport.findMany({
  where: {
    teacherId: "teacher-id",
    lessonDate: {
      gte: startDate,
      lte: endDate,
    },
  },
  include: {
    student: true,
    lesson: true,
  },
  orderBy: {
    lessonDate: 'desc',
  },
});
```

### 7.3 月報生成用データ集約
```typescript
const dailyReports = await prisma.dailyReport.findMany({
  where: {
    studentId: "student-id",
    lessonDate: {
      gte: new Date(year, month - 1, 1),
      lt: new Date(year, month, 1),
    },
  },
  include: {
    teacher: true,
    lesson: true,
  },
  orderBy: {
    lessonDate: 'asc',
  },
});
```

---

**作成日**: 2025-10-14
**バージョン**: 1.0
