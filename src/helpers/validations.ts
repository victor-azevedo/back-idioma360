import { removeCpfDots } from "@/helpers";

export function isValidCPF(cpfToCheck: string): boolean {
  let remainder: number;
  let digitsSum = 0;

  const cpf = removeCpfDots(cpfToCheck);

  if (cpf.length !== 11 || cpf == "00000000000") return false;

  for (let i = 1; i <= 9; i++) digitsSum = digitsSum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (digitsSum * 10) % 11;

  if (remainder == 10 || remainder == 11) remainder = 0;
  if (remainder != parseInt(cpf.substring(9, 10))) return false;

  digitsSum = 0;
  for (let i = 1; i <= 10; i++) digitsSum = digitsSum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (digitsSum * 10) % 11;

  if (remainder == 10 || remainder == 11) remainder = 0;
  if (remainder != parseInt(cpf.substring(10, 11))) return false;
  return true;
}
