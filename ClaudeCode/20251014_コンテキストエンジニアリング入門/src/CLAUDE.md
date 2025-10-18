# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Always Refer to `docs/` Directory

**Before implementing any features, always consult the documentation in `docs/` directory:**
- `docs/requirement.md` - Requirements specification
- `docs/architecture.md` - System architecture and directory structure
- `docs/database.md` - Database schema and Prisma models
- `docs/api-spec.md` - API specifications
- `docs/setup.md` - Development environment setup
- `docs/tasks.md` - Task management and development roadmap

These documents contain the complete specifications and should be the source of truth for development decisions.

## Project Overview

This is a management system for a medical school entrance exam preparation tutoring school (20 students, 30 teachers). It manages students, teachers, lesson scheduling, daily reports, and monthly reports with Google Sheets integration.

**Target Users:**
- **Administrators (ADMIN role)**: Full access to all features
- **Teachers (TEACHER role)**: Access to their own lessons and reports only

**Key Domain Concept:** When a teacher submits a daily report for a lesson, the lesson's status automatically changes from SCHEDULED to COMPLETED. This is a critical business rule.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **UI**: Material-UI (MUI v5) with Emotion styling
- **Database**: Supabase PostgreSQL via Prisma ORM
- **Auth**: NextAuth.js v5 with Google OAuth
- **External APIs**: Google Sheets API for monthly report exports
- **Deployment**: Vercel

## Essential Commands

```bash
# Development
npm run dev                    # Start dev server at localhost:3000
npm run build                  # Production build
npm start                      # Start production server

# Database
npx prisma migrate dev         # Create and apply migration
npx prisma generate            # Generate Prisma Client
npx prisma studio              # Open Prisma Studio (database GUI)
npx prisma db seed             # Seed database with initial data

# Code Quality
npm run lint                   # Run ESLint
npm run lint:fix               # Run ESLint and auto-fix issues
npm run type-check             # TypeScript type checking
npm run check                  # Run both type-check and lint
```

## Architecture

### Data Flow Patterns

**Server Components (default):**
- Fetch data directly in page components using Prisma
- No client-side state management needed
- Automatically benefit from React Server Components

**Server Actions (mutations):**
- Use for create/update/delete operations
- Located in `actions.ts` files alongside routes
- Always call `revalidatePath()` after mutations to update UI
- Return `{ success: boolean; data?: T; error?: string }` format

**API Routes (rare):**
- Only for Google Sheets integration or complex async operations
- Prefer Server Actions for standard CRUD

### Route Groups

- `(auth)` group: Unauthenticated routes (login)
- `(dashboard)` group: Authenticated routes with shared layout

### Key Files Structure

```
src/
├── app/
│   ├── (auth)/login/          # Google OAuth login
│   ├── (dashboard)/           # Protected routes
│   │   ├── students/          # Student CRUD
│   │   ├── teachers/          # Teacher CRUD
│   │   ├── schedule/          # Lesson scheduling with conflict detection
│   │   └── reports/
│   │       ├── daily/         # Daily reports (trigger lesson completion)
│   │       └── monthly/       # Monthly reports with Google Sheets export
│   └── api/
│       └── google-sheets/     # Sheets API integration
├── lib/
│   ├── prisma.ts              # Singleton Prisma client
│   ├── auth.ts                # NextAuth configuration
│   ├── google-sheets.ts       # Google Sheets API wrapper
│   └── validations/           # Zod schemas for all entities
├── components/
│   ├── ui/                    # Reusable MUI-based components
│   ├── layout/                # Header, Sidebar, Navigation
│   └── [domain]/              # Domain-specific components
└── prisma/
    └── schema.prisma          # Complete database schema (6 models)
```

## Database Schema Critical Points

**6 Core Models:**
1. **User**: NextAuth users with role (ADMIN/TEACHER)
2. **Student**: Student information with status (ACTIVE/SUSPENDED/WITHDRAWN)
3. **Teacher**: Links to User, has subjects array
4. **Lesson**: Scheduling with status (SCHEDULED/COMPLETED/CANCELLED)
5. **DailyReport**: 1:1 with Lesson, has understanding rating (1-5)
6. **MonthlyReport**: Aggregates daily reports, stores Google Sheets URL

**Key Relationships:**
- Teacher.userId → User.id (1:1, unique)
- Lesson → Student + Teacher (many-to-one for both)
- DailyReport.lessonId → Lesson.id (1:1, unique)
- DailyReport must update Lesson.status to COMPLETED when created

**Critical Indexes:**
- `(date, startTime, teacherId)` - prevents teacher double-booking
- `(date, startTime, studentId)` - prevents student double-booking
- `(studentId, year, month)` - ensures one monthly report per student per month

## Validation & Forms

- All forms use **React Hook Form** + **Zod** schemas
- Validation schemas are in `lib/validations/[entity].ts`
- Server Actions must re-validate on server side (don't trust client)
- Time format: "HH:MM" strings (e.g., "10:00", "14:30")
- Date handling: Use `date-fns` for manipulation, store as Date type

## Code Quality & ESLint

**ESLint Configuration:**
This project uses ESLint with Next.js, TypeScript, and Prettier integration to maintain code quality.

**Available Commands:**
```bash
npm run lint              # Check for linting errors
npm run lint:fix          # Auto-fix linting errors where possible
npm run type-check        # Run TypeScript type checking
npm run check             # Run both type-check and lint (comprehensive check)
```

**When to Run ESLint:**
1. **Before committing code**: Always run `npm run check` to ensure both type safety and code quality
2. **After implementing a feature**: Run `npm run lint` to catch any issues
3. **During development**: Use `npm run lint:fix` to automatically fix common issues
4. **Before creating a PR**: Run `npm run check` to verify all code passes quality checks

**Configured Rules:**

*TypeScript Rules:*
- `@typescript-eslint/no-unused-vars`: Warns about unused variables (allows `_` prefix for intentionally unused vars)
- `@typescript-eslint/no-explicit-any`: Warns when using `any` type (prefer specific types)
- Explicit return types are optional for flexibility

*React Rules:*
- `react-hooks/rules-of-hooks`: Enforces React Hooks rules (error)
- `react-hooks/exhaustive-deps`: Warns about missing dependencies in hooks

*General Code Quality:*
- `no-console`: Warns about console.log (allows console.warn and console.error)
- `no-debugger`: Warns about debugger statements
- `no-alert`: Warns about alert() usage
- `prefer-const`: Warns when variables could be const
- `no-var`: Error on var usage (use const/let instead)

*Next.js Specific:*
- `@next/next/no-html-link-for-pages`: Enforces using Next.js Link component

**Best Practices:**
- Address all ESLint errors before committing
- Warnings should be fixed when possible, but can be left if intentional
- Never use `eslint-disable` comments without good reason and explanation
- Run `npm run check` as part of your pre-commit routine

## Authentication & Authorization

**Session Management:**
- NextAuth.js handles sessions with JWT
- Session extended with user role in callbacks
- Check role in Server Actions: `const session = await getServerSession(authOptions)`

**Access Control Rules:**
- ADMIN: All operations
- TEACHER: Can only access/modify their own lessons and reports
- Always filter queries by `teacherId` for TEACHER role
- Use middleware to protect routes: `src/app/(dashboard)/` requires auth

## Google Sheets Integration

**Service Account Setup Required:**
- Uses Google Service Account credentials (not OAuth for Sheets API)
- Credentials stored in environment variables
- Monthly reports exported to new spreadsheet per report
- Store returned spreadsheet URL in `MonthlyReport.googleSheetUrl`

**Template Structure:**
- Header: Student name, period (year/month), generation date
- Body: Lesson-by-row with date, subject, teacher, content, understanding
- Footer: Summary statistics (total lessons, attendance rate, comments)

## Business Logic Constraints

**Lesson Scheduling:**
- Must check conflicts: same teacher/student cannot have overlapping lessons
- Check both `(date, startTime)` combinations
- Time slots must be valid: `startTime < endTime`

**Daily Report Submission:**
- Creates DailyReport record
- MUST update linked Lesson.status to COMPLETED in same transaction
- Only the assigned teacher can create report for their lesson
- Report fields: theme, content, materials, understanding (1-5), homework, nextPlan, remarks

**Monthly Report Generation:**
- Aggregates all DailyReports for a student in given year/month
- Calculates: totalLessons, attendanceRate, generates summary
- Creates MonthlyReport record
- Calls Google Sheets API to export formatted report
- Stores returned URL

## Environment Variables

Required in `.env.local`:
```env
DATABASE_URL                    # Supabase PostgreSQL connection string
NEXTAUTH_URL                    # App URL (http://localhost:3000 for dev)
NEXTAUTH_SECRET                 # Generate with: openssl rand -base64 32
GOOGLE_CLIENT_ID                # For OAuth login
GOOGLE_CLIENT_SECRET            # For OAuth login
GOOGLE_SERVICE_ACCOUNT_EMAIL    # For Sheets API
GOOGLE_PRIVATE_KEY              # For Sheets API (with \n escaped)
```

## Common Patterns

**Creating a new entity with Server Action:**
```typescript
'use server'

export async function createStudent(data: StudentInput) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const validated = studentSchema.parse(data);
  
  const student = await prisma.student.create({
    data: validated,
  });

  revalidatePath('/students');
  return { success: true, data: student };
}
```

**Fetching with authorization:**
```typescript
// In a Server Component
const session = await getServerSession(authOptions);

const lessons = await prisma.lesson.findMany({
  where: session.user.role === 'TEACHER' 
    ? { teacherId: session.user.teacherId }
    : {}, // ADMIN sees all
  include: {
    student: true,
    teacher: true,
    dailyReport: true,
  },
});
```

**Schedule conflict detection:**
```typescript
const conflict = await prisma.lesson.findFirst({
  where: {
    teacherId,
    date,
    status: { not: 'CANCELLED' },
    OR: [
      { startTime: { lte: startTime }, endTime: { gt: startTime } },
      { startTime: { lt: endTime }, endTime: { gte: endTime } },
    ],
  },
});

if (conflict) {
  return { success: false, error: 'Schedule conflict detected' };
}
```

## Documentation Reference Guide

**Always consult `docs/` directory for detailed specifications:**

| Document | Use When | Key Information |
|----------|----------|-----------------|
| `docs/requirement.md` | Planning features, understanding business requirements | Complete functional/non-functional requirements, user roles, feature specifications |
| `docs/architecture.md` | Designing system components, understanding data flow | System architecture, directory structure, data flow patterns, security design |
| `docs/database.md` | Working with database, creating migrations | Complete Prisma schema, ER diagram, all 6 models with relationships, indexes |
| `docs/api-spec.md` | Implementing APIs, Server Actions | API specifications, request/response formats, validation schemas, error handling |
| `docs/setup.md` | Setting up dev environment, troubleshooting setup issues | Step-by-step setup instructions, Supabase/Prisma/NextAuth configuration |
| `docs/tasks.md` | Tracking progress, planning work | 5-phase development roadmap, task checklists, progress tracking |

**Development Workflow:**
1. Before starting a task, read relevant documentation in `docs/`
2. Implement according to specifications
3. Mark task as complete in `docs/tasks.md` using `[x]`
4. Update progress notes with completion date

## MUI Theming

- Theme defined in `lib/theme.ts`
- Use `AppRouterCacheProvider` in root layout for MUI + Next.js 14 compatibility
- Prefer MUI components over custom styling
- Use MUI Data Grid for tables, MUI Date Pickers for scheduling

## Task Management

**All development tasks are tracked in `docs/tasks.md`.**

**When completing tasks:**
1. Open `docs/tasks.md`
2. Find the completed task in the checklist
3. Change `- [ ]` to `- [x]` to mark it as done
4. Update the "進捗メモ" (Progress Notes) section with completion date and any relevant notes

**Task Organization:**
- Tasks are organized into 5 development phases (Phase 1-5)
- Each phase has specific deliverables and sub-tasks
- Always check off completed tasks to maintain accurate progress tracking
- Add new tasks to the appropriate phase if discovered during development

**Example:**
```markdown
### 1. プロジェクトセットアップ
- [x] Next.jsプロジェクトの作成
- [x] 必要なパッケージのインストール
- [ ] ディレクトリ構造の作成
```

## Current Development Phase

**Status: Planning/Setup Phase**
- Documentation completed
- Next steps: Project setup → Database setup → Authentication → Feature implementation
- Follow 5-phase roadmap in `docs/tasks.md`
