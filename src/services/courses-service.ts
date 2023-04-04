import { coursesRepository } from "@/repositories";
import { OfferStatus } from "@prisma/client";

async function findAll() {
  return await coursesRepository.findAll();
}

async function findAllGroupByCourse(status: OfferStatus) {
  if (status !== "blocked") {
    return await coursesRepository.findAllWithClassesFilteredOfferStatus(status);
  }

  return [];
}

export const coursesService = {
  findAll,
  findAllGroupByCourse,
};
