/*
  Warnings:

  - You are about to drop the column `description` on the `Vacancy` table. All the data in the column will be lost.
  - Added the required column `city` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wanted_salary` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conditions` to the `Vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_duties` to the `Vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VacancyStatus" AS ENUM ('OPEN', 'PAUSED', 'STOPPED');

-- CreateEnum
CREATE TYPE "ApplicantStatus" AS ENUM ('NEW', 'TEST_TASK', 'PHONE_INTERVIEW', 'TECH_INTERVIEW', 'OFFER', 'ONBOARDING', 'APPLICANT_DECLINE', 'RECRUITER_DECLINE', 'DELETED');

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "wanted_salary" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "description",
ADD COLUMN     "conditions" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "job_duties" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL;
