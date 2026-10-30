
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GreeceTinValidatorTest {

    private final GreeceTinValidator validator =
            (GreeceTinValidator) GreeceTinValidator.INSTANCE;

    @Test
    void shouldReturnTrueForNineDigitTin() {
        assertTrue(validator.isValid("123456789", (TinType) null));
    }

    @Test
    void shouldReturnTrueForTinStartingWithZero() {
        assertTrue(validator.isValid("012345678", (TinType) null));
    }

    @Test
    void shouldReturnTrueForTinContainingOnlyZeros() {
        assertTrue(validator.isValid("000000000", (TinType) null));
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
    void shouldReturnFalseForTinWithFewerThanNineDigits() {
        assertFalse(validator.isValid("12345678", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinWithMoreThanNineDigits() {
        assertFalse(validator.isValid("1234567890", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinContainingLetters() {
        assertFalse(validator.isValid("12345AB89", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("1234-6789", (TinType) null));
    }

    @Test
    void shouldReturnFalseForTinContainingSpaces() {
        assertFalse(validator.isValid("1234 6789", (TinType) null));
    }

    @Test
    void shouldReturnFalseForNegativeTin() {
        assertFalse(validator.isValid("-12345678", (TinType) null));
    }
}

