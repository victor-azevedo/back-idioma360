import { testsRepository } from "@/repositories";

async function findAll() {
  return await testsRepository.findAll();
}

async function findByTestId(id: number) {
  return await testsRepository.findByTestId(id);
}

export const testsService = {
  findAll,
  findByTestId,
};
