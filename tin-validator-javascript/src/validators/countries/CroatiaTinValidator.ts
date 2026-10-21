
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{11}$/;

export const CroatiaTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["HR", "HRV", "191"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        tin = sanitise(tin, "HR");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        return validateChecksum(tin);
    }
};

function validateChecksum(tin: string): boolean {
    let sum = 10;

    for (let i = 0; i < 10; i++) {
        const c = tin.charCodeAt(i) - 48;
        let subtotal = (sum + c) % 10;
        subtotal = subtotal === 0 ? 10 : subtotal;
        sum = (2 * subtotal) % 11;
    }

    const checksum = sum === 1 ? 0 : 11 - sum;
    const control = tin.charCodeAt(10) - 48;

    return control === checksum;
}
