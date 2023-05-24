/*
  Warnings:

  - You are about to drop the column `vacancyId` on the `Applicant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appliedVacancyId]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appliedVacancyId` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_vacancyId_fkey";

-- DropIndex
DROP INDEX "Applicant_vacancyId_key";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "vacancyId",
ADD COLUMN     "appliedVacancyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_appliedVacancyId_key" ON "Applicant"("appliedVacancyId");

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_appliedVacancyId_fkey" FOREIGN KEY ("appliedVacancyId") REFERENCES "Vacancy"("vacancyId") ON DELETE RESTRICT ON UPDATE CASCADE;
