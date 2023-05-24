/*
  Warnings:

  - You are about to drop the column `authorName` on the `Vacancy` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vacancyId]` on the table `Vacancy` will be added. If there are existing duplicate values, this will fail.
  - The required column `authorId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `authorId` to the `Vacancy` table without a default value. This is not possible if the table is not empty.
  - The required column `vacancyId` was added to the `Vacancy` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_vacancyId_fkey";

-- DropForeignKey
ALTER TABLE "Vacancy" DROP CONSTRAINT "Vacancy_authorName_fkey";

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "status" "ApplicantStatus" NOT NULL DEFAULT 'NEW',
ALTER COLUMN "vacancyId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "authorName",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "vacancyId" TEXT NOT NULL,
ADD COLUMN     "vacancyStatus" "VacancyStatus" NOT NULL DEFAULT 'OPEN';

-- CreateIndex
CREATE UNIQUE INDEX "User_authorId_key" ON "User"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Vacancy_vacancyId_key" ON "Vacancy"("vacancyId");

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("authorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("vacancyId") ON DELETE RESTRICT ON UPDATE CASCADE;
