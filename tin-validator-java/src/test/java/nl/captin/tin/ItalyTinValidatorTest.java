
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ItalyTinValidatorTest {

    private final CountryTinValidator validator = ItalyTinValidator.INSTANCE;

    @Test
    void shouldReturnTrueForValidPersonalFiscalCode() {
        assertTrue(validator.isValid("RSSMRA85M01H501Q", (TinType) null));
    }

    @Test
    void shouldReturnFalseForInvalidPersonalFiscalCodeChecksum() {
        assertFalse(validator.isValid("RSSMRA85M01H501A", (TinType) null));
    }

    @Test
    void shouldReturnFalseForPersonalFiscalCodeWithInvalidLength() {
        assertFalse(validator.isValid("RSSMRA85M01H501", (TinType) null));
    }

    @Test
    void shouldReturnTrueForPersonalFiscalCodeWithLowercaseLettersAfterSanitising() {
        assertTrue(validator.isValid("rssmra85m01h501q", (TinType) null));
    }

    @Test
    void shouldReturnTrueForPersonalFiscalCodeAfterSanitisingSpecialCharacters() {
        assertTrue(validator.isValid("RSSMRA-85M01H501Q", (TinType) null));
    }

    @Test
    void shouldReturnTrueForPersonalFiscalCodeAfterSanitisingSpaces() {
        assertTrue(validator.isValid("RSSMRA 85M01H501Q", (TinType) null));
    }

    @Test
    void shouldReturnFalseForPersonalFiscalCodeWithInvalidMonthCharacter() {
        assertFalse(validator.isValid("RSSMRA85I01H501Q", (TinType) null));
    }

    @Test
    void shouldReturnFalseForPersonalFiscalCodeWithInvalidCharacters() {
        assertFalse(validator.isValid("RSSMRA85M01H5011", (TinType) null));
    }

    @Test
    void shouldReturnFalseForNullTin() {
        assertFalse(validator.isValid(null, (TinType) null));
    }

    @Test
    void shouldReturnFalseForEmptyTin() {
        assertFalse(validator.isValid("", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinWithOnlyLetters() {
        assertFalse(validator.isValid("ABCDEFGHIJKLMNOP", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinWithOnlyDigitsAndInvalidLength() {
        assertFalse(validator.isValid("123456789", (TinType) null));
    }

    @Test
    void shouldReturnTrueForPersonalCodeWhenAcceptedTypeIsCompany() {
        assertTrue(validator.isValid("RSSMRA85M01H501Q", TinType.COMPANY));
    }

    @Test
    void shouldReturnFalseForPersonalCodeWhenAcceptedTypeIsPersonal() {
        assertFalse(validator.isValid("RSSMRA85M01H501Q", TinType.PERSONAL));
    }

    @Test
    void shouldReturnTrueForValidCardNumber() {
        assertTrue(validator.isValid("12345670017", (TinType) null));
    }

    @Test
    void shouldReturnFalseForCardNumberWithInvalidChecksum() {
        assertFalse(validator.isValid("12345670018", (TinType) null));
    }

    @Test
    void shouldReturnFalseForCardNumberWithInvalidLength() {
        assertFalse(validator.isValid("1234567890", (TinType) null));
    }

    @Test
    void shouldReturnFalseForCardNumberWithAllLeadingZeros() {
        assertFalse(validator.isValid("00000000000", (TinType) null));
    }

    @Test
    void shouldReturnFalseForCardNumberWithZeroSuffix() {
        assertFalse(validator.isValid("12345670000", (TinType) null));
    }

    @Test
    void shouldReturnFalseForCardNumberWithInvalidSuffix() {
        assertFalse(validator.isValid("12345671013", (TinType) null));
    }

    @Test
    void shouldReturnTrueForCardNumberWhenAcceptedTypeIsPersonal() {
        assertTrue(validator.isValid("12345670017", TinType.PERSONAL));
    }

    @Test
    void shouldReturnFalseForCardNumberWhenAcceptedTypeIsCompany() {
        assertFalse(validator.isValid("12345670017", TinType.COMPANY));
    }

    @Test
    void shouldReturnFalseForCardNumberContainingLetters() {
        assertFalse(validator.isValid("1234567890A", (TinType) null));
    }

    @Test
    void shouldReturnTrueForCardNumberAfterSanitisingSpecialCharacters() {
        assertTrue(validator.isValid("12345-670017", (TinType) null));
    }

    @Test
    void shouldReturnTrueForCardNumberAfterSanitisingSpaces() {
        assertTrue(validator.isValid("12345 670017", (TinType) null));
    }

    @Test
    void shouldReturnTrueForNegativeCardNumberAfterSanitising() {
        assertTrue(validator.isValid("-12345670017", (TinType) null));
    }

    @Test
    void shouldReturnTrueForDecimalCardNumberAfterSanitising() {
        assertTrue(validator.isValid("123456700.17", (TinType) null));
    }
}
