import { Prisma } from "@prisma/client";

export default function germanTest(testId: number): Prisma.QuestionCreateManyInput[] {
  return [
    {
      testId,
      title: "Welches Personalpronomen passt zur ersten Person Singular (ich)?",
      optionA: "du",
      optionB: "er",
      optionC: "wir",
      optionD: "ich",
      correctAnswer: "optionD",
    },
    {
      testId,
      title: "Welches Personalpronomen passt zur zweiten Person Plural (ihr)?",
      optionA: "wir",
      optionB: "ihr",
      optionC: "sie",
      optionD: "du",
      correctAnswer: "optionB",
    },
    {
      testId,
      title: "Welches Verb passt in die Lücke? 'Ich ___ Deutsch.'",
      optionA: "sprich",
      optionB: "spreche",
      optionC: "sprechen",
      optionD: "gesprochen",
      correctAnswer: "optionB",
    },
    {
      testId,
      title: "Welcher Artikel passt zu dem maskulinen Substantiv 'Hund'?",
      optionA: "der",
      optionB: "die",
      optionC: "das",
      optionD: "dem",
      correctAnswer: "optionA",
    },
    {
      testId,
      title: "Welche Präposition wird mit dem Dativ verwendet? 'Ich gehe ___ Park.'",
      optionA: "in",
      optionB: "auf",
      optionC: "an",
      optionD: "im",
      correctAnswer: "optionD",
    },
  ];
}
