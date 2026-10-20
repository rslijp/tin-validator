
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{10}$/;
const WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3, 6];

export const BulgariaTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["BG", "BGR", "100"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        tin = sanitise(tin, "BG");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += parseInt(tin[i], 10) * WEIGHTS[i];
        }

        const checksum = (sum % 11) % 10;
        const controlDigit = parseInt(tin[9], 10);

        return controlDigit === checksum;
    }
};
