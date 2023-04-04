import { prisma } from "@/config";
import { User } from "@prisma/client";

async function findDuplicatedUser(params: Pick<User, "email" | "cpf" | "phone">) {
  const { email, cpf, phone } = params;
  return await prisma.user.findFirst({ where: { OR: [{ email }, { cpf }, { phone }] } });
}

async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email }, include: { userAuth: true } });
}

async function findUserById(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

async function findUserData(id: number, includeAddress: boolean) {
  return await prisma.user.findUnique({ where: { id }, include: { address: includeAddress } });
}

export const usersRepository = {
  findDuplicatedUser,
  findUserByEmail,
  findUserById,
  findUserData,
};
