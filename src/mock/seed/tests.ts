import { Options } from "@prisma/client";

export function testGenerate(testId: number, totalQuestions = 10) {
  const optionsList: Options[] = ["optionA", "optionB", "optionC", "optionD"];

  function randomAnswer(): Options {
    return optionsList[Math.floor(Math.random() * optionsList.length)];
  }

  function questionsGenerate(testId: number) {
    const questionList = Array(totalQuestions);

    const question = {
      testId,
      title: "",
      optionA: "errada",
      optionB: "errada",
      optionC: "errada",
      optionD: "errada",
      correctAnswer: "",
    };

    for (let i = 0; i < totalQuestions; i++) {
      const correctAnswer = randomAnswer();
      questionList.push({ ...question, title: `Questão ${i}`, [correctAnswer]: "certa", correctAnswer });
    }
    return questionList;
  }

  return questionsGenerate(testId);
}
