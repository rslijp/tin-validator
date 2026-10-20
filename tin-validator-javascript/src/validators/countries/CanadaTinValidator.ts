
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{9}$/;

export const CanadaTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["CA", "CAN", "124"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        tin = sanitise(tin, "CA");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        return luhn(tin);
    }
};

function luhn(tin: string): boolean {
    let sum = 0;
    let doubleDigit = false;

    for (let i = tin.length - 1; i >= 0; i--) {
        let digit = parseInt(tin[i], 10);

        if (doubleDigit) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        doubleDigit = !doubleDigit;
    }

    return sum % 10 === 0;
}
