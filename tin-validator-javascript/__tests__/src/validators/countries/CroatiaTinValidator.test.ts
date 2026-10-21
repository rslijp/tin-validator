
import { CroatiaTinValidator } from "../../../../src/validators/countries/CroatiaTinValidator";

describe("CroatiaTinValidator", () => {
    const validator = CroatiaTinValidator;

    test("should support Croatia country codes", () => {
        expect(validator.isCountrySupported("HR")).toBe(true);
        expect(validator.isCountrySupported("HRV")).toBe(true);
        expect(validator.isCountrySupported("191")).toBe(true);
        expect(validator.isCountrySupported("CA")).toBe(false);
    });

    test("should support lowercase country codes", () => {
        expect(validator.isCountrySupported("hr")).toBe(true);
        expect(validator.isCountrySupported("hrv")).toBe(true);
    });

    test("should accept a valid 11-digit Croatia TIN", () => {
        expect(validator.validate("12345678903")).toBe(true);
    });

    test("should accept a valid TIN with leading zeros", () => {
        expect(validator.validate("00000000001")).toBe(true);
    });

    test("should reject an invalid checksum", () => {
        expect(validator.validate("12345678901")).toBe(false);
        expect(validator.validate("12345678902")).toBe(false);
    });

    test("should reject an invalid length", () => {
        expect(validator.validate("1234567890")).toBe(false);
        expect(validator.validate("123456789034")).toBe(false);
    });

    test("should reject letters and special characters", () => {
        expect(validator.validate("1234567890A")).toBe(false);
        expect(validator.validate("12345-78903")).toBe(false);
    });

    test("should reject null and empty values", () => {
        expect(validator.validate(null)).toBe(false);
        expect(validator.validate("")).toBe(false);
    });

    test("should reject whitespace-only values", () => {
        expect(validator.validate("           ")).toBe(false);
    });
});
