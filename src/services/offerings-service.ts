import { offeringsRepository } from "@/repositories";

async function findAll({ userId, includeEnrollments }: { userId: number; includeEnrollments: boolean }) {
  if (includeEnrollments) {
    return await offeringsRepository.findAllWithUserEnrollments(userId);
  }

  return await offeringsRepository.findAll();
}

export const offeringsService = {
  findAll,
};
