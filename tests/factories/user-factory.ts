import { prisma } from "@/config";
import { SignUpBody } from "@/schemas";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { cpfGeneratorValid, phoneGenerator } from "../helpers";

export function signUpBody(params: Partial<SignUpBody> = {}) {
  const newSignUpBody: SignUpBody = {
    name: params.name || faker.name.firstName(),
    fullName: params.fullName || faker.name.firstName(),
    birthday: params.birthday || faker.date.birthdate({ min: 14, max: 120, mode: "age" }),
    cpf: params.cpf || cpfGeneratorValid(),
    phone: params.phone || phoneGenerator(),
    email: params.email || faker.internet.email(),
    password: params.password || faker.internet.password(8),
  };
  return { ...newSignUpBody, birthday: dayjs(newSignUpBody.birthday).format("YYYY-MM-DD") };
}

export function signUp(params: Partial<SignUpBody> = {}) {
  const newSignUp: SignUpBody = {
    name: params.name || faker.name.firstName(),
    fullName: params.fullName || faker.name.firstName(),
    birthday: params.birthday || faker.date.birthdate({ min: 14, max: 120, mode: "age" }),
    cpf: params.cpf || cpfGeneratorValid(),
    phone: params.phone || phoneGenerator(),
    email: params.email || faker.internet.email(),
    password: params.password || faker.internet.password(8),
  };
  return { ...newSignUp };
}

export async function createUser(params?: SignUpBody) {
  const { password, ...userData } = params || signUpBody();

  const passwordHash = bcrypt.hashSync(password, 10);

  const data = { user: { create: { ...userData, birthday: new Date(userData.birthday) } }, password: passwordHash };
  return await prisma.userAuth.create({ data, include: { user: true } });
}
