package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CanadaTinValidatorTest {

    private final CanadaTinValidator validator =
            (CanadaTinValidator) CanadaTinValidator.INSTANCE;

    @Test
    void shouldAcceptValidCanadaTin() {
        assertTrue(validator.isValid("046454286", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidChecksum() {
        assertFalse(validator.isValid("046454287", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidLength() {
        assertFalse(validator.isValid("12345678", (TinType) null));
        assertFalse(validator.isValid("1234567890", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingLetters() {
        assertFalse(validator.isValid("12345A789", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("12345-789", (TinType) null));
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
        assertFalse(validator.isValid("123456788", (TinType) null));
    }
}