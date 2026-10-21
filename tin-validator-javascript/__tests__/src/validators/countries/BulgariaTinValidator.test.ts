
import { BulgariaTinValidator } from "../../../../src/validators/countries/BulgariaTinValidator";

describe("BulgariaTinValidator", () => {
    const validator = BulgariaTinValidator;

    test("should support Bulgaria country codes", () => {
        expect(validator.isCountrySupported("BG")).toBe(true);
        expect(validator.isCountrySupported("BGR")).toBe(true);
        expect(validator.isCountrySupported("100")).toBe(true);
        expect(validator.isCountrySupported("BE")).toBe(false);
    });

    test("should reject a TIN with an invalid length", () => {
        expect(validator.validate("123456789")).toBe(false);
        expect(validator.validate("12345678901")).toBe(false);
    });

    test("should reject a TIN containing letters", () => {
        expect(validator.validate("12345678A0")).toBe(false);
    });

    test("should reject a TIN containing special characters", () => {
        expect(validator.validate("12345-7890")).toBe(false);
    });

    test("should reject null and empty TIN values", () => {
        expect(validator.validate(null)).toBe(false);
        expect(validator.validate("")).toBe(false);
    });
});
