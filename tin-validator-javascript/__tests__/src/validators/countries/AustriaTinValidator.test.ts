import {AustriaTinValidator} from "../../../src/validators/countries/AustriaTinValidator";

describe('Validators', () => {
  describe('Countries', () => {
    describe('AustriaTinValidator', () => {
      it('should_accept_valid_austria_Tin', () => {

        const valid = AustriaTinValidator.validate("931736581");

        expect(valid).toEqual(true);
      });
    });
  });
});
