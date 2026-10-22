import { CyprusTinValidator } from "../../../../src/validators/countries/CyprusTinValidator";

describe("CyprusTinValidator", () => {
    describe("isCountrySupported", () => {
        it("should support CY country code", () => {
            expect(CyprusTinValidator.isCountrySupported("CY")).toBe(true);
        });

        it("should support CYP country code", () => {
            expect(CyprusTinValidator.isCountrySupported("CYP")).toBe(true);
        });

        it("should support numeric country code 196", () => {
            expect(CyprusTinValidator.isCountrySupported("196")).toBe(true);
        });

        it("should support lowercase country codes", () => {
            expect(CyprusTinValidator.isCountrySupported("cy")).toBe(true);
            expect(CyprusTinValidator.isCountrySupported("cyp")).toBe(true);
        });

        it("should reject unsupported country codes", () => {
            expect(CyprusTinValidator.isCountrySupported("HR")).toBe(false);
            expect(CyprusTinValidator.isCountrySupported("US")).toBe(false);
            expect(CyprusTinValidator.isCountrySupported("")).toBe(false);
        });
    });

    describe("validate", () => {
        it("should accept a valid Cyprus TIN", () => {
            expect(CyprusTinValidator.validate("00000004I")).toBe(true);
        });

        it("should accept a valid TIN with a non-zero first digit", () => {
            expect(CyprusTinValidator.validate("10000000D")).toBe(true);
        });

        it("should reject a TIN with an invalid checksum", () => {
            expect(CyprusTinValidator.validate("00000004A")).toBe(false);
        });

        it("should reject a TIN with too few characters", () => {
            expect(CyprusTinValidator.validate("0000000A")).toBe(false);
        });

        it("should reject a TIN with too many characters", () => {
            expect(CyprusTinValidator.validate("000000000A")).toBe(false);
        });

        it("should reject lowercase control letters", () => {
            expect(CyprusTinValidator.validate("00000004A")).toBe(false);
        });

        it("should reject letters in the numeric portion", () => {
            expect(CyprusTinValidator.validate("ABCDEFGHA")).toBe(false);
        });

        it("should reject special characters", () => {
            expect(CyprusTinValidator.validate("0000000-A")).toBe(false);
        });

        it("should reject an empty string", () => {
            expect(CyprusTinValidator.validate("")).toBe(false);
        });

        it("should reject null", () => {
            expect(CyprusTinValidator.validate(null)).toBe(false);
        });
    });
});
