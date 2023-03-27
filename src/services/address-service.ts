import { notFoundError } from "@/errors";
import { isValidCEP, isValidCityId } from "@/helpers";
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

  if (!states.length) {
    throw notFoundError();
  }

  return states;
}

async function findUFCities(uf: StateUF) {
  const ufCities = await addressRepository.findUFCities(uf);

  if (!ufCities.length) {
    throw notFoundError();
  }

  return ufCities;
}

export const addressService = {
  createUserAddress,
  findUserAddress,
  findStates,
  findUFCities,
};