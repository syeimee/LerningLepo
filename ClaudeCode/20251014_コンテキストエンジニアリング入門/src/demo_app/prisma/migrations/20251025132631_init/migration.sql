-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TEACHER');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'TEACHER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastNameKana" TEXT,
    "firstNameKana" TEXT,
    "grade" TEXT,
    "schoolName" TEXT,
    "targetUniversity" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "parentName" TEXT,
    "parentEmail" TEXT,
    "parentPhone" TEXT,
    "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastNameKana" TEXT,
    "firstNameKana" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subjects" TEXT[],
    "status" "TeacherStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT,
    "status" "LessonStatus" NOT NULL DEFAULT 'SCHEDULED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_reports" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "lessonDate" DATE NOT NULL,
    "theme" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "materials" TEXT,
    "understanding" INTEGER NOT NULL DEFAULT 3,
    "homework" TEXT,
    "nextPlan" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthly_reports" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "absences" INTEGER NOT NULL DEFAULT 0,
    "lateCount" INTEGER NOT NULL DEFAULT 0,
    "learningMotivation" INTEGER NOT NULL DEFAULT 2,
    "homeworkEngagement" INTEGER NOT NULL DEFAULT 2,
    "reviewEngagement" INTEGER NOT NULL DEFAULT 2,
    "lessonContent" TEXT NOT NULL,
    "comprehension" TEXT NOT NULL,
    "weeklyTestDates" DATE[],
    "weeklyTestTopics" TEXT[],
    "weeklyTestScores" INTEGER[],
    "weeklyTestPassingScores" INTEGER[],
    "overallComment" TEXT NOT NULL,
    "googleSheetUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthly_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "students_status_idx" ON "students"("status");

-- CreateIndex
CREATE INDEX "students_lastName_firstName_idx" ON "students"("lastName", "firstName");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_userId_key" ON "teachers"("userId");

-- CreateIndex
CREATE INDEX "teachers_status_idx" ON "teachers"("status");

-- CreateIndex
CREATE INDEX "teachers_email_idx" ON "teachers"("email");

-- CreateIndex
CREATE INDEX "lessons_studentId_idx" ON "lessons"("studentId");

-- CreateIndex
CREATE INDEX "lessons_teacherId_idx" ON "lessons"("teacherId");

-- CreateIndex
CREATE INDEX "lessons_date_idx" ON "lessons"("date");

-- CreateIndex
CREATE INDEX "lessons_status_idx" ON "lessons"("status");

-- CreateIndex
CREATE INDEX "lessons_date_startTime_teacherId_idx" ON "lessons"("date", "startTime", "teacherId");

-- CreateIndex
CREATE INDEX "lessons_date_startTime_studentId_idx" ON "lessons"("date", "startTime", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "daily_reports_lessonId_key" ON "daily_reports"("lessonId");

-- CreateIndex
CREATE INDEX "daily_reports_teacherId_idx" ON "daily_reports"("teacherId");

-- CreateIndex
CREATE INDEX "daily_reports_studentId_idx" ON "daily_reports"("studentId");

-- CreateIndex
CREATE INDEX "daily_reports_lessonDate_idx" ON "daily_reports"("lessonDate");

-- CreateIndex
CREATE INDEX "monthly_reports_studentId_idx" ON "monthly_reports"("studentId");

-- CreateIndex
CREATE INDEX "monthly_reports_teacherId_idx" ON "monthly_reports"("teacherId");

-- CreateIndex
CREATE INDEX "monthly_reports_studentId_teacherId_subject_year_month_idx" ON "monthly_reports"("studentId", "teacherId", "subject", "year", "month");

-- CreateIndex
CREATE INDEX "monthly_reports_year_month_idx" ON "monthly_reports"("year", "month");

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_reports" ADD CONSTRAINT "monthly_reports_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_reports" ADD CONSTRAINT "monthly_reports_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
