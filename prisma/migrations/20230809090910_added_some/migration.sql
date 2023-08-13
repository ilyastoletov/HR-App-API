/*
  Warnings:

  - Added the required column `appliedAtDate` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAtDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Applicant_appliedVacancyId_key";

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "appliedAtDate" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullWorkDay" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "job_experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "profession" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "appliedVacancyId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAtDate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "newApplicantsCount" INTEGER NOT NULL DEFAULT 0;
