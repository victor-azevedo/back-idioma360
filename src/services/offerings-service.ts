import { forbiddenError, handlePrismaError, notFoundError } from "@/errors";
import { parseDateToDB } from "@/helpers";
import { offeringsRepository } from "@/repositories";
import { OfferingBody } from "@/schemas";
import { OfferStatus, Prisma } from "@prisma/client";
import { validateDatesOrFail } from "./validations";

async function findAll({ userId, includeEnrollments, status }: OfferFindAll) {
  if (includeEnrollments) {
    return await offeringsRepository.findAllWithUserEnrollments(userId);
  }

  if (status) {
    if (status === "blocked") {
      throw forbiddenError("Apenas para admins");
    } else {
      return await offeringsRepository.findAllFilterStatus(status);
    }
  }

  return await offeringsRepository.findAll();
}

async function findById({ id }: Prisma.OfferingWhereUniqueInput) {
  return await offeringsRepository.findById({ id });
}

async function findByIdWithClasses({ id }: Prisma.OfferingWhereUniqueInput) {
  return await offeringsRepository.findByIdWithClasses({ id });
}

async function createOffer(offering: OfferingBody) {
  const datesParsed = parseDateToDB(offering);

  validateDatesOrFail(datesParsed);

  return await offeringsRepository.createOffer({
    ...offering,
    ...datesParsed,
  });
}

async function updateOffer({ id, offering }: { id: number; offering: Partial<OfferingBody> }) {
  const prevOffering = await offeringsRepository.findById({ id });
  if (!prevOffering) {
    throw notFoundError();
  }
  const { startDate, endDate, testDate, testStartTime, testEndTime, resultDate } = prevOffering;

  const datesParsed = parseDateToDB(offering);
  validateDatesOrFail({ startDate, endDate, testDate, testStartTime, testEndTime, resultDate, ...datesParsed });

  try {
    await offeringsRepository.updateOffer({ where: { id }, data: { ...offering, ...datesParsed } });
  } catch (error) {
    handlePrismaError(error);
  }

  return;
}

async function deleteOffer(id: number) {
  try {
    await offeringsRepository.deleteOffer({ id });
  } catch (error) {
    handlePrismaError(error);
  }

  return;
}

type OfferFindAll = {
  userId: number;
  includeEnrollments: boolean;
  status: OfferStatus;
};

export const offeringsService = {
  findAll,
  findById,
  findByIdWithClasses,
  createOffer,
  updateOffer,
  deleteOffer,
};
