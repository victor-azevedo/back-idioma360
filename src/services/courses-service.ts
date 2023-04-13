import { handlePrismaError } from "@/errors";
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

async function updateCourse({ id, course }: { id: number; course: Partial<CourseBody> }) {
  try {
    await coursesRepository.updateCourse({ where: { id }, data: course });
  } catch (error) {
    handlePrismaError(error);
  }

  return;
}

async function deleteCourse(id: number) {
  try {
    await coursesRepository.deleteCourse({ id });
  } catch (error) {
    handlePrismaError(error);
  }

  return;
}

export const coursesService = {
  findAll,
  findAllGroupByCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
