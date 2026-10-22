import { CzechiaTinValidator } from "../../../../src/validators/countries/CzechiaTinValidator";

describe("CzechiaTinValidator", () => {
    const validator = CzechiaTinValidator;

    test("should support Czechia country codes", () => {
        expect(validator.isCountrySupported("CZ")).toBe(true);
        expect(validator.isCountrySupported("CZE")).toBe(true);
        expect(validator.isCountrySupported("203")).toBe(true);
        expect(validator.isCountrySupported("CA")).toBe(false);
    });

    test("should support lowercase country codes", () => {
        expect(validator.isCountrySupported("cz")).toBe(true);
        expect(validator.isCountrySupported("cze")).toBe(true);
    });

    test("should accept a valid nine-digit Czechia TIN", () => {
        expect(validator.validate("900101123")).toBe(true);
    });

    test("should accept a valid ten-digit Czechia TIN", () => {
        expect(validator.validate("9001011234")).toBe(true);
    });

    test("should reject an invalid day", () => {
        expect(validator.validate("900132123")).toBe(false);
    });

    test("should reject an invalid month", () => {
        expect(validator.validate("901301123")).toBe(false);
    });

    test("should reject an invalid date", () => {
        expect(validator.validate("000000123")).toBe(false);
    });

    test("should reject February 29 in a non-leap year", () => {
        expect(validator.validate("990229123")).toBe(false);
    });

    test("should accept February 29 in a leap year", () => {
        expect(validator.validate("000229123")).toBe(true);
    });

    test("should reject an invalid length", () => {
        expect(validator.validate("90010112")).toBe(false);
        expect(validator.validate("90010112345")).toBe(false);
    });

    test("should reject letters and special characters", () => {
        expect(validator.validate("90010A123")).toBe(false);
        expect(validator.validate("900101-23")).toBe(false);
    });

    test("should reject null and empty values", () => {
        expect(validator.validate(null)).toBe(false);
        expect(validator.validate("")).toBe(false);
    });

    test("should reject whitespace-only values", () => {
        expect(validator.validate("           ")).toBe(false);
    });
});
