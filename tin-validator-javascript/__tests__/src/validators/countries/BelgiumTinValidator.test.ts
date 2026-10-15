import { BelgiumTinValidator } from "../../../../src/validators/countries/BelgiumTinValidator";

describe('Validators', () => {
    describe('Countries', () => {
        describe('BelgiumTinValidator', () => {
            it('should_accept_valid_belgium_tin', () => {
                expect(BelgiumTinValidator.validate("00000000097")).toBe(true);
            });

            it('should_reject_tin_with_invalid_checksum', () => {
                expect(BelgiumTinValidator.validate("00000000012")).toBe(false);
            });

            it('should_reject_null_tin', () => {
                expect(BelgiumTinValidator.validate(null)).toBe(false);
            });

            it('should_reject_empty_tin', () => {
                expect(BelgiumTinValidator.validate("")).toBe(false);
            });

            it('should_reject_tin_with_incorrect_length', () => {
                expect(BelgiumTinValidator.validate("1234567890")).toBe(false);
                expect(BelgiumTinValidator.validate("123456789012")).toBe(false);
            });

            it('should_reject_tin_containing_letters', () => {
                expect(BelgiumTinValidator.validate("12345678ABC")).toBe(false);
            });

            it('should_reject_tin_containing_special_characters', () => {
                expect(BelgiumTinValidator.validate("12345-78901")).toBe(false);
            });

            it('should_reject_tin_with_invalid_checksum_for_non_zero_value', () => {
                expect(BelgiumTinValidator.validate("12345678900")).toBe(false);
            });
        });
    });
});
