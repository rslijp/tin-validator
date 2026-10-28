
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FranceTinValidatorTest {

    private final CountryTinValidator validator =
            FranceTinValidator.INSTANCE;

    @Test
    void shouldAcceptValidFranceTin() {
        assertTrue(validator.isValid("0000000001001", TinType.ANY));
    }

    @Test
    void shouldAcceptTinWithZeroChecksum() {
        assertTrue(validator.isValid("0000000000000", TinType.ANY));
    }

    @Test
    void shouldAcceptTinWithLeadingZeros() {
        assertTrue(validator.isValid("0000000002002", TinType.ANY));
    }

    @Test
    void shouldRejectTinWithInvalidChecksum() {
        assertFalse(validator.isValid("0000000001002", TinType.ANY));
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
        assertFalse(validator.isValid("000000000001", TinType.ANY));
        assertFalse(validator.isValid("00000000010010", TinType.ANY));
    }

    @Test
    void shouldRejectTinContainingLetters() {
        assertFalse(validator.isValid("ABCDEFGHIJKLM", TinType.ANY));
    }

    @Test
    void shouldRejectTinContainingAlphanumericCharacters() {
        assertFalse(validator.isValid("0000000001ABC", TinType.ANY));
    }

    @Test
    void shouldAcceptTinAfterSanitisingSpecialCharacters() {
        assertTrue(validator.isValid("0000000001-001", TinType.ANY));
    }

    @Test
    void shouldAcceptTinAfterSanitisingSpaces() {
        assertTrue(validator.isValid("000000000 1001", TinType.ANY));
    }

    @Test
    void shouldRejectTinWithInvalidChecksumForNonZeroValue() {
        assertFalse(validator.isValid("1234567890000", TinType.ANY));
    }
}
