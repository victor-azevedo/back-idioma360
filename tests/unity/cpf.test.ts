import { isValidCPF } from "@/helpers";
import { cpfGenerator } from "../helpers";

describe("CPF test", () => {
  it("Check invalids cpf", async () => {
    expect(isValidCPF("00000000000")).toBe(false);
    expect(isValidCPF("000.000.000-00")).toBe(false);
    expect(isValidCPF("222.333.444-55")).toBe(false);
    expect(isValidCPF("456.4564.123-88")).toBe(false);
    expect(isValidCPF("618.456.246-37")).toBe(false);
    expect(isValidCPF("155.614.721-45")).toBe(false);
    expect(isValidCPF("934.463.167-10")).toBe(false);
  });

  it("Check valid cpf", async () => {
    expect(isValidCPF("738.508.770-19")).toBe(true);
    expect(isValidCPF("733.868.150-30")).toBe(true);
    expect(isValidCPF("945.463.890-43")).toBe(true);
    expect(isValidCPF("152.905.480-09")).toBe(true);
    expect(isValidCPF(cpfGenerator())).toBe(true);
    expect(isValidCPF(cpfGenerator())).toBe(true);
    expect(isValidCPF(cpfGenerator())).toBe(true);
    expect(isValidCPF(cpfGenerator())).toBe(true);
    expect(isValidCPF(cpfGenerator())).toBe(true);
    expect(isValidCPF(cpfGenerator())).toBe(true);
  });
});
