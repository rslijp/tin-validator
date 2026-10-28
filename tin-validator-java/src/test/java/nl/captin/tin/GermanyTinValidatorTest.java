
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GermanyTinValidatorTest {

    private final CountryTinValidator validator =
            GermanyTinValidator.INSTANCE;

    @Test
    void shouldReturnFalseForNullTin() {
        assertFalse(validator.isValid(null, (TinType) null));
    }

    @Test
    void shouldReturnFalseForEmptyTin() {
        assertFalse(validator.isValid("", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinWithOnlyZeros() {
        assertFalse(validator.isValid("00000000000", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinStartingWithZero() {
        assertFalse(validator.isValid("01234567890", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinWithFewerThanElevenDigits() {
        assertFalse(validator.isValid("1234567890", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinWithMoreThanElevenDigits() {
        assertFalse(validator.isValid("123456789012", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinContainingLetters() {
        assertFalse(validator.isValid("12345ABCDEF", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("12345-78901", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinContainingSpaces() {
        assertFalse(validator.isValid("12345 78901", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinWithInvalidChecksum() {
        assertFalse(validator.isValid("12345678901", (TinType) null));
    }

    @Test
    void shouldReturnFalseWhenTinContainsOnlyNonDigits() {
        assertFalse(validator.isValid("abcdefghijk", (TinType) null));
    }

    @Test
    void shouldReturnFalseForNegativeTin() {
        assertFalse(validator.isValid("-1234567890", (TinType) null));
    }

    @Test
    void shouldReturnFalseForDecimalTin() {
        assertFalse(validator.isValid("1234567890.1", (TinType) null));
    }
}
