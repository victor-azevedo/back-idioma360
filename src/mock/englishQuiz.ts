import { Prisma } from "@prisma/client";

export default function englishTest(testId: number): Prisma.QuestionCreateManyInput[] {
  return [
    {
      testId,
      title: "What is the plural form of 'cat'?",
      optionA: "cats",
      optionB: "caties",
      optionC: "cates",
      optionD: "catz",
      correctAnswer: "optionA",
    },
    {
      testId,
      title: "Which sentence is correct?",
      optionA: "I am can swim.",
      optionB: "I can swim.",
      optionC: "I can swimming.",
      optionD: "I can swiming.",
      correctAnswer: "optionB",
    },
    {
      testId,
      title: "Choose the correct word to complete the sentence: 'My sister ________ to school by bus.'",
      optionA: "go",
      optionB: "goes",
      optionC: "going",
      optionD: "goed",
      correctAnswer: "optionB",
    },
    {
      testId,
      title: "What is the opposite of 'hot'?",
      optionA: "cold",
      optionB: "warm",
      optionC: "cool",
      optionD: "freezing",
      correctAnswer: "optionA",
    },
    {
      testId,
      title: "Which question is correct?",
      optionA: "Where you are from?",
      optionB: "You are from where?",
      optionC: "From where are you?",
      optionD: "From where you are?",
      correctAnswer: "optionB",
    },
  ];
}
