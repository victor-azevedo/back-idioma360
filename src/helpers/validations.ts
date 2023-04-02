import { removeCpfDots } from "@/helpers";
import { addressRepository } from "@/repositories";
import { getViaCEPAddress } from "@/utils/cep-service";

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

export async function isValidCEP(cep: string) {
  const resultViaCEP = await getViaCEPAddress(cep.replace("-", ""));

  if (resultViaCEP === null || resultViaCEP.erro) {
    return false;
  }

  return true;
}

export async function isValidCityId(id: number) {
  const city = await addressRepository.findCityById(id);

  if (!city) {
    return false;
  }
  return true;
}

export async function userAlreadyHaveAddress(userId: number) {
  const userAddress = await addressRepository.findUserAddress(userId);

  if (userAddress) {
    return true;
  }
  return false;
}
