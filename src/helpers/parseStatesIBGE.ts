import { statesIBGE } from "@/mock/dataIBGE";
import { State, StateUF } from "@prisma/client";

export const states: State[] = statesIBGE.map((state) => {
  delete state.regiao;
  return { id: state.id, name: state.nome, uf: state.sigla as StateUF };
});

// export const statesUFList = states.map((state) => state.uf);
export const statesUFList = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
