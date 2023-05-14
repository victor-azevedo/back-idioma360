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
  await createStatesSeed(prisma);

  await createCitiesSeed(prisma);

  await createUsersSeed(prisma);

  await createCoursesSeed(prisma);

  await createOfferingsSeed(prisma);

  await createClassesSeed(prisma);

  await createTestsSeed(prisma);
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
