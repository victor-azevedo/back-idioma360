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

async function updateClasse({ id, classe }: { id: number; classe: Partial<ClasseBody> }) {
  const prevClasse = await classesRepository.findById({ id });
  if (!prevClasse) {
    throw notFoundError();
  }
  const { startDate, endDate, startTime, endTime } = prevClasse;

  const datesParsed = parseDateToDB(classe);
  validateClasseDatesOrFail({ startDate, endDate, startTime, endTime, ...datesParsed });

  try {
    await classesRepository.updateClasse({ where: { id }, data: { ...classe, ...datesParsed } });
  } catch (error) {
    handlePrismaError(error);
  }
  return;
}

async function deleteClasse(id: number) {
  try {
    await classesRepository.deleteClasse({ id });
  } catch (error) {
    handlePrismaError(error);
  }

  return;
}

export const classesService = {
  findAll,
  findClasseByIdWithUserEnrollment,
  createClasse,
  updateClasse,
  deleteClasse,
};
