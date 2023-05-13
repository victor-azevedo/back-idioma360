import { Prisma } from "@prisma/client";

export const studentTest: Prisma.UserCreateInput = {
  name: "Fulano",
  fullName: "Fulano Estudante Teste",
  birthday: "1990-01-01",
  cpf: "239.562.230-39",
  email: "fulano@idioma360.br",
  phone: "(85)98765-1234",
  address: {
    create: {
      street: "Rua L. Hamilton",
      number: "44",
      district: "Parque Mercedes",
      postalCode: "60350-000",
      cityId: 2304400,
    },
  },
};

export const adminTest: Prisma.UserCreateInput = {
  name: "Sicrano",
  fullName: "Sicrano Admin Teste",
  birthday: "1980-01-01",
  cpf: "148.865.810-21",
  email: "sicrano@idioma360.br",
  phone: "(83)98765-1234",
  address: {
    create: {
      street: "Rua Alegre",
      number: "24",
      district: "Parque da Felicidade",
      postalCode: "58000-600",
      cityId: 2507507,
    },
  },
};
