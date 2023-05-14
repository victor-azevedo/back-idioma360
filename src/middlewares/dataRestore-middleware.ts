import { prisma } from "@/config";
import { createClassesSeed, createCoursesSeed, createOfferingsSeed, createTestsSeed } from "@/mock/seed";
import { NextFunction, Request, Response } from "express";
import { handleRequestError } from "./handleRequestError";

export function dataRestore() {
  return async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.userAnswers.deleteMany();
      await prisma.question.deleteMany();
      await prisma.test.deleteMany();
      await prisma.enrollment.deleteMany();
      await prisma.classe.deleteMany();
      await prisma.course.deleteMany();
      await prisma.offering.deleteMany();

      await createCoursesSeed(prisma);
      await createOfferingsSeed(prisma);
      await createClassesSeed(prisma);
      await createTestsSeed(prisma);
    } catch (error) {
      handleRequestError(error, res);
    } finally {
      next();
    }
  };
}
