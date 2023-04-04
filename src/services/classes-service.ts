import { notFoundError } from "@/errors";
import { classesRepository } from "@/repositories";
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

export const classesService = {
  findAll,
  findClasseByIdWithUserEnrollment,
};

type ClasseResponse = Classe & {
  course: Course;
  offerings: Offering;
  isUserEnrolledFOrThisClasse: boolean;
};
