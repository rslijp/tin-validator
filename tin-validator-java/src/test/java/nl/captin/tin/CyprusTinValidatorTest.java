package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CyprusTinValidatorTest {

    private final CyprusTinValidator validator =
            (CyprusTinValidator) CyprusTinValidator.INSTANCE;

    @Test
    void shouldAcceptValidCyprusTin() {
        assertTrue(validator.isValid("00000004I", (TinType) null));
    }

    @Test
    void shouldAcceptValidCyprusTinWithNonZeroChecksum() {
        assertTrue(validator.isValid("00000000E", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidChecksum() {
        assertFalse(validator.isValid("00000000B", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidLength() {
        assertFalse(validator.isValid("0000000A", (TinType) null));
        assertFalse(validator.isValid("000000000A", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingLowercaseLetter() {
        assertFalse(validator.isValid("00000000a", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingLetters() {
        assertFalse(validator.isValid("ABCDEFGHA", (TinType) null));
    }

    @Test
    void shouldRejectTinContainingSpecialCharacters() {
        assertFalse(validator.isValid("0000000-A", (TinType) null));
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
    void shouldRejectTinWithWhitespace() {
        assertFalse(validator.isValid(" 00000000A", (TinType) null));
        assertFalse(validator.isValid("00000000A ", (TinType) null));
    }
}