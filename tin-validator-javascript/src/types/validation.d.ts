export type TinValidator = {
    isCountrySupported: (countryCode: string) => boolean;
    validate: (tin : string | null) => boolean;
};