import { prisma } from "@/config";
import { cities, states } from "@/helpers";

export async function cleanDb() {
  await prisma.userSession.deleteMany();
  await prisma.userAuth.deleteMany();
  await prisma.user.deleteMany();
}

export async function deleteStatesDb() {
  await prisma.city.deleteMany();
  await prisma.state.deleteMany();
}

export async function insertStatesDb() {
  await prisma.state.createMany({
    data: states,
  });
  await prisma.city.createMany({
    data: cities,
  });
}

export function cpfGenerator() {
  const firstCpfField = randomCpfFieldGenerator();
  const secondCpfField = randomCpfFieldGenerator();
  const thirdCpfField = randomCpfFieldGenerator();
  const checkDigit1 = checkDigitGenerator(firstCpfField, secondCpfField, thirdCpfField).toString();
  const checkDigit2 = checkDigitGenerator(firstCpfField, secondCpfField, thirdCpfField, checkDigit1);
  return `${firstCpfField}.${secondCpfField}.${thirdCpfField}-${checkDigit1}${checkDigit2}`;
}

function checkDigitGenerator(filed1: string, filed2: string, filed3: string, n4?: string) {
  const digits = filed1.split("").concat(filed2.split(""), filed3.split(""));
  if (n4 !== undefined) {
    digits[9] = n4;
  }

  let x = 0;
  for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
    x += parseInt(digits[j]) * i;
  }

  const y = x % 11;
  return y < 2 ? 0 : 11 - y;
}

function randomCpfFieldGenerator() {
  const threeRandomDigits = Math.floor(Math.random() * 999);
  return ("" + threeRandomDigits).padStart(3, "0");
}
