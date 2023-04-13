import { forbiddenError } from "@/errors";
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

type OfferFindAll = {
  userId: number;
  includeEnrollments: boolean;
  status: OfferStatus;
};

export const offeringsService = {
  findAll,
  createOffer,
};
