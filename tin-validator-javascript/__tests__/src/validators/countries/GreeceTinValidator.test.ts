
import { GreeceTinValidator } from "../../../../src/validators/countries/GreeceTinValidator";

describe("GreeceTinValidator", () => {
    const validator = GreeceTinValidator;

    describe("isCountrySupported", () => {
        it("should support GR country code", () => {
            expect(validator.isCountrySupported("GR")).toBe(true);
        });

        it("should support GRC country code", () => {
            expect(validator.isCountrySupported("GRC")).toBe(true);
        });

        it("should support numeric country code 300", () => {
            expect(validator.isCountrySupported("300")).toBe(true);
        });

        it("should support lowercase country codes", () => {
            expect(validator.isCountrySupported("gr")).toBe(true);
            expect(validator.isCountrySupported("grc")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(validator.isCountrySupported("DE")).toBe(false);
            expect(validator.isCountrySupported("US")).toBe(false);
            expect(validator.isCountrySupported("FR")).toBe(false);
            expect(validator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate", () => {
        it("should accept a valid nine-digit TIN", () => {
            expect(validator.validate("123456789")).toBe(true);
        });

        it("should accept a TIN starting with zero", () => {
            expect(validator.validate("012345678")).toBe(true);
        });

        it("should accept a TIN containing only zeros", () => {
            expect(validator.validate("000000000")).toBe(true);
        });

        it("should accept a TIN starting with one", () => {
            expect(validator.validate("123456789")).toBe(true);
        });

        it("should accept a TIN starting with nine", () => {
            expect(validator.validate("923456789")).toBe(true);
        });

        it("should accept a TIN containing repeated digits", () => {
            expect(validator.validate("111111111")).toBe(true);
            expect(validator.validate("999999999")).toBe(true);
        });

        it("should reject null", () => {
            expect(validator.validate(null)).toBe(false);
        });

        it("should reject an empty TIN", () => {
            expect(validator.validate("")).toBe(false);
        });

        it("should reject a TIN shorter than nine digits", () => {
            expect(validator.validate("12345678")).toBe(false);
        });

        it("should reject a TIN longer than nine digits", () => {
            expect(validator.validate("1234567890")).toBe(false);
        });

        it("should reject letters without enough digits", () => {
            expect(validator.validate("ABCDEFGHI")).toBe(false);
        });

        it("should reject alphanumeric input with fewer than nine digits", () => {
            expect(validator.validate("12345AB")).toBe(false);
        });

        it("should reject a TIN containing only special characters", () => {
            expect(validator.validate("!@#$%^&*(")).toBe(false);
        });

        it("should validate a negative TIN after sanitising", () => {
            expect(validator.validate("-123456789")).toBe(true);
        });

        it("should reject a positive signed TIN with fewer than nine digits", () => {
            expect(validator.validate("+12345678")).toBe(false);
        });

        it("should validate a decimal TIN after sanitising", () => {
            expect(validator.validate("12345678.9")).toBe(true);
        });

        it("should reject a TIN containing non-ASCII digits", () => {
            expect(validator.validate("１２３４５６７８９")).toBe(false);
        });

        it("should reject a TIN containing only spaces", () => {
            expect(validator.validate("         ")).toBe(false);
        });

        it("should validate a TIN after sanitising special characters", () => {
            expect(validator.validate("1234-56789")).toBe(true);
        });

        it("should validate a TIN after sanitising spaces", () => {
            expect(validator.validate("1234 56789")).toBe(true);
        });

        it("should validate a TIN after sanitising multiple special characters", () => {
            expect(validator.validate("123-45-6789")).toBe(true);
        });

        it("should validate a TIN after sanitising letters", () => {
            expect(validator.validate("1234AB56789")).toBe(true);
        });

        it("should reject a sanitised TIN with fewer than nine digits", () => {
            expect(validator.validate("1234-5678")).toBe(false);
        });

        it("should reject a sanitised TIN with more than nine digits", () => {
            expect(validator.validate("12345-67890")).toBe(false);
        });

        it("should validate a TIN containing a decimal point after sanitising", () => {
            expect(validator.validate("1234567.89")).toBe(true);
        });

        it("should validate a TIN containing multiple letters after sanitising", () => {
            expect(validator.validate("12AB34CD56789")).toBe(true);
        });

        it("should reject a TIN containing tabs when digit count is insufficient", () => {
            expect(validator.validate("1234\t5678")).toBe(false);
        });

        it("should validate a TIN containing tabs after sanitising", () => {
            expect(validator.validate("1234\t56789")).toBe(true);
        });
    });
});
