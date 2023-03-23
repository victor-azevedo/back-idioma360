import { prisma } from "@/config";
import { cities, states } from "@/helpers";

export async function cleanUsersDb() {
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

export function cpfGeneratorValid() {
  const firstCpfField = getRandomFieldNumericGenerator(3);
  const secondCpfField = getRandomFieldNumericGenerator(3);
  const thirdCpfField = getRandomFieldNumericGenerator(3);
  const checkDigit1 = checkCpfDigitGenerator(firstCpfField, secondCpfField, thirdCpfField).toString();
  const checkDigit2 = checkCpfDigitGenerator(firstCpfField, secondCpfField, thirdCpfField, checkDigit1);
  return `${firstCpfField}.${secondCpfField}.${thirdCpfField}-${checkDigit1}${checkDigit2}`;
}

export function cpfGeneratorInvalid() {
  const validCpf = cpfGeneratorValid();
  const firstDigit = parseInt(validCpf[0]);
  const newFirstDigit = firstDigit === 9 ? firstDigit - 1 : firstDigit + 1;
  const invalidCpf = newFirstDigit + validCpf.slice(1);
  return invalidCpf;
}

function checkCpfDigitGenerator(filed1: string, filed2: string, filed3: string, n4?: string) {
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

export function phoneGenerator() {
  const dddField = getRandomFieldNumericGenerator(2);
  const firstPhoneField = getRandomFieldNumericGenerator(getRandomIntInclusive(4, 5));
  const secondPhoneField = getRandomFieldNumericGenerator(4);
  return `(${dddField})${firstPhoneField}-${secondPhoneField}`;
}

function getRandomFieldNumericGenerator(digitsNumber: number) {
  const factor = Math.pow(10, digitsNumber) - 1;
  const fieldNumeric = Math.floor(Math.random() * factor);
  return ("" + fieldNumeric).padStart(digitsNumber, "9");
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
