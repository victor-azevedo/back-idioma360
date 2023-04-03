import { notFoundError } from "@/errors";
import { classesRepository, enrollmentsRepository } from "@/repositories";

async function findAll() {
  return await classesRepository.findAll();
}

async function findClasseByIdWithUserEnrollment({ id, userId }: { id: number; userId: number }) {
  const classe = await classesRepository.findClasseByIdWithUserEnrollment({ id, userId });

  if (!classe) {
    throw notFoundError();
  }

  return classe;
}

async function createClasseEnroll({ id, userId }: { id: number; userId: number }) {
  const classe = await classesRepository.findById(id);

  if (!classe) {
    throw notFoundError();
  }

  await enrollmentsRepository.createEnrollment({ classeId: id, userId });
  return;
}

export const classesService = {
  findAll,
  findClasseByIdWithUserEnrollment,
  createClasseEnroll,
};
