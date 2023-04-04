import { conflictError, notFoundError } from "@/errors";
import { classesRepository, enrollmentsRepository } from "@/repositories";
import { Enrollment } from "@prisma/client";

async function createEnrollment({ userId, classeId }: Pick<Enrollment, "userId" | "classeId">) {
  const classe = await classesRepository.findById(classeId);
  if (!classe) {
    throw notFoundError("Turma não encontrada");
  }

  const userEnrollForThisClasse = await enrollmentsRepository.findByUserIdAndClasseId({ userId, classeId });
  if (userEnrollForThisClasse) {
    throw conflictError("Usuário ja inscrito para esta turma");
  }

  return await enrollmentsRepository.createEnrollment({ userId, classeId });
}
export const enrollmentsService = {
  createEnrollment,
};
