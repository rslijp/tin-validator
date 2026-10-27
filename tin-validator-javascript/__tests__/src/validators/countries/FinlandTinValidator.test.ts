
import { FinlandTinValidator } from "../../../../src/validators/countries/FinlandTinValidator";

describe("FinlandTinValidator", () => {
    const validator = FinlandTinValidator;
    const checksumMap = "0123456789ABCDEFHJKLMNPRSTUVWXY";

    function createTin(
        date: string,
        separator: string,
        individualNumber: string
    ): string {
        const checksum = Number(date + individualNumber) % 31;

        return `${date}${separator}${individualNumber}${checksumMap[checksum]}`;
    }

    describe("isCountrySupported", () => {
        it("should support FI country code", () => {
            expect(validator.isCountrySupported("FI")).toBe(true);
        });

        it("should support FIN country code", () => {
            expect(validator.isCountrySupported("FIN")).toBe(true);
        });

        it("should support numeric country code 246", () => {
            expect(validator.isCountrySupported("246")).toBe(true);
        });

        it("should support lowercase country codes", () => {
            expect(validator.isCountrySupported("fi")).toBe(true);
            expect(validator.isCountrySupported("fin")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(validator.isCountrySupported("EE")).toBe(false);
            expect(validator.isCountrySupported("US")).toBe(false);
            expect(validator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate", () => {
        it("should accept a TIN with a valid checksum and '-' separator", () => {
            expect(validator.validate(createTin("010190", "-", "001"))).toBe(true);
        });

        it("should accept a TIN with '+' separator", () => {
            expect(validator.validate(createTin("010180", "+", "001"))).toBe(true);
        });

        it("should accept a TIN with 'A' separator", () => {
            expect(validator.validate(createTin("010100", "A", "001"))).toBe(true);
        });

        it("should reject a TIN with an invalid checksum", () => {
            const tin = createTin("010190", "-", "001");
            const invalidChecksum =
                tin.slice(0, -1) + (tin.endsWith("0") ? "1" : "0");

            expect(validator.validate(invalidChecksum)).toBe(false);
        });

        it("should reject a TIN shorter than 11 characters", () => {
            expect(validator.validate("010190-001")).toBe(false);
        });

        it("should reject a TIN longer than 11 characters", () => {
            expect(validator.validate("010190-001PX")).toBe(false);
        });

        it("should reject letters in the date", () => {
            expect(validator.validate("ABCDEF-001P")).toBe(false);
        });

        it("should reject letters in the individual number", () => {
            expect(validator.validate("010190-00AP")).toBe(false);
        });

        it("should reject an invalid separator", () => {
            expect(validator.validate("010190/001P")).toBe(false);
        });

        it("should reject spaces in the TIN", () => {
            expect(validator.validate("010 90-001P")).toBe(false);
        });

        it("should reject an invalid day", () => {
            expect(validator.validate("320190-001P")).toBe(false);
        });

        it("should reject an invalid month", () => {
            expect(validator.validate("011390-001P")).toBe(false);
        });

        it("should reject February 29 in a non-leap year", () => {
            expect(validator.validate("290299-001P")).toBe(false);
        });

        it("should reject February 30", () => {
            expect(validator.validate("300200-001P")).toBe(false);
        });

        it("should reject a missing separator", () => {
            expect(validator.validate("010190001P")).toBe(false);
        });

        it("should reject duplicate separators", () => {
            expect(validator.validate("010190--001P")).toBe(false);
        });

        it("should reject special characters", () => {
            expect(validator.validate("010190-001?")).toBe(false);
        });

        it("should reject a lowercase checksum character", () => {
            const tin = createTin("010190", "-", "001");
            const lowercaseTin = tin.slice(0, -1) + tin.slice(-1).toLowerCase();

            expect(validator.validate(lowercaseTin)).toBe(false);
        });

        it("should reject null", () => {
            expect(validator.validate(null)).toBe(false);
        });

        it("should reject an empty TIN", () => {
            expect(validator.validate("")).toBe(false);
        });
    });
});
