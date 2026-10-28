
import { GermanyTinValidator } from "../../../../src/validators/countries/GermanyTinValidator";

describe("GermanyTinValidator", () => {
    const validator = GermanyTinValidator;

    function createTin(value: string): string {
        let sum = 0;

        for (let i = 0; i < 10; i++) {
            const digit = Number(value.charAt(i));
            const tmp = (sum + digit) % 10;
            sum = tmp === 0 ? 9 : (2 * tmp) % 11;
        }

        const checksum = (11 - sum) % 10;
        return `${value}${checksum}`;
    }

    describe("isCountrySupported", () => {
        it("should support DE country code", () => {
            expect(validator.isCountrySupported("DE")).toBe(true);
        });

        it("should support DEU country code", () => {
            expect(validator.isCountrySupported("DEU")).toBe(true);
        });

        it("should support numeric country code 276", () => {
            expect(validator.isCountrySupported("276")).toBe(true);
        });

        it("should support lowercase country codes", () => {
            expect(validator.isCountrySupported("de")).toBe(true);
            expect(validator.isCountrySupported("deu")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(validator.isCountrySupported("FR")).toBe(false);
            expect(validator.isCountrySupported("US")).toBe(false);
            expect(validator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate", () => {
        it("should accept a TIN with a valid checksum", () => {
            expect(validator.validate(createTin("1234567890"))).toBe(true);
        });

        it("should accept a TIN starting with 1", () => {
            expect(validator.validate(createTin("1234567890"))).toBe(true);
        });

        it("should accept a TIN starting with 9", () => {
            expect(validator.validate(createTin("9234567890"))).toBe(true);
        });

        it("should reject a TIN with an invalid checksum", () => {
            const tin = createTin("1234567890");
            const invalidChecksum =
                tin.slice(0, -1) + (tin.endsWith("0") ? "1" : "0");

            expect(validator.validate(invalidChecksum)).toBe(false);
        });

        it("should reject a TIN starting with zero", () => {
            expect(validator.validate("01234567890")).toBe(false);
        });

        it("should reject a TIN shorter than 11 digits", () => {
            expect(validator.validate("1234567890")).toBe(false);
        });

        it("should reject a TIN longer than 11 digits", () => {
            expect(validator.validate("123456789012")).toBe(false);
        });

        it("should reject letters in the TIN", () => {
            expect(validator.validate("ABCDEFGHIJK")).toBe(false);
        });

        it("should reject alphanumeric characters", () => {
            expect(validator.validate("1234567890A")).toBe(false);
        });

        it("should reject null", () => {
            expect(validator.validate(null)).toBe(false);
        });

        it("should reject an empty TIN", () => {
            expect(validator.validate("")).toBe(false);
        });

        it("should reject a TIN containing only zeros", () => {
            expect(validator.validate("00000000000")).toBe(false);
        });

        it("should reject a negative TIN", () => {
            expect(validator.validate("-1234567890")).toBe(false);
        });

        it("should reject a decimal TIN", () => {
            expect(validator.validate("1234567890.1")).toBe(false);
        });

        it("should validate a TIN after sanitising special characters", () => {
            const tin = createTin("1234567890");
            const formattedTin = `${tin.slice(0, 5)}-${tin.slice(5)}`;

            expect(validator.validate(formattedTin)).toBe(true);
        });

        it("should validate a TIN after sanitising spaces", () => {
            const tin = createTin("1234567890");
            const formattedTin = `${tin.slice(0, 5)} ${tin.slice(5)}`;

            expect(validator.validate(formattedTin)).toBe(true);
        });
    });
});
