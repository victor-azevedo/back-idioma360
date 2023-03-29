import { conflictError, notFoundError, unauthorizedError, unprocessableEntityError } from "@/errors";
import { isValidCPF } from "@/helpers";
import { usersAuthRepository, userSessionsRepository, usersRepository } from "@/repositories";
import { SignInBody, SignUpBody } from "@/schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    user: { create: { ...userData, birthday: new Date(userData.birthday + "T00:00") } },
    password: passwordHash,
  });

  return;
}

async function signIn(params: SignInBody) {
  const { email, password } = params;

  const userCredentials = await getUserOrFail(email);

  await validatePasswordOrFail(password, userCredentials.userAuth.password);

  const token = await createSession(userCredentials.id);

  return token;
}

async function getUserOrFail(email: string) {
  const userCredentials = await usersRepository.findUserByEmail(email);
  if (!userCredentials) throw notFoundError(`Not found ${email}`);

  return userCredentials;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw unauthorizedError("Invalid credentials");
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await userSessionsRepository.create({ token, userId });

  return token;
}

export const usersService = {
  signUp,
  signIn,
};
