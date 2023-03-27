import { coursesRepository } from "@/repositories";

async function findAll() {
  return await coursesRepository.findAll();
}

export const coursesService = {
  findAll,
};
