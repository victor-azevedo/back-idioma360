import { forbiddenError } from "@/errors";
import { offeringsRepository } from "@/repositories";
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

type OfferFindAll = {
  userId: number;
  includeEnrollments: boolean;
  status: OfferStatus;
};

export const offeringsService = {
  findAll,
};
