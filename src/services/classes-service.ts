import { handlePrismaError, notFoundError } from "@/errors";
import { parseDateToDB } from "@/helpers";
import { classesRepository } from "@/repositories";
import { ClasseBody } from "@/schemas";
import { validateClasseDatesOrFail } from "./validations";

async function findAll() {
  return await classesRepository.findAll();
}

async function findClasseByIdWithUserEnrollment({ id, userId }: { id: number; userId: number }) {
  const classe = await classesRepository.findClasseByIdWithUserEnrollment({ id, userId });

  if (!classe) {
    throw notFoundError();
  }

  const { enrollments, ...classeWithOutEnrollments } = classe;
  const classeResponse = {
    ...classeWithOutEnrollments,
    isUserEnrolledFOrThisClasse: enrollments.length > 0 ? true : false,
  };

  return classeResponse;
}

async function createClasse(classe: ClasseBody) {
  const datesParsed = parseDateToDB(classe);

  validateClasseDatesOrFail(datesParsed);
  try {
    await classesRepository.createClasse({ ...classe, ...datesParsed });
  } catch (error) {
    handlePrismaError(error);
  }
  return;
}

export const classesService = {
  findAll,
  findClasseByIdWithUserEnrollment,
  createClasse,
};
