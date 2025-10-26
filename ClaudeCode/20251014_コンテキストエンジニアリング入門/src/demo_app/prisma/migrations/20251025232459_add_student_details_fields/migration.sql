-- AlterTable
ALTER TABLE "students" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "courses" TEXT[],
ADD COLUMN     "emergencyContact" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "examResults" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "weakSubjects" TEXT[];
