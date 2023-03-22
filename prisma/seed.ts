import { PrismaClient } from "@prisma/client";
import { cities, states } from "../src/helpers";

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
          description: "Curso de Inglês",
          creditHours: 40,
        },
        {
          name: "Espanhol",
          description: "Curso de Espanhol",
          creditHours: 40,
        },
        {
          name: "Francês",
          description: "Curso de Francês",
          creditHours: 40,
        },
      ],
    });
  }

  const classes = await prisma.classe.findMany();
  if (classes.length === 0) {
    const couses = await prisma.course.findMany();
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
        },
      ],
    });
  }

  const offerings = await prisma.offering.findMany();
  if (offerings.length === 0) {
    const classes = await prisma.classe.findMany();
    await prisma.offering.createMany({
      data: [
        {
          startDate: new Date("2022-03-01T00:00"),
          endDate: new Date("2022-04-01T00:00"),
          testDate: new Date("2022-05-01T00:00"),
          testStartTime: new Date("2022-05-01T16:00"),
          testEndTime: new Date("2022-05-01T16:30"),
          resultDate: new Date("2022-06-01T00:00"),
          classeId: classes[0].id,
        },
        {
          startDate: new Date("2022-03-01T00:00"),
          endDate: new Date("2022-04-01T00:00"),
          testDate: new Date("2022-05-01T00:00"),
          testStartTime: new Date("2022-05-01T16:00"),
          testEndTime: new Date("2022-05-01T16:30"),
          resultDate: new Date("2022-06-01T00:00"),
          classeId: classes[1].id,
        },
        {
          startDate: new Date("2022-03-01T00:00"),
          endDate: new Date("2022-04-01T00:00"),
          testDate: new Date("2022-05-01T00:00"),
          testStartTime: new Date("2022-05-01T16:00"),
          testEndTime: new Date("2022-05-01T16:30"),
          resultDate: new Date("2022-06-01T00:00"),
          classeId: classes[2].id,
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
