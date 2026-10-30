
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{9}$/;

const GREECE_INVALID_CHARS = /[^0-9]/g;

export const GreeceTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["GR", "GRC", "300"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        tin = sanitise(tin, "GR", GREECE_INVALID_CHARS);

        return tin !== null && TIN_REGEX.test(tin);
    },
};
