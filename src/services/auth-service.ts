import { conflictError, unprocessableEntityError } from "@/errors";
import { isValidCPF } from "@/helpers";
import { offeringsRepository, userSessionsRepository, usersAuthRepository, usersRepository } from "@/repositories";
import { SignInBody, SignUpBody } from "@/schemas";
import { RolesTypes, User, UserAuth } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserOrFail, getUserTestEmailOrFail, validatePasswordOrFail } from "./validations";

async function signUpStudent(params: SignUpBody) {
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

  await usersAuthRepository.createUserStudent({
    user: { create: { ...userData, birthday: new Date(userData.birthday + "T00:00") } },
    password: passwordHash,
    role: "student",
  });

  return;
}

async function signIn(params: SignInBody) {
  const { email, password } = params;

  const userCredentials = await getUserOrFail(email);

  await validatePasswordOrFail(password, userCredentials.userAuth.password);

  const token = await createSession(userCredentials);

  if (process.env.PORTFOLIO === "true") {
    await updateOfferingTestDateToPortfolio();
  }

  return token;
}

async function signInUserTest(userRole: RolesTypes) {
  const email = getUserTestEmailOrFail(userRole);

  const userCredentials = await getUserOrFail(email);

  const token = await createSession(userCredentials);

  if (process.env.PORTFOLIO === "true") {
    await updateOfferingTestDateToPortfolio();
  }

  return token;
}

async function createSession(
  userCredentials: User & {
    userAuth: UserAuth;
  },
) {
  const { id, name, userAuth } = userCredentials;
  const token = jwt.sign({ userId: id, userName: name, role: userAuth.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
  await userSessionsRepository.create({ token, userId: id });

  return token;
}

export const authService = {
  signUpStudent,
  signIn,
  signInUserTest,
};

async function updateOfferingTestDateToPortfolio() {
  const openOffering = await offeringsRepository.findFirstOpen();
  if (openOffering) {
    await offeringsRepository.updateTestDate(openOffering.id);
  }
}
