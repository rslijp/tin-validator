
import { ItalyTinValidator } from "../../../../src/validators/countries/ItalyTinValidator";

describe("ItalyTinValidator", () => {
    const validator = ItalyTinValidator;

    describe("isCountrySupported", () => {
        it("should support IT country code", () => {
            expect(validator.isCountrySupported("IT")).toBe(true);
        });

        it("should support ITA country code", () => {
            expect(validator.isCountrySupported("ITA")).toBe(true);
        });

        it("should support numeric country code 380", () => {
            expect(validator.isCountrySupported("380")).toBe(true);
        });

        it("should support lowercase country codes", () => {
            expect(validator.isCountrySupported("it")).toBe(true);
            expect(validator.isCountrySupported("ita")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(validator.isCountrySupported("GR")).toBe(false);
            expect(validator.isCountrySupported("DE")).toBe(false);
            expect(validator.isCountrySupported("US")).toBe(false);
            expect(validator.isCountrySupported("FR")).toBe(false);
            expect(validator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate - Italian Fiscal Code", () => {
        it("should accept a valid Italian fiscal code", () => {
            expect(validator.validate("RSSMRA85T10A562S")).toBe(true);
        });

        it("should accept lowercase Italian fiscal codes", () => {
            expect(validator.validate("rssmra85t10a562s")).toBe(true);
        });

        it("should reject an invalid fiscal code checksum", () => {
            expect(validator.validate("RSSMRA85T10A562A")).toBe(false);
        });

        it("should reject a fiscal code shorter than 16 characters", () => {
            expect(validator.validate("RSSMRA85T10A562")).toBe(false);
        });

        it("should reject a fiscal code longer than 16 characters", () => {
            expect(validator.validate("RSSMRA85T10A562SA")).toBe(false);
        });

        it("should reject a fiscal code containing an invalid month character", () => {
            expect(validator.validate("RSSMRA85Z10A562S")).toBe(false);
        });

        it("should reject a fiscal code containing only digits", () => {
            expect(validator.validate("1234567890123456")).toBe(false);
        });

        it("should reject a fiscal code with an incorrect control character", () => {
            expect(validator.validate("RSSMRA85T10A562A")).toBe(false);
        });

        it("should reject a fiscal code containing special characters", () => {
            expect(validator.validate("RSSMRA85T10A56@")).toBe(false);
        });

        it("should reject an invalid fiscal code format", () => {
            expect(validator.validate("123ABC85T10A562S")).toBe(false);
        });
    });

    describe("validate - Italian Identity Card", () => {
        it("should accept a valid identity card number", () => {
            expect(validator.validate("12345670017")).toBe(true);
        });

        it("should accept identity card number with suffix 120", () => {
            expect(validator.validate("12345671205")).toBe(true);
        });

        it("should accept identity card number with suffix 121", () => {
            expect(validator.validate("12345671213")).toBe(true);
        });

        it("should reject an identity card number containing only zeros", () => {
            expect(validator.validate("00000000000")).toBe(false);
        });

        it("should reject an identity card number with zero suffix", () => {
            expect(validator.validate("12345670009")).toBe(false);
        });

        it("should reject an identity card number with suffix greater than 100 except 120 and 121", () => {
            expect(validator.validate("12345671015")).toBe(false);
        });

        it("should reject an identity card number with invalid suffix 122", () => {
            expect(validator.validate("12345671221")).toBe(false);
        });

        it("should reject an identity card number shorter than 11 digits", () => {
            expect(validator.validate("1234567001")).toBe(false);
        });

        it("should reject an identity card number longer than 11 digits", () => {
            expect(validator.validate("123456700171")).toBe(false);
        });

        it("should reject an identity card number with incorrect checksum", () => {
            expect(validator.validate("12345670018")).toBe(false);
        });

        it("should reject an identity card number starting with seven zeros", () => {
            expect(validator.validate("00000001234")).toBe(false);
        });

        it("should reject an identity card number containing letters", () => {
            expect(validator.validate("1234567ABCD")).toBe(false);
        });
    });

    describe("validate - Invalid inputs", () => {
        it("should reject null", () => {
            expect(validator.validate(null)).toBe(false);
        });

        it("should reject an empty TIN", () => {
            expect(validator.validate("")).toBe(false);
        });

        it("should reject whitespace-only input", () => {
            expect(validator.validate("         ")).toBe(false);
        });

        it("should reject alphabetic input", () => {
            expect(validator.validate("ABCDEFGHIJKLMNO")).toBe(false);
        });

        it("should reject special characters only", () => {
            expect(validator.validate("!@#$%^&*()")).toBe(false);
        });

        it("should reject non-ASCII digits", () => {
            expect(validator.validate("１２３４５６７８９０１")).toBe(false);
        });
    });

    describe("validate - Sanitisation", () => {
        it("should validate a fiscal code after removing spaces", () => {
            expect(validator.validate("RSSMRA 85T10A562S")).toBe(true);
        });

        it("should validate a fiscal code after removing special characters", () => {
            expect(validator.validate("RSSMRA-85T10A562S")).toBe(true);
        });

        it("should validate a fiscal code after removing multiple special characters", () => {
            expect(validator.validate("RSS-MRA-85T10-A562S")).toBe(true);
        });

        it("should validate an identity card after removing spaces", () => {
            expect(validator.validate("12345 670017")).toBe(true);
        });

        it("should validate an identity card after removing special characters", () => {
            expect(validator.validate("12345-670017")).toBe(true);
        });

        it("should reject a sanitised fiscal code with fewer than 16 characters", () => {
            expect(validator.validate("RSSMRA-85T10A56")).toBe(false);
        });

        it("should reject a sanitised identity card with more than 11 digits", () => {
            expect(validator.validate("12345-67001712")).toBe(false);
        });

        it("should validate a fiscal code containing lowercase letters and spaces", () => {
            expect(validator.validate("rssmra 85t10a562s")).toBe(true);
        });

        it("should validate an identity card containing multiple special characters", () => {
            expect(validator.validate("123-456-70017")).toBe(true);
        });
    });
});
