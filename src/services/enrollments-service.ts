import { badRequestError, conflictError, notFoundError } from "@/errors";
import { classesRepository, enrollmentsRepository } from "@/repositories";
import { Enrollment } from "@prisma/client";

async function createEnrollment({ userId, classeId }: Pick<Enrollment, "userId" | "classeId">) {
  const classe = await classesRepository.findById(classeId);
  if (!classe) {
    throw notFoundError("Turma não encontrada");
  }

  if (classe.offering.status !== "open") {
    throw badRequestError("Turma não disponível para inscrição");
  }

  const userEnrolledForThisOffer = await enrollmentsRepository.findUserEnrollSameClasseOffer({ userId, classeId });
  if (userEnrolledForThisOffer) {
    throw conflictError("Usuário já inscritos para outra turma desta Seleção");
  }

  const userEnrollForThisClasse = await enrollmentsRepository.findByUserIdAndClasseId({ userId, classeId });
  if (userEnrollForThisClasse) {
    throw conflictError("Usuário já inscrito para esta turma");
  }

  await enrollmentsRepository.createEnrollment({ userId, classeId });
  return await enrollmentsRepository.createEnrollment({ userId, classeId });
}

async function findUserEnrolls({ userId }: Pick<Enrollment, "userId">) {
  return await enrollmentsRepository.findUserEnrolls({ userId });
}

export const enrollmentsService = {
  createEnrollment,
  findUserEnrolls,
};
