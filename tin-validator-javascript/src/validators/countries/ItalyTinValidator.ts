
import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";

const CODE_REGEX =
    /^[A-Z]{6}[0-9]{2}[ABCDEHLMPRST][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;

const CARD_REGEX = /^[0-9]{11}$/;

const ITALY_INVALID_CHARS = /[^A-Z0-9]/gi;

const NUMBER_MAP: number[][] = [
    [1, 0, 5, 7, 9, 13, 15, 17, 19, 21],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
];

const CHARACTER_MAP: number[][] = [
    [
        1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18,
        20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23,
    ],
    [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    ],
];

export const ItalyTinValidator: TinValidator = {
    isCountrySupported: (countryCode: string): boolean => {
        return ["IT", "ITA", "380"].includes(
            countryCode.toUpperCase()
        );
    },

    validate: (tin: string | null): boolean => {
        if (tin == null) {
            return false;
        }

        tin = sanitise(tin, "IT", ITALY_INVALID_CHARS);

        if (tin == null) {
            return false;
        }

        tin = tin.toUpperCase();

        if (CODE_REGEX.test(tin)) {
            return isValidCode(tin);
        }

        if (CARD_REGEX.test(tin)) {
            return isValidCard(tin);
        }

        return false;
    },
};

function isValidCode(tin: string): boolean {
    let sum = 0;

    for (let i = 0; i < 15; i++) {
        let charCode = tin.charCodeAt(i);

        let map: number[][];

        if (charCode >= 48 && charCode <= 57) {
            map = NUMBER_MAP;
            charCode -= 48;
        } else {
            map = CHARACTER_MAP;
            charCode -= 65;
        }

        sum += map[i % 2][charCode];
    }

    const control = String.fromCharCode((sum % 26) + 65);

    return tin.charAt(15) === control;
}

function isValidCard(tin: string): boolean {
    if (tin.substring(0, 7) === "0000000") {
        return false;
    }

    const suffix = parseInt(tin.substring(7, 10), 10);

    if (
        suffix === 0 ||
        (suffix > 100 && suffix !== 120 && suffix !== 121)
    ) {
        return false;
    }

    let sum = 0;

    for (let i = 0; i < 10; i++) {
        const digit = Number(tin.charAt(i));
        const value = digit * (i % 2 + 1);

        sum += Math.floor(value / 10) + (value % 10);
    }

    const checksum = (10 - (sum % 10)) % 10;

    const control = Number(tin.charAt(10));

    return checksum === control;
}
