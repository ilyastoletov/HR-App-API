/*
  Warnings:

  - A unique constraint covering the columns `[applicantId]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vacancyId]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - The required column `applicantId` was added to the `Applicant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "applicantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_applicantId_key" ON "Applicant"("applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_vacancyId_key" ON "Applicant"("vacancyId");
