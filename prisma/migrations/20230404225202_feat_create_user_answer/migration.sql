-- CreateTable
CREATE TABLE "UserAnswers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "userAnswer" "Options" NOT NULL,

    CONSTRAINT "UserAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
