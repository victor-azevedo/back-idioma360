import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function createUserStudent(data: Prisma.UserAuthCreateInput) {
  return await prisma.userAuth.create({ data });
}

export const usersAuthRepository = {
  createUserStudent,
};
