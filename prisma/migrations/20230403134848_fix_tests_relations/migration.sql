/*
  Warnings:

  - You are about to drop the column `classeId` on the `tests` table. All the data in the column will be lost.
  - Added the required column `name` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_classeId_fkey";

-- DropIndex
DROP INDEX "tests_classeId_key";

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "testId" INTEGER;

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "classeId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
