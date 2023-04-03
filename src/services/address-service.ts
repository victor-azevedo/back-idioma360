import { badRequestError, conflictError, notFoundError } from "@/errors";
import { isValidCEP, isValidCityId, userAlreadyHaveAddress } from "@/helpers";
import { addressRepository } from "@/repositories";
import { AddressBody } from "@/schemas";
import { StateUF } from "@prisma/client";

async function createUserAddress(userId: number, userAddressBody: AddressBody) {
  const cep = userAddressBody.postalCode;

  if (!(await isValidCEP(cep))) {
    throw notFoundError();
  }

  if (!(await isValidCityId(userAddressBody.cityId))) {
    throw notFoundError();
  }

  if (await userAlreadyHaveAddress(userId)) {
    throw conflictError();
  }

  await addressRepository.createUserAddress({ ...userAddressBody, userId });
}

async function findUserAddress(userId: number) {
  const userAddress = await addressRepository.findUserAddress(userId);

  if (!userAddress) {
    throw notFoundError();
  }

  return userAddress;
}

async function findStates() {
  const states = await addressRepository.findStates();

  return states;
}

async function findUFCities(uf: StateUF) {
  if (!uf) {
    throw badRequestError();
  }

  const ufCities = await addressRepository.findUFCities(uf);

  return ufCities;
}

export const addressService = {
  createUserAddress,
  findUserAddress,
  findStates,
  findUFCities,
};
