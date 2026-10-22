package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CzechiaTinValidatorTest {

    private final CzechiaTinValidator validator =
            (CzechiaTinValidator) CzechiaTinValidator.INSTANCE;

    @Test
    void shouldAcceptValidNineDigitTin() {
        assertTrue(validator.isValid("900101123", (TinType) null));
    }

    @Test
    void shouldAcceptValidTenDigitTin() {
        assertTrue(validator.isValid("9001011234", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidLength() {
        assertFalse(validator.isValid("90010112", (TinType) null));
        assertFalse(validator.isValid("90010112345", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidDate() {
        assertFalse(validator.isValid("900132123", (TinType) null));
        assertFalse(validator.isValid("901301123", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingLetters() {
        assertFalse(validator.isValid("90010A123", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("900101-23", (TinType) null));
    }

    @Test
    void shouldRejectNullTin() {
        assertFalse(validator.isValid(null, (TinType) null));
    }

    @Test
    void shouldRejectEmptyTin() {
        assertFalse(validator.isValid("", (TinType) null));
    }
}