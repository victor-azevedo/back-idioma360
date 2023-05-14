import bcrypt from "bcrypt";

import { cities, states } from "@/helpers";
import { PrismaClient } from "@prisma/client";
import {
  EnglishCourseDescription,
  FrenchCourseDescription,
  GermanCourseDescription,
  SpanishCourseDescription,
} from "../courses";
import englishTest from "../englishQuiz";
import germanTest from "../germanQuiz";
import { adminTest, studentTest } from "../users";
import { testGenerate } from "./tests";

export async function createStatesSeed(prisma: PrismaClient) {
  const allStates = await prisma.state.findMany();
  if (allStates.length === 0) {
    await prisma.state.createMany({
      data: states,
    });
  }
}

export async function createCitiesSeed(prisma: PrismaClient) {
  const allCities = await prisma.city.findMany();
  if (allCities.length === 0) {
    await prisma.city.createMany({
      data: cities,
    });
  }
}

export async function createUsersSeed(prisma: PrismaClient) {
  if (process.env.PORTFOLIO === "true") {
    const studentTestFind = await prisma.user.findFirst({
      where: { email: { equals: studentTest.email }, OR: { cpf: { equals: studentTest.cpf } } },
    });
    if (!studentTestFind) {
      await prisma.userAuth.create({
        data: {
          user: { create: { ...studentTest, birthday: new Date(studentTest.birthday + "T00:00") } },
          password: bcrypt.hashSync("admin123", 10),
          role: "student",
        },
      });
    }

    const adminTestFind = await prisma.user.findFirst({
      where: { email: { equals: adminTest.email }, OR: { cpf: { equals: adminTest.cpf } } },
    });
    if (!adminTestFind) {
      await prisma.userAuth.create({
        data: {
          user: { create: { ...adminTest, birthday: new Date(adminTest.birthday + "T00:00") } },
          password: bcrypt.hashSync("admin123", 10),
          role: "admin",
        },
      });
    }
  }
}

export async function createCoursesSeed(prisma: PrismaClient) {
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
}

export async function createOfferingsSeed(prisma: PrismaClient) {
  const offerings = await prisma.offering.findMany();
  if (offerings.length === 0) {
    await prisma.offering.createMany({
      data: [
        {
          name: "Processo Seletivo 22/01",
          startDate: new Date("2022-03-01T00:00"),
          endDate: new Date("2022-04-01T00:00"),
          testDate: new Date("2022-05-01T00:00"),
          testStartTime: new Date("2022-05-01T16:00"),
          testEndTime: new Date("2022-05-01T16:30"),
          resultDate: new Date("2022-06-01T00:00"),
          enrollPrice: 15000,
          status: "closed",
        },
        {
          name: "Processo Seletivo 23/01",
          startDate: new Date("2023-01-20T00:00"),
          endDate: new Date("2023-02-20T00:00"),
          testDate: new Date("2023-03-05T00:00"),
          testStartTime: new Date("2023-04-05T00:00"),
          testEndTime: new Date("2023-04-05T23:59"),
          resultDate: new Date("2023-04-20T00:00"),
          enrollPrice: 19000,
          status: "open",
        },
        {
          name: "Processo Seletivo 23/02",
          startDate: new Date("2023-06-20T00:00"),
          endDate: new Date("2023-07-20T00:00"),
          testDate: new Date("2023-08-05T00:00"),
          testStartTime: new Date("2023-08-05T16:00"),
          testEndTime: new Date("2023-08-05T16:30"),
          resultDate: new Date("2023-09-18T00:00"),
          enrollPrice: 20000,
          status: "blocked",
        },
      ],
    });
  }
}

export async function createClassesSeed(prisma: PrismaClient) {
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
          courseId: couses[3].id,
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
          courseId: couses[3].id,
          vacancies: 30,
          offeringId: offerings[1].id,
        },
      ],
    });
  }
}

export async function createTestsSeed(prisma: PrismaClient) {
  const tests = await prisma.test.findMany();
  if (tests.length === 0) {
    const classes = await prisma.classe.findMany({
      distinct: ["courseId"],
      select: { id: true, courseId: true, course: { select: { id: true, name: true } } },
    });
    if (classes) {
      classes.forEach(async (classe) => {
        const { id } = await prisma.test.create({
          data: {
            name: `Teste para ${classe.course?.name}`,
            courseId: classe.courseId,
          },
        });

        if (classe.course?.name === "Inglês") {
          await prisma.question.createMany({
            data: englishTest(id),
          });
        } else if (classe.course?.name === "Alemão") {
          await prisma.question.createMany({
            data: germanTest(id),
          });
        } else {
          await prisma.question.createMany({
            data: testGenerate(id, 5),
          });
        }

        await prisma.classe.updateMany({ where: { courseId: classe.course?.id }, data: { testId: id } });
      });
    }
  }
}
