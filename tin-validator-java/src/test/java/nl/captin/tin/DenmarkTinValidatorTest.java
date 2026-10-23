package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DenmarkTinValidatorTest {

    private final DenmarkTinValidator validator =
            (DenmarkTinValidator) DenmarkTinValidator.INSTANCE;

    @Test
    void shouldAcceptValidDenmarkTin() {
        assertTrue(validator.isValid("0101010007", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidLength() {
        assertFalse(validator.isValid("010101000", (TinType) null));
        assertFalse(validator.isValid("01010100000", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingLetters() {
        assertFalse(validator.isValid("01010A0000", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("010101-000", (TinType) null));
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
    void shouldRejectTinWithInvalidDate() {
        assertFalse(validator.isValid("3201990000", (TinType) null));
        assertFalse(validator.isValid("0113990000", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidChecksum() {
        assertFalse(validator.isValid("0101010001", (TinType) null));
    }

    @Test
    void shouldRejectTinWhenChecksumIsOne() {
        assertFalse(validator.isValid("0101010009", (TinType) null));
    }

    @Test
    void shouldRejectTinWithWhitespace() {
        assertFalse(validator.isValid(" 0101010000", (TinType) null));
        assertFalse(validator.isValid("0101010000 ", (TinType) null));
    }

    @Test
    void shouldRejectInvalidDateWithZeroValues() {
        assertFalse(validator.isValid("0000000000", (TinType) null));
    }
}


