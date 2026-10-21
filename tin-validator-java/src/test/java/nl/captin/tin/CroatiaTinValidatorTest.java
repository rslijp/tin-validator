
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CroatiaTinValidatorTest {

    private final CroatiaTinValidator validator =
            (CroatiaTinValidator) CroatiaTinValidator.INSTANCE;

    @Test
    void shouldAcceptValidCroatiaTin() {
        assertTrue(validator.isValid("12345678903", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidChecksum() {
        assertFalse(validator.isValid("12345678901", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidLength() {
        assertFalse(validator.isValid("1234567890", (TinType) null));
        assertFalse(validator.isValid("123456789034", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingLetters() {
        assertFalse(validator.isValid("1234567890A", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("12345-78903", (TinType) null));
    }

    @Test
    void shouldRejectNullTin() {
        assertFalse(validator.isValid(null, (TinType) null));
    }

    @Test
    void shouldRejectEmptyTin() {
        assertFalse(validator.isValid("", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidChecksumAgain() {
        assertFalse(validator.isValid("12345678902", (TinType) null));
    }
}

