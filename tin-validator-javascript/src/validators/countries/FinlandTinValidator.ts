
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{6}[-+A][0-9]{3}[0-9A-Z]$/;
const CHECKSUM_MAP = "0123456789ABCDEFHJKLMNPRSTUVWXY";
const FINLAND_INVALID_CHARS = /[^0-9A-Za-z+-]/g;

export const FinlandTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["FI", "FIN", "246"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        if (/[a-z]$/.test(tin)) {
            return false;
        }

        tin = sanitise(tin, "FI", FINLAND_INVALID_CHARS);

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        const date = tin.substring(0, 6);
        const separator = tin.charAt(6);
        const individualNumber = tin.substring(7, 10);
        const control = tin.charAt(10);

        if (!isValidDate(date, separator)) {
            return false;
        }

        const checksum = Number(date + individualNumber) % 31;

        return CHECKSUM_MAP.charAt(checksum) === control;
    },
};

function isValidDate(date: string, separator: string): boolean {
    const day = Number(date.substring(0, 2));
    const month = Number(date.substring(2, 4));
    const year = Number(date.substring(4, 6));

    let fullYear: number;

    switch (separator) {
        case "+":
            fullYear = 1800 + year;
            break;
        case "-":
            fullYear = 1900 + year;
            break;
        case "A":
            fullYear = 2000 + year;
            break;
        default:
            return false;
    }

    if (month < 1 || month > 12 || day < 1) {
        return false;
    }

    const parsedDate = new Date(Date.UTC(fullYear, month - 1, day));

    return (
        parsedDate.getUTCFullYear() === fullYear &&
        parsedDate.getUTCMonth() === month - 1 &&
        parsedDate.getUTCDate() === day
    );
}
