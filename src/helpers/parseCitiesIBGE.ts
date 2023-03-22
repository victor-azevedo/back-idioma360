import { citiesIBGE } from "@/mock/dataIBGE";
import { City } from "@prisma/client";

export const cities: City[] = citiesIBGE.map((city) => {
  const stateId = city.microrregiao.mesorregiao.UF.id;
  return { id: city.id, name: city.nome, stateId };
});
