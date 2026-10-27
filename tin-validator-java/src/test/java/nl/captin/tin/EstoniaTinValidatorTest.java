package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EstoniaTinValidatorTest {

    private final EstoniaTinValidator validator =
            (EstoniaTinValidator) EstoniaTinValidator.INSTANCE;


    @Test
    void shouldAcceptTinWithValidChecksum() {
        assertTrue(validator.isValid("00000000000", (TinType) null));
    }
    @Test
    void shouldRejectTinWithInvalidChecksum() {
        assertFalse(validator.isValid("00000000001", (TinType) null));
    }

    @Test
    void shouldRejectTinWithLessThanElevenDigits() {
        assertFalse(validator.isValid("1234567890", (TinType) null));
    }

    @Test
    void shouldRejectTinWithMoreThanElevenDigits() {
        assertFalse(validator.isValid("123456789012", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingLetters() {
        assertFalse(validator.isValid("1234567890A", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("123456789-1", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingSpaces() {
        assertFalse(validator.isValid("123 5678901", (TinType) null));
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
    void shouldRejectTinWithInvalidChecksumForElevenDigits() {
        assertFalse(validator.isValid("12345678901", (TinType) null));
    }
}