import { conflictError, unprocessableEntityError } from "@/errors";
import { isValidCPF } from "@/helpers";
import { usersAuthRepository, usersRepository } from "@/repositories";
import { SignUpBody } from "@/schemas";
import bcrypt from "bcrypt";

async function signUp(params: SignUpBody) {
  const { password, ...userData } = params;
  const { cpf, email, phone } = userData;

  if (!isValidCPF(cpf)) {
    throw unprocessableEntityError("Is not a valid CPF");
  }

  const userDuplicatedExist = await usersRepository.findDuplicatedUser({ cpf, email, phone });
  if (userDuplicatedExist) {
    let message = "";
    if (cpf === userDuplicatedExist.cpf) {
      message += `The CPF ${cpf} is already registered\n`;
    }
    if (phone === userDuplicatedExist.phone) {
      message += `The phone ${phone} is already registered\n`;
    }
    if (email === userDuplicatedExist.email) {
      message += `The email ${email} is already registered\n`;
    }
    throw conflictError(message);
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  await usersAuthRepository.create({
    user: { create: { ...userData, birthday: new Date(userData.birthday) } },
    password: passwordHash,
  });

  return;
}

export const usersService = {
  signUp,
};
