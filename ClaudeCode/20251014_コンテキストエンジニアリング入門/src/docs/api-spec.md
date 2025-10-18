# API仕様書

## 1. 概要

本システムでは、Next.js 14のApp Routerを使用し、以下の2つの方法でAPIを実装します：

1. **Server Actions**: データの作成・更新・削除
2. **API Routes**: 外部API連携、複雑なロジック

---

## 2. 認証・認可

### 2.1 認証方式
- **NextAuth.js v5** (または Supabase Auth)
- Google OAuth 2.0

### 2.2 認証ヘッダー
```
Authorization: Bearer <JWT_TOKEN>
```

### 2.3 権限
- **ADMIN**: 全リソースへのアクセス
- **TEACHER**: 自分に関連するリソースのみアクセス

---

## 3. Server Actions

### 3.1 生徒管理

#### 3.1.1 生徒の作成
**Function**: `createStudent`
**File**: `app/students/actions.ts`

**Input**:
```typescript
{
  lastName: string;
  firstName: string;
  lastNameKana?: string;
  firstNameKana?: string;
  grade?: string;
  schoolName?: string;
  targetUniversity?: string;
  email?: string;
  phone?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  notes?: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: Student;
  error?: string;
}
```

**権限**: ADMIN

---

#### 3.1.2 生徒の更新
**Function**: `updateStudent`
**File**: `app/students/actions.ts`

**Input**:
```typescript
{
  id: string;
  data: Partial<Student>;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: Student;
  error?: string;
}
```

**権限**: ADMIN

---

#### 3.1.3 生徒の削除
**Function**: `deleteStudent`
**File**: `app/students/actions.ts`

**Input**:
```typescript
{
  id: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  error?: string;
}
```

**権限**: ADMIN

---

### 3.2 講師管理

#### 3.2.1 講師の作成
**Function**: `createTeacher`
**File**: `app/teachers/actions.ts`

**Input**:
```typescript
{
  userId: string;
  lastName: string;
  firstName: string;
  lastNameKana?: string;
  firstNameKana?: string;
  email: string;
  phone?: string;
  subjects?: string[];
  notes?: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: Teacher;
  error?: string;
}
```

**権限**: ADMIN

---

#### 3.2.2 講師の更新
**Function**: `updateTeacher`
**File**: `app/teachers/actions.ts`

**Input**:
```typescript
{
  id: string;
  data: Partial<Teacher>;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: Teacher;
  error?: string;
}
```

**権限**: ADMIN

---

#### 3.2.3 講師の削除
**Function**: `deleteTeacher`
**File**: `app/teachers/actions.ts`

**Input**:
```typescript
{
  id: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  error?: string;
}
```

**権限**: ADMIN

---

### 3.3 授業コマ管理

#### 3.3.1 授業コマの作成
**Function**: `createLesson`
**File**: `app/schedule/actions.ts`

**Input**:
```typescript
{
  studentId: string;
  teacherId: string;
  subject: string;
  date: Date;
  startTime: string;  // "HH:MM"
  endTime: string;    // "HH:MM"
  location?: string;
  notes?: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: Lesson;
  error?: string;
}
```

**権限**: ADMIN

**バリデーション**:
- スケジュール重複チェック（講師・生徒）
- 開始時刻 < 終了時刻

---

#### 3.3.2 授業コマの更新
**Function**: `updateLesson`
**File**: `app/schedule/actions.ts`

**Input**:
```typescript
{
  id: string;
  data: Partial<Lesson>;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: Lesson;
  error?: string;
}
```

**権限**: ADMIN

---

#### 3.3.3 授業コマの削除
**Function**: `deleteLesson`
**File**: `app/schedule/actions.ts`

**Input**:
```typescript
{
  id: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  error?: string;
}
```

**権限**: ADMIN

---

#### 3.3.4 授業コマのキャンセル
**Function**: `cancelLesson`
**File**: `app/schedule/actions.ts`

**Input**:
```typescript
{
  id: string;
  reason?: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: Lesson;
  error?: string;
}
```

**権限**: ADMIN

---

### 3.4 日報管理

#### 3.4.1 日報の作成
**Function**: `createDailyReport`
**File**: `app/reports/daily/actions.ts`

**Input**:
```typescript
{
  lessonId: string;
  theme: string;
  content: string;
  materials?: string;
  understanding: number;  // 1-5
  homework?: string;
  nextPlan?: string;
  remarks?: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: DailyReport;
  error?: string;
}
```

**権限**: ADMIN, TEACHER（自分の授業のみ）

**副作用**:
- 対応するLessonのstatusをCOMPLETEDに更新

---

#### 3.4.2 日報の更新
**Function**: `updateDailyReport`
**File**: `app/reports/daily/actions.ts`

**Input**:
```typescript
{
  id: string;
  data: Partial<DailyReport>;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: DailyReport;
  error?: string;
}
```

**権限**: ADMIN, TEACHER（自分の日報のみ）

---

#### 3.4.3 日報の削除
**Function**: `deleteDailyReport`
**File**: `app/reports/daily/actions.ts`

**Input**:
```typescript
{
  id: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  error?: string;
}
```

**権限**: ADMIN, TEACHER（自分の日報のみ）

**副作用**:
- 対応するLessonのstatusをSCHEDULEDに戻す

---

### 3.5 月報管理

#### 3.5.1 月報の作成
**Function**: `createMonthlyReport`
**File**: `app/reports/monthly/actions.ts`

**Input**:
```typescript
{
  studentId: string;
  subject: string;
  year: number;
  month: number;  // 1-12
  totalLessons: number;
  absences: number;
  lateCount: number;
  learningMotivation: number;  // 1-3
  homeworkEngagement: number;  // 1-3
  reviewEngagement: number;    // 1-3
  lessonContent: string;       // 最大500文字
  comprehension: string;       // 最大500文字
  weeklyTestDates?: Date[];    // 最大4回分
  weeklyTestTopics?: string[]; // 最大4回分
  weeklyTestScores?: number[]; // 最大4回分
  weeklyTestPassingScores?: number[]; // 最大4回分
  overallComment: string;      // 最大500文字
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: MonthlyReport;
  error?: string;
}
```

**権限**: ADMIN, TEACHER（自分の担当生徒・科目のみ）

**バリデーション**:
- learningMotivation, homeworkEngagement, reviewEngagement: 1-3の範囲
- 配列フィールド: 最大4要素
- lessonContent, comprehension, overallComment: 最大500文字

---

#### 3.5.2 月報の更新
**Function**: `updateMonthlyReport`
**File**: `app/reports/monthly/actions.ts`

**Input**:
```typescript
{
  id: string;
  data: Partial<MonthlyReport>;
}
```

**Output**:
```typescript
{
  success: boolean;
  data?: MonthlyReport;
  error?: string;
}
```

**権限**: ADMIN, TEACHER（自分の月報のみ）

---

#### 3.5.3 月報の削除
**Function**: `deleteMonthlyReport`
**File**: `app/reports/monthly/actions.ts`

**Input**:
```typescript
{
  id: string;
}
```

**Output**:
```typescript
{
  success: boolean;
  error?: string;
}
```

**権限**: ADMIN, TEACHER（自分の月報のみ）

---

## 4. API Routes

### 4.1 Google Sheets連携

#### 4.1.1 月報をGoogle Sheetsに出力
**Endpoint**: `POST /api/google-sheets/export`

**Request**:
```json
{
  "monthlyReportId": "uuid"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "spreadsheetId": "...",
    "url": "https://docs.google.com/spreadsheets/d/..."
  }
}
```

**権限**: ADMIN

---

### 4.2 データ取得API（オプション）

#### 4.2.1 生徒一覧取得
**Endpoint**: `GET /api/students`

**Query Parameters**:
- `page`: ページ番号（デフォルト: 1）
- `limit`: 取得件数（デフォルト: 20）
- `status`: フィルター（ACTIVE, SUSPENDED, WITHDRAWN）
- `search`: 検索キーワード（氏名）

**Response**:
```json
{
  "success": true,
  "data": {
    "students": [...],
    "total": 50,
    "page": 1,
    "limit": 20
  }
}
```

**権限**: ADMIN, TEACHER

---

#### 4.2.2 講師一覧取得
**Endpoint**: `GET /api/teachers`

**Query Parameters**:
- `page`: ページ番号
- `limit`: 取得件数
- `status`: フィルター
- `search`: 検索キーワード

**Response**:
```json
{
  "success": true,
  "data": {
    "teachers": [...],
    "total": 30,
    "page": 1,
    "limit": 20
  }
}
```

**権限**: ADMIN

---

#### 4.2.3 授業スケジュール取得
**Endpoint**: `GET /api/lessons`

**Query Parameters**:
- `studentId`: 生徒ID（オプション）
- `teacherId`: 講師ID（オプション）
- `startDate`: 開始日（YYYY-MM-DD）
- `endDate`: 終了日（YYYY-MM-DD）
- `status`: ステータスフィルター

**Response**:
```json
{
  "success": true,
  "data": {
    "lessons": [
      {
        "id": "...",
        "student": {...},
        "teacher": {...},
        "subject": "数学",
        "date": "2025-10-15",
        "startTime": "10:00",
        "endTime": "12:00",
        "status": "SCHEDULED",
        "dailyReport": null
      }
    ]
  }
}
```

**権限**: ADMIN, TEACHER（自分の授業のみ）

---

#### 4.2.4 日報一覧取得
**Endpoint**: `GET /api/reports/daily`

**Query Parameters**:
- `studentId`: 生徒ID
- `teacherId`: 講師ID
- `startDate`: 開始日
- `endDate`: 終了日
- `page`: ページ番号
- `limit`: 取得件数

**Response**:
```json
{
  "success": true,
  "data": {
    "reports": [...],
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

**権限**: ADMIN, TEACHER（自分の日報のみ）

---

#### 4.2.5 月報一覧取得
**Endpoint**: `GET /api/reports/monthly`

**Query Parameters**:
- `studentId`: 生徒ID
- `year`: 年
- `month`: 月
- `page`: ページ番号
- `limit`: 取得件数

**Response**:
```json
{
  "success": true,
  "data": {
    "reports": [...],
    "total": 12,
    "page": 1,
    "limit": 20
  }
}
```

**権限**: ADMIN

---

## 5. エラーレスポンス

### 5.1 共通エラーフォーマット
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ"
  }
}
```

### 5.2 エラーコード

| コード | ステータス | 説明 |
|--------|-----------|------|
| UNAUTHORIZED | 401 | 認証が必要 |
| FORBIDDEN | 403 | 権限がない |
| NOT_FOUND | 404 | リソースが見つからない |
| VALIDATION_ERROR | 400 | バリデーションエラー |
| CONFLICT | 409 | データの競合（重複等） |
| INTERNAL_ERROR | 500 | サーバーエラー |

---

## 6. バリデーション

### 6.1 生徒
```typescript
import { z } from 'zod';

const studentSchema = z.object({
  lastName: z.string().min(1, '姓は必須です'),
  firstName: z.string().min(1, '名は必須です'),
  lastNameKana: z.string().optional(),
  firstNameKana: z.string().optional(),
  grade: z.string().optional(),
  schoolName: z.string().optional(),
  targetUniversity: z.string().optional(),
  email: z.string().email('有効なメールアドレスを入力してください').optional(),
  phone: z.string().optional(),
  parentName: z.string().optional(),
  parentEmail: z.string().email('有効なメールアドレスを入力してください').optional(),
  parentPhone: z.string().optional(),
  notes: z.string().optional(),
});
```

### 6.2 講師
```typescript
const teacherSchema = z.object({
  userId: z.string().uuid(),
  lastName: z.string().min(1, '姓は必須です'),
  firstName: z.string().min(1, '名は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  notes: z.string().optional(),
});
```

### 6.3 授業コマ
```typescript
const lessonSchema = z.object({
  studentId: z.string().uuid(),
  teacherId: z.string().uuid(),
  subject: z.string().min(1, '科目は必須です'),
  date: z.date(),
  startTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, '有効な時刻を入力してください'),
  endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, '有効な時刻を入力してください'),
  location: z.string().optional(),
  notes: z.string().optional(),
}).refine(
  (data) => data.startTime < data.endTime,
  { message: '開始時刻は終了時刻より前である必要があります' }
);
```

### 6.4 日報
```typescript
const dailyReportSchema = z.object({
  lessonId: z.string().uuid(),
  theme: z.string().min(1, '学習テーマは必須です'),
  content: z.string().min(10, '授業内容は10文字以上入力してください'),
  materials: z.string().optional(),
  understanding: z.number().int().min(1).max(5, '理解度は1〜5の範囲で入力してください'),
  homework: z.string().optional(),
  nextPlan: z.string().optional(),
  remarks: z.string().optional(),
});
```

### 6.5 月報
```typescript
const monthlyReportSchema = z.object({
  studentId: z.string().uuid('有効な生徒IDを指定してください'),
  subject: z.string().min(1, '科目は必須です'),
  year: z.number().int().min(2020, '有効な年を入力してください'),
  month: z.number().int().min(1).max(12, '月は1〜12の範囲で入力してください'),
  totalLessons: z.number().int().min(0, '授業回数は0以上である必要があります'),
  absences: z.number().int().min(0, '欠席数は0以上である必要があります'),
  lateCount: z.number().int().min(0, '遅刻数は0以上である必要があります'),
  learningMotivation: z.number().int().min(1).max(3, '学習意欲は1〜3の範囲で入力してください'),
  homeworkEngagement: z.number().int().min(1).max(3, '課題・宿題の取り組みは1〜3の範囲で入力してください'),
  reviewEngagement: z.number().int().min(1).max(3, '復習の取り組みは1〜3の範囲で入力してください'),
  lessonContent: z.string().min(1, '授業内容は必須です').max(500, '授業内容は500文字以内で入力してください'),
  comprehension: z.string().min(1, '理解度は必須です').max(500, '理解度は500文字以内で入力してください'),
  weeklyTestDates: z.array(z.date()).max(4, '週テスト日付は最大4回分まで登録できます').optional(),
  weeklyTestTopics: z.array(z.string()).max(4, '週テスト出題内容は最大4回分まで登録できます').optional(),
  weeklyTestScores: z.array(z.number().int().min(0)).max(4, '得点は最大4回分まで登録できます').optional(),
  weeklyTestPassingScores: z.array(z.number().int().min(0)).max(4, '合格点は最大4回分まで登録できます').optional(),
  overallComment: z.string().min(1, '総評は必須です').max(500, '総評は500文字以内で入力してください'),
}).refine(
  (data) => {
    // 週テスト配列の長さが一致しているかチェック
    const dates = data.weeklyTestDates?.length || 0;
    const topics = data.weeklyTestTopics?.length || 0;
    const scores = data.weeklyTestScores?.length || 0;
    const passing = data.weeklyTestPassingScores?.length || 0;
    return dates === topics && topics === scores && scores === passing;
  },
  { message: '週テストの各項目（日付、出題内容、得点、合格点）の数は一致している必要があります' }
);
```

---

## 7. レート制限

### 7.1 制限
- **一般API**: 100リクエスト/分
- **Google Sheets API**: 10リクエスト/分（Google APIの制限に準拠）

### 7.2 レスポンスヘッダー
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1609459200
```

---

## 8. テスト用エンドポイント

### 8.1 ヘルスチェック
**Endpoint**: `GET /api/health`

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-10-14T12:00:00Z",
  "database": "connected"
}
```

---

**作成日**: 2025-10-14
**バージョン**: 1.0
