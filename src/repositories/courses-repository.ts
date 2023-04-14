import { prisma } from "@/config";
import { OfferStatus, Prisma } from "@prisma/client";

async function findAll() {
  return await prisma.course.findMany({ orderBy: { name: "asc" } });
}

async function findAllWithClassesFilteredOfferStatus(status: OfferStatus) {
  const sortAsc: Prisma.SortOrder = "asc";
  const query = {
    orderBy: { name: sortAsc },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      classes: {
        orderBy: { startDate: sortAsc },
        where: { offering: { status } },
        select: {
          id: true,
          name: true,
          days: true,
          vacancies: true,
          startDate: true,
          endDate: true,
          startTime: true,
          endTime: true,
          offering: { select: { status: true } },
        },
      },
    },
  };

  if (!status) {
    delete query.select.classes.where;
  }

  return await prisma.course.findMany(query);
}

async function createCourse(data: Prisma.CourseCreateInput) {
  return await prisma.course.create({ data });
}

async function updateCourse({ where, data }: Prisma.CourseUpdateArgs) {
  return await prisma.course.update({ where, data });
}

async function deleteCourse(id: Prisma.CourseWhereUniqueInput) {
  return await prisma.course.delete({ where: id });
}

async function findCourseById({ id }: Prisma.CourseWhereUniqueInput) {
  return await prisma.course.findUnique({ where: { id } });
}

export const coursesRepository = {
  findAll,
  findAllWithClassesFilteredOfferStatus,
  createCourse,
  updateCourse,
  deleteCourse,
  findCourseById,
};
