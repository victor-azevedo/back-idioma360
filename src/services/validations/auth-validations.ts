import { conflictError, notFoundError, unauthorizedError } from "@/errors";
import { usersRepository } from "@/repositories";
import { RolesTypes } from "@prisma/client";
import bcrypt from "bcrypt";

export async function getUserOrFail(email: string) {
  const userCredentials = await usersRepository.findUserByEmail(email);
  if (!userCredentials) throw notFoundError(`Not found ${email}`);

  return userCredentials;
}

export function getUserTestEmailOrFail(userRole: RolesTypes) {
  let email: string;
  if (userRole === "admin") {
    email = "sicrano@idioma360.br";
  } else if (userRole === "student") {
    email = "fulano@idioma360.br";
  } else {
    throw conflictError();
  }

  return email;
}

export async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw unauthorizedError("Invalid credentials");
}
