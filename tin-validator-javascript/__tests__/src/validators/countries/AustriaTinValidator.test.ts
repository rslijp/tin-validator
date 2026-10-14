import { AustriaTinValidator } from "../../../../src/validators/countries/AustriaTinValidator";

describe('Validators', () => {
  describe('Countries', () => {
    describe('AustriaTinValidator', () => {
      it('should_accept_valid_austria_Tin', () => {
        const valid = AustriaTinValidator.validate("931736581");
        expect(valid).toEqual(true);
      });

      it('should_accept_valid_austria_Tin_with_country_prefix', () => {
        expect(AustriaTinValidator.validate("931736581")).toEqual(true);
        expect(AustriaTinValidator.validate("AT931736581")).toEqual(true);
        expect(AustriaTinValidator.validate("AT-931736581")).toEqual(true);
      });

      it('should_accept_valid_tin_for_any_type', () => {
        expect(AustriaTinValidator.validate("931736581")).toEqual(true);
      });

      it('should_reject_invalid_checksum', () => {
        expect(AustriaTinValidator.validate("931736580")).toEqual(false);
      });

      it('should_reject_null_and_empty_tin', () => {
        expect(AustriaTinValidator.validate(null)).toEqual(false);
        expect(AustriaTinValidator.validate("")).toEqual(false);
      });

      it('should_reject_tin_with_invalid_length', () => {
        expect(AustriaTinValidator.validate("93173658")).toEqual(false);
        expect(AustriaTinValidator.validate("9317365810")).toEqual(false);
      });

      it('should_reject_tin_with_letters', () => {
        expect(AustriaTinValidator.validate("93173658A")).toEqual(false);
      });
    });
  });
});
