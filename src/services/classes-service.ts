import { conflictError, notFoundError } from "@/errors";
import { classesRepository, enrollmentsRepository } from "@/repositories";
import { Classe, Course, Offering } from "@prisma/client";

async function findAll() {
  return await classesRepository.findAll();
}

async function findClasseByIdWithUserEnrollment({ id, userId }: { id: number; userId: number }) {
  const classe = await classesRepository.findClasseByIdWithUserEnrollment({ id, userId });

  if (!classe) {
    throw notFoundError();
  }

  const classeResponse: ClasseResponse = {
    ...classe,
    course: { ...classe.course },
    offerings: { ...classe.offering },
    isUserEnrolledFOrThisClasse: classe.enrollments.length > 0 ? true : false,
  };

  return classeResponse;
}

async function createClasseEnroll({ id, userId }: { id: number; userId: number }) {
  const classe = await classesRepository.findById(id);
  if (!classe) {
    throw notFoundError("Turma não encontrada");
  }

  const userEnrollmentForThisClasse = await enrollmentsRepository.findByUserIdAndClasseId({ userId, classeId: id });
  if (userEnrollmentForThisClasse) {
    throw conflictError("Usuário já  inscrito para esta turma");
  }

  await enrollmentsRepository.createEnrollment({ userId, classeId: id });
  return;
}

export const classesService = {
  findAll,
  findClasseByIdWithUserEnrollment,
  createClasseEnroll,
};

type ClasseResponse = Classe & {
  course: Course;
  offerings: Offering;
  isUserEnrolledFOrThisClasse: boolean;
};
