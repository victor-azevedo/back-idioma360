import { badRequestError, conflictError, notFoundError } from "@/errors";
import { isValidCEP, isValidCityId, userAlreadyHaveAddress } from "@/helpers";
import { addressRepository, usersRepository } from "@/repositories";
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

  if (!(await isValidCityId(userAddressBody.cityId))) {
    throw notFoundError();
  }

  if (await userAlreadyHaveAddress(userId)) {
    throw conflictError();
  }

  const userAddress = await addressRepository.createUserAddress(userAddressBody);

  await usersRepository.updateAddressId({ userId, addressId: userAddress.id });
}

async function findUserAddress(userId: number) {
  const { address } = await usersRepository.findUserAddress(userId);

  if (!address) {
    throw notFoundError();
  }

  return address;
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
