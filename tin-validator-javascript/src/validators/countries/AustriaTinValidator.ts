import { TinValidator } from "../../types/validation";
import { sanitise } from "../validator-util";


const TIN_REGEX = /^[0-9]{9}$/;

export const AustriaTinValidator : TinValidator = {

    isCountrySupported: (countryCode: string): boolean => {
        return new Set<string>(["AT", "AUT", "040"]).has(countryCode.toUpperCase());
    },

    validate: (tin : string | null): boolean => {
       tin = sanitise(tin, "AT");

        if (tin == null || !TIN_REGEX.test(tin)) {

             return false;
           }

           let sum = 0;
           for (let i = 0; i < 8; i++) {
           let tmp: number = (parseInt(tin[i], 10) * (1 + i % 2));

           sum += Math.floor(tmp / 10) + (tmp % 10);
           }

           let checksum = (100 - sum) % 10;
           return tin[8] === checksum.toString();

         }

};