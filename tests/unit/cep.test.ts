import { isValidCEP } from "@/helpers";

describe("CEP validation", () => {
  const validCEPs: string[] = ["76962-008", "59607-258", "56909-010", "64034-258"];
  const invalidCEPs: string[] = ["00000-000", "12345-123", "11111-111", "99999-999"];

  it("Check invalids CEPs", () => {
    invalidCEPs.forEach(async (invalidCEP) => expect(await isValidCEP(invalidCEP)).toBe(false));
  });

  it("Check valid CEPs", async () => {
    validCEPs.forEach(async (validCEP) => expect(await isValidCEP(validCEP)).toBe(true));
  });

  it("Check invalid CEP param", async () => {
    expect(await isValidCEP("123456789")).toBe(false);
  });
});
