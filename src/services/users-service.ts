import { unauthorizedError } from "@/errors";
import { usersRepository } from "@/repositories";

async function findUserData({ userId, id, includeAddress }: FindUserData) {
  if (userId !== id) {
    return unauthorizedError();
  }

  return await usersRepository.findUserData(userId, includeAddress);
}

export const usersService = {
  findUserData,
};

type FindUserData = {
  userId: number;
  id: number;
  includeAddress: boolean;
};
