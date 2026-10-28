
import { FranceTinValidator } from "../../../../src/validators/countries/FranceTinValidator";

describe("FranceTinValidator", () => {
    const validator = FranceTinValidator;

    function createTin(value: string): string {
        const checksum = Number(value) % 511;
        return `${value}${checksum.toString().padStart(3, "0")}`;
    }

    describe("isCountrySupported", () => {
        it("should support FR country code", () => {
            expect(validator.isCountrySupported("FR")).toBe(true);
        });

        it("should support FRA country code", () => {
            expect(validator.isCountrySupported("FRA")).toBe(true);
        });

        it("should support numeric country code 250", () => {
            expect(validator.isCountrySupported("250")).toBe(true);
        });

        it("should support lowercase country codes", () => {
            expect(validator.isCountrySupported("fr")).toBe(true);
            expect(validator.isCountrySupported("fra")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(validator.isCountrySupported("DE")).toBe(false);
            expect(validator.isCountrySupported("US")).toBe(false);
            expect(validator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate", () => {
        it("should accept a TIN with a valid checksum", () => {
            expect(validator.validate(createTin("0000000001"))).toBe(true);
        });

        it("should accept a TIN with zero checksum", () => {
            expect(validator.validate(createTin("0000000000"))).toBe(true);
        });

        it("should accept a TIN with leading zeros", () => {
            expect(validator.validate(createTin("0000000002"))).toBe(true);
        });

        it("should reject a TIN with an invalid checksum", () => {
            const tin = createTin("0000000001");
            const invalidChecksum =
                tin.slice(0, -1) + (tin.endsWith("0") ? "1" : "0");

            expect(validator.validate(invalidChecksum)).toBe(false);
        });

        it("should reject a TIN shorter than 13 digits", () => {
            expect(validator.validate("000000000001")).toBe(false);
        });

        it("should reject a TIN longer than 13 digits", () => {
            expect(validator.validate("00000000010010")).toBe(false);
        });

        it("should reject letters in the TIN", () => {
            expect(validator.validate("ABCDEFGHIJKLM")).toBe(false);
        });

        it("should reject alphanumeric characters", () => {
            expect(validator.validate("0000000001ABC")).toBe(false);
        });

        it("should reject a TIN with an invalid non-zero checksum", () => {
            expect(validator.validate("1234567890000")).toBe(false);
        });

        it("should reject null", () => {
            expect(validator.validate(null)).toBe(false);
        });

        it("should reject an empty TIN", () => {
            expect(validator.validate("")).toBe(false);
        });

        it("should validate a TIN after sanitising special characters", () => {
            expect(validator.validate("0000000001-001")).toBe(true);
        });

        it("should validate a TIN after sanitising spaces", () => {
            expect(validator.validate("000000000 1001")).toBe(true);
        });
    });
});
