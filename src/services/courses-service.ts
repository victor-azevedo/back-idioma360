import { coursesRepository } from "@/repositories";
import { OfferStatus } from "@prisma/client";

async function findAll() {
  return await coursesRepository.findAll();
}

async function findAllGroupByCourse(status: OfferStatus) {
  if (status === "open" || status === "closed") {
    return await coursesRepository.findAllWithClassesFilteredOfferStatus(status);
  }

  return await coursesRepository.findAllWithClasses();
}

export const coursesService = {
  findAll,
  findAllGroupByCourse,
};
