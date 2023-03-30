import { notFoundError } from "@/errors";
import { classesRepository } from "@/repositories";

async function findAll() {
  return await classesRepository.findAll();
}

async function findById({ id, userId }: { id: number; userId: number }) {
  const classe = await classesRepository.findById({ id, userId });

  if (!classe) {
    throw notFoundError();
  }

  return classe;
}

export const classesService = {
  findAll,
  findById,
};
