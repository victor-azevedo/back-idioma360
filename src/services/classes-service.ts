import { notFoundError } from "@/errors";
import { classesRepository } from "@/repositories";

async function findAll() {
  return await classesRepository.findAll();
}

async function findById(id: number) {
  const classe = await classesRepository.findById(id);

  if (!classe) {
    throw notFoundError();
  }

  return classe;
}

export const classesService = {
  findAll,
  findById,
};
