import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{10}$/;

const WEIGHTS = [4, 3, 2, 7, 6, 5, 4, 3, 2];

export const DenmarkTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["DK", "DNK", "208"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        tin = sanitise(tin, "DK");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += (tin.charCodeAt(i) - 48) * WEIGHTS[i];
        }

        let checksum = sum % 11;

        if (checksum === 1) {
            return false;
        }

        checksum = checksum === 0 ? 0 : 11 - checksum;

        const control = tin.charCodeAt(9) - 48;

        if (checksum !== control) {
            return false;
        }

        if (!isValidDate(tin.substring(0, 6))) {
            return false;
        }

        const year = Number(tin.substring(4, 6));

        if (year >= 37 && year <= 57) {
            const serial = Number(tin.substring(6));

            return serial <= 5000 || serial >= 8999;
        }

        return true;
    },
};

function isValidDate(date: string): boolean {
    const day = Number(date.substring(0, 2));
    const month = Number(date.substring(2, 4));
    const year = Number(date.substring(4, 6));

    // Equivalent to Java's reduced two-digit year parsing.
    const fullYear = 2000 + year;

    const parsedDate = new Date(
        Date.UTC(fullYear, month - 1, day)
    );

    return (
        parsedDate.getUTCFullYear() === fullYear &&
        parsedDate.getUTCMonth() === month - 1 &&
        parsedDate.getUTCDate() === day
    );
}
