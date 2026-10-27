import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const TIN_REGEX = /^[0-9]{11}$/;

const WEIGHTS_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
const WEIGHTS_2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

export const EstoniaTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["EE", "EST", "233"]).has(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        tin = sanitise(tin, "EE");

        if (tin == null || !TIN_REGEX.test(tin)) {
            return false;
        }

        let check = checksum(tin, WEIGHTS_1);

        if (check === 10) {
            check = checksum(tin, WEIGHTS_2);

            if (check === 10) {
                check = 0;
            }
        }

        const control = Number(tin.charAt(10));

        return control === check;
    },
};

function checksum(tin: string, weights: number[]): number {
    let sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += Number(tin.charAt(i)) * weights[i];
    }

    return sum % 11;
}