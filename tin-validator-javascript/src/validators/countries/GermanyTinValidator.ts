
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[1-9][0-9]{10}$/;

const GERMANY_INVALID_CHARS = /[^0-9]/g;

export const GermanyTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["DE", "DEU", "276"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        tin = sanitise(tin, "DE", GERMANY_INVALID_CHARS);

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        let sum = 0;

        for (let i = 0; i < 10; i++) {
            const c = Number(tin.charAt(i));
            const tmp = (sum + c) % 10;

            sum = tmp === 0 ? 9 : (2 * tmp) % 11;
        }

        const checksum = (11 - sum) % 10;

        return checksum === Number(tin.charAt(10));
    },
};
