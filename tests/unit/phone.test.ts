import { PHONE_PATTERN } from "@/helpers";
import { phoneGenerator } from "../helpers";

describe("Phone numbers", () => {
  const phoneNumbers: string[] = [];

  for (let i = 0; i <= 10; i++) {
    phoneNumbers.push(phoneGenerator());
  }

  const regexPhonePattern = new RegExp(PHONE_PATTERN);

  it("Check valid phone pattern", () => {
    phoneNumbers.forEach((phone) => expect(regexPhonePattern.test(phone)).toBe(true));
  });
});
