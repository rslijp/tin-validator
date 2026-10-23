import { DenmarkTinValidator } from "../../../../src/validators/countries/DenmarkTinValidator";

describe("DenmarkTinValidator", () => {
    const validator = DenmarkTinValidator;

    test("should support Denmark country codes", () => {
        expect(validator.isCountrySupported("DK")).toBe(true);
        expect(validator.isCountrySupported("DNK")).toBe(true);
        expect(validator.isCountrySupported("208")).toBe(true);
        expect(validator.isCountrySupported("CA")).toBe(false);
    });

    test("should support lowercase country codes", () => {
        expect(validator.isCountrySupported("dk")).toBe(true);
        expect(validator.isCountrySupported("dnk")).toBe(true);
    });

    test("should reject an invalid length", () => {
        expect(validator.validate("010101000")).toBe(false);
        expect(validator.validate("01010100000")).toBe(false);
    });

    test("should reject letters and special characters", () => {
        expect(validator.validate("01010A0000")).toBe(false);
        expect(validator.validate("010101-000")).toBe(false);
    });

    test("should reject null and empty values", () => {
        expect(validator.validate(null)).toBe(false);
        expect(validator.validate("")).toBe(false);
    });

    test("should reject whitespace-only values", () => {
        expect(validator.validate("           ")).toBe(false);
    });

    test("should reject an invalid checksum", () => {
        expect(validator.validate("0101010000")).toBe(false);
        expect(validator.validate("0101010001")).toBe(false);
    });

    test("should reject a checksum remainder of one", () => {
        // First nine digits produce sum % 11 === 1.
        expect(validator.validate("0101000000")).toBe(false);
    });

    test("should reject an invalid day", () => {
        expect(validator.validate("3201990000")).toBe(false);
    });

    test("should reject an invalid month", () => {
        expect(validator.validate("0113990000")).toBe(false);
    });

    test("should reject February 29 in a non-leap year", () => {
        expect(validator.validate("2902990000")).toBe(false);
    });

    test("should reject an invalid zero date", () => {
        expect(validator.validate("0000000000")).toBe(false);
    });
});
