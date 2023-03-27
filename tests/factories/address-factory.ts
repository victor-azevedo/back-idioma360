import { prisma } from "@/config";
import { AddressBody } from "@/schemas";
import { faker } from "@faker-js/faker";

export async function userAddressBody(params: Partial<AddressBody> = {}) {
  const newUserAddress: AddressBody = {
    street: params.street || faker.address.street(),
    number: params.number || faker.address.buildingNumber(),
    complement: params.complement || faker.address.buildingNumber(),
    district: params.district || faker.address.county(),
    postalCode: params.postalCode || "58038-600",
    cityId: params.cityId || (await getRandomCity()).id,
  };
  return newUserAddress;
}

export async function createUserAddress(userId: number) {
  const newAddress = await userAddressBody();

  const userAddress = await prisma.address.create({ data: newAddress });
  await prisma.user.update({ where: { id: userId }, data: { addressId: userAddress.id } });

  const { address } = await prisma.user.findUnique({
    where: { id: userId },
    select: { address: { include: { city: { include: { state: true } } } } },
  });
  return address;
}

export async function getRandomCity() {
  const cities = await prisma.city.findMany();
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  return randomCity;
}
