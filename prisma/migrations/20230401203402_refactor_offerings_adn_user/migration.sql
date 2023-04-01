/*
  Warnings:

  - You are about to drop the column `offeringId` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `classeId` on the `offerings` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classeId` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollPrice` to the `offerings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RolesTypes" AS ENUM ('admin', 'student');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('open', 'closed', 'blocked');

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_offeringId_fkey";

-- DropForeignKey
ALTER TABLE "offerings" DROP CONSTRAINT "offerings_classeId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_addressId_fkey";

-- DropIndex
DROP INDEX "enrollments_offeringId_key";

-- DropIndex
DROP INDEX "enrollments_userId_key";

-- DropIndex
DROP INDEX "offerings_classeId_key";

-- DropIndex
DROP INDEX "users_addressId_key";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "offeringId" INTEGER;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "offeringId",
ADD COLUMN     "classeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "offerings" DROP COLUMN "classeId",
ADD COLUMN     "enrollPrice" INTEGER NOT NULL,
ADD COLUMN     "status" "OfferStatus" NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE "userAuths" ADD COLUMN     "role" "RolesTypes" NOT NULL DEFAULT 'student';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "offerings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
