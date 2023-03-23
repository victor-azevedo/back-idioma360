import { prisma } from "@/config";
import { Prisma, UserAuth } from "@prisma/client";

async function create(data: Prisma.UserAuthCreateInput) {
  return await prisma.userAuth.create({ data });
}

async function createAuth(data: Omit<UserAuth, "id">) {
  await prisma.userAuth.create({ data });
}

export const usersAuthRepository = {
  create,
  createAuth
};
