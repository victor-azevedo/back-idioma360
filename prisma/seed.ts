import { PrismaClient } from "@prisma/client";
import { cities, states } from "../src/helpers";
import {
  EnglishCourseDescription,
  FrenchCourseDescription,
  GermanCourseDescription,
  SpanishCourseDescription,
} from "../src/mock/courses";

const prisma = new PrismaClient();

async function main() {
  const allStates = await prisma.state.findMany();
  if (allStates.length === 0) {
    await prisma.state.createMany({
      data: states,
    });
  }

  const allCities = await prisma.city.findMany();
  if (allCities.length === 0) {
    await prisma.city.createMany({
      data: cities,
    });
  }

  const allCourses = await prisma.course.findMany();
  if (allCourses.length === 0) {
    await prisma.course.createMany({
      data: [
        {
          name: "Inglês",
          description: EnglishCourseDescription,
          creditHours: 40,
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1024px-Flag_of_England.svg.png",
        },
        {
          name: "Espanhol",
          description: SpanishCourseDescription,
          creditHours: 40,
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1024px-Bandera_de_Espa%C3%B1a.svg.png",
        },
        {
          name: "Francês",
          description: FrenchCourseDescription,
          creditHours: 40,
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1024px-Flag_of_France.svg.png",
        },
        {
          name: "Alemão",
          description: GermanCourseDescription,
          creditHours: 40,
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png",
        },
      ],
    });
  }

  const offerings = await prisma.offering.findMany();
  if (offerings.length === 0) {
    await prisma.offering.createMany({
      data: [
        {
          startDate: new Date("2022-03-01T00:00"),
          endDate: new Date("2022-04-01T00:00"),
          testDate: new Date("2022-05-01T00:00"),
          testStartTime: new Date("2022-05-01T16:00"),
          testEndTime: new Date("2022-05-01T16:30"),
          resultDate: new Date("2022-06-01T00:00"),
          enrollPrice: 15000,
        },
        {
          startDate: new Date("2023-04-20T00:00"),
          endDate: new Date("2023-05-20T00:00"),
          testDate: new Date("2023-06-20T00:00"),
          testStartTime: new Date("2023-05-20T16:00"),
          testEndTime: new Date("2023-05-20T16:30"),
          resultDate: new Date("2023-06-20T00:00"),
          enrollPrice: 20000,
        },
      ],
    });
  }

  const classes = await prisma.classe.findMany();
  if (classes.length === 0) {
    const couses = await prisma.course.findMany();
    const offerings = await prisma.offering.findMany();
    await prisma.classe.createMany({
      data: [
        {
          name: `Turma ${couses[0].name}`,
          days: ["Monday", "Wednesday"],
          startTime: new Date("1970-01-01T08:30"),
          endTime: new Date("1970-01-01T10:00"),
          startDate: new Date("2022-06-08T00:00"),
          endDate: new Date("2022-09-01T00:00"),
          courseId: couses[0].id,
          vacancies: 30,
          offeringId: offerings[0].id,
        },
        {
          name: `Turma ${couses[1].name}`,
          days: ["Monday", "Wednesday"],
          startTime: new Date("1970-01-01T09:30"),
          endTime: new Date("1970-01-01T11:00"),
          startDate: new Date("2022-06-08T00:00"),
          endDate: new Date("2022-09-01T00:00"),
          courseId: couses[1].id,
          vacancies: 30,
          offeringId: offerings[0].id,
        },
        {
          name: `Turma ${couses[2].name}`,
          days: ["Monday", "Wednesday"],
          startTime: new Date("1970-01-01T14:30"),
          endTime: new Date("1970-01-01T16:30"),
          startDate: new Date("2022-06-08T00:00"),
          endDate: new Date("2022-09-01T00:00"),
          courseId: couses[2].id,
          vacancies: 30,
          offeringId: offerings[0].id,
        },
        {
          name: `Turma ${couses[3].name}`,
          days: ["Friday"],
          startTime: new Date("1970-01-01T08:30"),
          endTime: new Date("1970-01-01T11:30"),
          startDate: new Date("2022-06-08T00:00"),
          endDate: new Date("2022-09-01T00:00"),
          courseId: couses[2].id,
          vacancies: 30,
          offeringId: offerings[0].id,
        },
        {
          name: `Turma ${couses[0].name}`,
          days: ["Monday", "Wednesday"],
          startTime: new Date("1970-01-01T08:30"),
          endTime: new Date("1970-01-01T10:00"),
          startDate: new Date("2023-06-28T00:00"),
          endDate: new Date("2023-09-12T00:00"),
          courseId: couses[0].id,
          vacancies: 30,
          offeringId: offerings[1].id,
        },
        {
          name: `Turma ${couses[1].name}`,
          days: ["Monday", "Wednesday"],
          startTime: new Date("1970-01-01T09:30"),
          endTime: new Date("1970-01-01T11:00"),
          startDate: new Date("2023-06-28T00:00"),
          endDate: new Date("2023-09-12T00:00"),
          courseId: couses[1].id,
          vacancies: 30,
          offeringId: offerings[1].id,
        },
        {
          name: `Turma ${couses[2].name}`,
          days: ["Monday", "Wednesday"],
          startTime: new Date("1970-01-01T14:30"),
          endTime: new Date("1970-01-01T16:30"),
          startDate: new Date("2023-06-28T00:00"),
          endDate: new Date("2023-09-12T00:00"),
          courseId: couses[2].id,
          vacancies: 30,
          offeringId: offerings[1].id,
        },
        {
          name: `Turma ${couses[3].name}`,
          days: ["Friday"],
          startTime: new Date("1970-01-01T08:30"),
          endTime: new Date("1970-01-01T11:30"),
          startDate: new Date("2023-06-28T00:00"),
          endDate: new Date("2023-09-12T00:00"),
          courseId: couses[2].id,
          vacancies: 30,
          offeringId: offerings[1].id,
        },
      ],
    });
  }
}

main()
  .then(() => {
    console.log("Seed Success!!!");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
