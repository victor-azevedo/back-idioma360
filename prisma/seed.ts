import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import {
  createCitiesSeed,
  createClassesSeed,
  createCoursesSeed,
  createOfferingsSeed,
  createStatesSeed,
  createTestsSeed,
  createUsersSeed,
} from "../src/mock/seed";

dotenv.config();

export const prisma = new PrismaClient();

async function main() {
  await createStatesSeed();

  await createCitiesSeed();

  await createUsersSeed();

  await createCoursesSeed();

  await createClassesSeed();

  await createOfferingsSeed();

  await createTestsSeed();
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
