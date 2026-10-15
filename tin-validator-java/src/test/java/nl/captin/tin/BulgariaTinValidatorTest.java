package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BulgariaTinValidatorTest {

    private final BulgariaTinValidator validator = (BulgariaTinValidator) BulgariaTinValidator.INSTANCE;

    @Test
    void testValidTin() {
        assertTrue(validator.isValid("9001010000", (TinType) null), "Valid TIN should return true");
    }

    @Test
    void testInvalidTinLength() {
        assertFalse(validator.isValid("750101001", (TinType) null), "TIN with incorrect length should return false");
    }

    @Test
    void testInvalidTinCharacters() {
        assertFalse(validator.isValid("75010100AB", (TinType) null), "TIN with non-numeric characters should return false");
    }

    @Test
    void testInvalidChecksum() {
        assertFalse(validator.isValid("7501010019", (TinType) null), "TIN with incorrect checksum should return false");
    }

    @Test
    void testNullTin() {
        assertFalse(validator.isValid(null, (TinType) null), "Null TIN should return false");
    }

    @Test
    void testEmptyTin() {
        assertFalse(validator.isValid("", (TinType) null), "Empty TIN should return false");
    }
}
