import { notFoundError, unauthorizedError } from "@/errors";
import { usersRepository } from "@/repositories";
import bcrypt from "bcrypt";

export async function getUserOrFail(email: string) {
  const userCredentials = await usersRepository.findUserByEmail(email);
  if (!userCredentials) throw notFoundError(`Not found ${email}`);

  return userCredentials;
}

export async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw unauthorizedError("Invalid credentials");
}
