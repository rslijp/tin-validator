import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{11}$/;

export const BelgiumTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["BE", "BEL", "056"]).has(countryCode.toUpperCase());
    },

    validate: (tin: string | null): boolean => {
        tin = sanitise(tin, "BE");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        const value1 = parseInt(tin.substring(0, 9), 10);
        const value2 = 2000000000 + value1;
        const control = parseInt(tin.substring(9), 10);

        const checksum1 = 97 - (value1 % 97);
        const checksum2 = 97 - (value2 % 97);

        return checksum1 === control || checksum2 === control;
    }
};
