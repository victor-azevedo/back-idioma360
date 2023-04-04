import { notFoundError } from "@/errors";
import { classesRepository } from "@/repositories";

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

export const classesService = {
  findAll,
  findClasseByIdWithUserEnrollment,
};
