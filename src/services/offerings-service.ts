import { forbiddenError, handlePrismaError } from "@/errors";
import { parseDateToDB } from "@/helpers";
import { offeringsRepository } from "@/repositories";
import { OfferingBody } from "@/schemas";
import { OfferStatus } from "@prisma/client";

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

async function createOffer(offering: OfferingBody) {
  const datesParsed = parseDateToDB(offering);

  return await offeringsRepository.createOffer({
    ...offering,
    ...datesParsed,
  });
}

async function updateOffer({ id, offering }: { id: number; offering: Partial<OfferingBody> }) {
  const datesParsed = parseDateToDB(offering);

  try {
    await offeringsRepository.updateOffer({ where: { id }, data: { ...offering, ...datesParsed } });
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
  createOffer,
  updateOffer,
};
