import { prisma } from "@/config";
import { User } from "@prisma/client";

async function findDuplicatedUser(params: Pick<User, "email" | "cpf" | "phone">) {
  const { email, cpf, phone } = params;
  return await prisma.user.findFirst({ where: { OR: [{ email }, { cpf }, { phone }] } });
}

async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email }, include: { userAuth: true } });
}

async function updateAddressId({ userId, addressId }: { userId: number; addressId: number }) {
  return await prisma.user.update({ where: { id: userId }, data: { addressId } });
}

async function findUserAddress(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    select: { address: { include: { city: { include: { state: true } } } } },
  });
}

export const usersRepository = {
  findDuplicatedUser,
  findUserByEmail,
  updateAddressId,
  findUserAddress,
};
