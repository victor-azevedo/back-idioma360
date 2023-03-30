import { conflictError, notFoundError } from "@/errors";
import { offeringsRepository } from "@/repositories";
import { enrollmentsRepository } from "@/repositories/enrollments-repository";
import { Prisma } from "@prisma/client";

async function findAll() {
  return await offeringsRepository.findAll();
}

async function createEnrollment({ userId, offeringId }: Prisma.EnrollmentCreateManyInput) {
  const offering = await offeringsRepository.findById(offeringId);

  if (!offering) {
    throw notFoundError("Invalid offering id");
  }

  const enrolmentAlreadyExist = await enrollmentsRepository.findByUserIdAndOfferingId({ userId, offeringId });

  if (enrolmentAlreadyExist) {
    throw conflictError("user already has enrollment to this offering");
  }

  await enrollmentsRepository.createEnrollment({ userId, offeringId });
}

export const offeringsService = {
  findAll,
  createEnrollment,
};
