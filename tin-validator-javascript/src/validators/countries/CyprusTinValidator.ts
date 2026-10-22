import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{8}[A-Z]$/;

const MAP: number[][] = [
    [1, 0, 5, 7, 9, 13, 15, 17, 19, 21],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
];

export const CyprusTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["CY", "CYP", "196"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        tin = sanitise(tin, "CY");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        return validateChecksum(tin);
    },
};

function validateChecksum(tin: string): boolean {
    let sum = 0;

    for (let i = 0; i < 8; i++) {
        const digit = tin.charCodeAt(i) - 48;
        sum += MAP[i % 2][digit];
    }

    const checksum = sum % 26;
    const control = tin.charCodeAt(8) - "A".charCodeAt(0);

    return checksum === control;
}