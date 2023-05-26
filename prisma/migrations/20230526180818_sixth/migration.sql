-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_appliedVacancyId_fkey";

-- DropForeignKey
ALTER TABLE "Vacancy" DROP CONSTRAINT "Vacancy_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "vacanciesIds" TEXT[];

-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "responderIds" TEXT[];
