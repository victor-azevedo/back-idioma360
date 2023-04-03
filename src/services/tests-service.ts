import { testsRepository } from "@/repositories";

async function findAll() {
  return await testsRepository.findAll();
}

export const testsService = {
  findAll,
};
