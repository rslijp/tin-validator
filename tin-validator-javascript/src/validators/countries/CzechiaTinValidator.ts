import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{9,10}$/;

export const CzechiaTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["CZ", "CZE", "203"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        tin = sanitise(tin, "CZ");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        const date = tin.substring(0, 6);

        return isValidDate(date);
    },
};

function isValidDate(date: string): boolean {
    const year = Number(date.substring(0, 2));
    const month = Number(date.substring(2, 4));
    const day = Number(date.substring(4, 6));

    // Validate the date without allowing JavaScript to roll over invalid dates.
    const fullYear = 2000 + year;
    const parsedDate = new Date(Date.UTC(fullYear, month - 1, day));

    return (
        parsedDate.getUTCFullYear() === fullYear &&
        parsedDate.getUTCMonth() === month - 1 &&
        parsedDate.getUTCDate() === day
    );
}