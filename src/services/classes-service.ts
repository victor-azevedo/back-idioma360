import { classesRepository } from "@/repositories";

async function findAll() {
  return await classesRepository.findAll();
}

export const classesService = {
  findAll,
};
