package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BelgiumTinValidatorTest {

    private final BelgiumTinValidator validator =
            (BelgiumTinValidator) BelgiumTinValidator.INSTANCE;

    @Test
    void shouldAcceptValidBelgiumTin() {
        assertTrue(validator.isValid("00000000097", TinType.ANY));
    }

    @Test
    void shouldRejectTinWithInvalidChecksum() {
        assertFalse(validator.isValid("00000000012", TinType.ANY));
    }

    @Test
    void shouldRejectNullTin() {
        assertFalse(validator.isValid(null, TinType.ANY));
    }

    @Test
    void shouldRejectEmptyTin() {
        assertFalse(validator.isValid("", TinType.ANY));
    }

    @Test
    void shouldRejectTinWithIncorrectLength() {
        assertFalse(validator.isValid("1234567890", TinType.ANY));
        assertFalse(validator.isValid("123456789012", TinType.ANY));
    }

    @Test
    void shouldRejectTinContainingLetters() {
        assertFalse(validator.isValid("12345678ABC", TinType.ANY));
    }

    @Test
    void shouldRejectTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("12345-78901", TinType.ANY));
    }

    @Test
    void shouldRejectTinWithInvalidChecksumForNonZeroValue() {
        assertFalse(validator.isValid("12345678900", TinType.ANY));
    }
}

