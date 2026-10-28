import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{13}$/;

const FRANCE_INVALID_CHARS = /[^0-9]/g;

export const FranceTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["FR", "FRA", "250"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        tin = sanitise(tin, "FR", FRANCE_INVALID_CHARS);

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        const value = Number.parseInt(tin.substring(0, 10), 10);
        const control = Number.parseInt(tin.substring(10), 10);

        const checksum = value % 511;

        return checksum === control;
    },
};