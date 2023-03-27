import { isValidCPF } from "@/helpers";
import { cpfGeneratorInvalid, cpfGeneratorValid } from "../helpers";

describe("CPF test", () => {
  const validCpfs: string[] = [];
  const invalidCpfs: string[] = [];

  for (let i = 0; i <= 10; i++) {
    validCpfs.push(cpfGeneratorValid());
    invalidCpfs.push(cpfGeneratorInvalid());
  }

  it("Check invalids CPFs", () => {
    expect(isValidCPF("00000000000")).toBe(false);
    expect(isValidCPF("000.000.000-00")).toBe(false);
    expect(isValidCPF("456.4564.123-88")).toBe(false);
    expect(isValidCPF("618.456.246-37")).toBe(false);
    expect(isValidCPF("155.614.721-45")).toBe(false);
    invalidCpfs.forEach((invalidCpf) => expect(isValidCPF(invalidCpf)).toBe(false));
  });

  it("Check valid CPFs", () => {
    expect(isValidCPF("73850877019")).toBe(true);
    expect(isValidCPF("738.508.770-19")).toBe(true);
    expect(isValidCPF("733.868.150-30")).toBe(true);
    expect(isValidCPF("945.463.890-43")).toBe(true);
    expect(isValidCPF("152.905.480-09")).toBe(true);
    validCpfs.forEach((validCpf) => expect(isValidCPF(validCpf)).toBe(true));
  });
});
