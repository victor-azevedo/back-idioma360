import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.UserSessionUncheckedCreateInput) {
  const { token, userId } = data;
  return await prisma.userSession.create({ data: { token, userId } });
}

export const userSessionsRepository = {
  create,
};
