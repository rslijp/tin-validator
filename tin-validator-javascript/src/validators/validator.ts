import {AustriaTinValidator} from "./validators/countries/AustriaTinValidator";

const COUNTRIES = [
    AustriaTinValidator
]

export function validateTin(tin: string, countryCode: string): boolean {
    const countryValidator = COUNTRIES.find(validator => validator.isCountrySupported(countryCode));
    if (!countryValidator) {
        throw new Error(`No validator found for country code: ${countryCode}`);
    }
    return countryValidator.validate(tin);
}