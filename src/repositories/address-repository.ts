import { prisma } from "@/config";
import { Prisma, StateUF } from "@prisma/client";

async function createUserAddress(data: Prisma.AddressCreateManyInput) {
  return await prisma.address.create({ data });
}

async function findStates() {
  return await prisma.state.findMany({
    orderBy: { uf: "asc" },
  });
}

async function findUFCities(uf: StateUF) {
  return await prisma.city.findMany({
    where: { state: { uf: { equals: uf } } },
    orderBy: { name: "asc" },
  });
}

async function findCityById(id: number) {
  return await prisma.city.findUnique({
    where: { id },
  });
}

export const addressRepository = {
  createUserAddress,
  findStates,
  findUFCities,
  findCityById,
};
