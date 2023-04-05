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

export const coursesRepository = {
  findAll,
  findAllWithClassesFilteredOfferStatus,
};
