import { coursesRepository } from "@/repositories";
import { CourseBody } from "@/schemas";
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

async function createCourse(course: CourseBody) {
  return await coursesRepository.createCourse(course);
}
export const coursesService = {
  findAll,
  findAllGroupByCourse,
  createCourse,
};
