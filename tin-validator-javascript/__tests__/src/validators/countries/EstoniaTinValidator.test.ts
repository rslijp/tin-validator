import { EstoniaTinValidator } from "../../../../src/validators/countries/EstoniaTinValidator";

describe("EstoniaTinValidator", () => {
    const validator = EstoniaTinValidator;

    describe("isCountrySupported", () => {
        it("should support EE country code", () => {
            expect(validator.isCountrySupported("EE")).toBe(true);
        });

        it("should support EST country code", () => {
            expect(validator.isCountrySupported("EST")).toBe(true);
        });

        it("should support numeric country code 233", () => {
            expect(validator.isCountrySupported("233")).toBe(true);
        });

        it("should support lowercase country codes", () => {
            expect(validator.isCountrySupported("ee")).toBe(true);
            expect(validator.isCountrySupported("est")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(validator.isCountrySupported("CZ")).toBe(false);
            expect(validator.isCountrySupported("US")).toBe(false);
        });
    });

    describe("validate", () => {
        it("should accept a TIN with a valid checksum", () => {
            expect(validator.validate("00000000000")).toBe(true);
        });

        it("should reject a TIN with an invalid checksum", () => {
            expect(validator.validate("00000000001")).toBe(false);
        });

        it("should reject a TIN with fewer than 11 digits", () => {
            expect(validator.validate("1234567890")).toBe(false);
        });

        it("should reject a TIN with more than 11 digits", () => {
            expect(validator.validate("123456789012")).toBe(false);
        });

        it("should reject a TIN containing letters", () => {
            expect(validator.validate("1234567890A")).toBe(false);
        });

        it("should reject a TIN containing special characters", () => {
            expect(validator.validate("123456789-1")).toBe(false);
        });

        it("should reject a TIN containing spaces", () => {
            expect(validator.validate("123 5678901")).toBe(false);
        });

        it("should reject a null TIN", () => {
            expect(validator.validate(null)).toBe(false);
        });

        it("should reject an empty TIN", () => {
            expect(validator.validate("")).toBe(false);
        });
    });
});