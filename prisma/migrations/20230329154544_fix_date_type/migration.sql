-- AlterTable
ALTER TABLE "classes" ALTER COLUMN "startDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "endDate" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "offerings" ALTER COLUMN "startDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "endDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "testDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "resultDate" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birthday" SET DATA TYPE TIMESTAMP(3);
