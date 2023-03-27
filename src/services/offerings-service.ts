import { offeringsRepository } from "@/repositories";

async function findAll() {
  return await offeringsRepository.findAll();
}

export const offeringsService = {
  findAll,
};
