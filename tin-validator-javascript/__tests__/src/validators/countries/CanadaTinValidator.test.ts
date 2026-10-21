
import { CanadaTinValidator } from "../../../../src/validators/countries/CanadaTinValidator";

describe("CanadaTinValidator", () => {
    const validator = CanadaTinValidator;

    test("should support Canada country codes", () => {
        expect(validator.isCountrySupported("CA")).toBe(true);
        expect(validator.isCountrySupported("CAN")).toBe(true);
        expect(validator.isCountrySupported("124")).toBe(true);
        expect(validator.isCountrySupported("BG")).toBe(false);
    });

    test("should accept a valid 9-digit Luhn number", () => {
        expect(validator.validate("046454286")).toBe(true);
    });

    test("should reject an invalid checksum", () => {
        expect(validator.validate("046454287")).toBe(false);
    });

    test("should reject an invalid length", () => {
        expect(validator.validate("12345678")).toBe(false);
        expect(validator.validate("1234567890")).toBe(false);
    });

    test("should reject letters and special characters", () => {
        expect(validator.validate("12345678A")).toBe(false);
        expect(validator.validate("123-56789")).toBe(false);
    });

    test("should reject null and empty values", () => {
        expect(validator.validate(null)).toBe(false);
        expect(validator.validate("")).toBe(false);
    });
});
