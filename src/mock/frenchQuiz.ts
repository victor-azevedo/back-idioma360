import { Prisma } from "@prisma/client";

export default function frenchTest(testId: number): Prisma.QuestionCreateManyInput[] {
  return [
    {
      testId,
      title: "Quelle est la forme correcte du verbe 'être' (être) au présent pour 'je'?",
      optionA: "es",
      optionB: "suis",
      optionC: "est",
      optionD: "êtes",
      correctAnswer: "optionB",
    },
    {
      testId,
      title: "Quelle est la forme correcte du verbe 'avoir' (avoir) au présent pour 'nous'?",
      optionA: "ai",
      optionB: "as",
      optionC: "avons",
      optionD: "ont",
      correctAnswer: "optionC",
    },
    {
      testId,
      title: "Quelle est la forme correcte du verbe 'parler' (parler) au présent pour 'tu'?",
      optionA: "parle",
      optionB: "parles",
      optionC: "parlons",
      optionD: "parlez",
      correctAnswer: "optionB",
    },
    {
      testId,
      title: "Quelle est la forme correcte du verbe 'aller' (aller) au futur pour 'il'?",
      optionA: "irai",
      optionB: "vas",
      optionC: "va",
      optionD: "allons",
      correctAnswer: "optionC",
    },
    {
      testId,
      title: "Quelle est la forme correcte du verbe 'faire' (faire) au passé composé pour 'elles'?",
      optionA: "fais",
      optionB: "fait",
      optionC: "faite",
      optionD: "ont fait",
      correctAnswer: "optionD",
    },
  ];
}
