import { prisma } from "@/config";
import { UserSession } from "@prisma/client";

export async function createUserSession(token: string, userId: number): Promise<UserSession> {
  return prisma.userSession.create({
    data: {
      token,
      userId,
    },
  });
}
