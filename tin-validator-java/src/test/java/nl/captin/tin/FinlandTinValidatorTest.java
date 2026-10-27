
package nl.captin.tin;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FinlandTinValidatorTest {

    private final CountryTinValidator validator =
            FinlandTinValidator.INSTANCE;

    @Test
    void shouldAcceptTinWithValidChecksum() {
        assertTrue(validator.isValid("010190-001P", (TinType) null));
    }

    @Test
    void shouldAcceptTinWithPlusSeparator() {
        assertTrue(validator.isValid("010190+001P", (TinType) null));
    }

    @Test
    void shouldAcceptTinWithASeparator() {
        assertTrue(validator.isValid("010190A001P", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidChecksum() {
        assertFalse(validator.isValid("010190-001Q", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidFormat() {
        assertFalse(validator.isValid("010190/001P", (TinType) null));
    }

    @Test
    void shouldRejectTinWithLessThanElevenCharacters() {
        assertFalse(validator.isValid("010190-001", (TinType) null));
    }

    @Test
    void shouldRejectTinWithMoreThanElevenCharacters() {
        assertFalse(validator.isValid("010190-001PX", (TinType) null));
    }

    @Test
    void shouldRejectTinWithLettersInDate() {
        assertFalse(validator.isValid("ABCDEF-001P", (TinType) null));
    }

    @Test
    void shouldRejectTinWithLettersInIndividualNumber() {
        assertFalse(validator.isValid("010190-00AP", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidDay() {
        assertFalse(validator.isValid("320190-001P", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidMonth() {
        assertFalse(validator.isValid("011390-001P", (TinType) null));
    }

    @Test
    void shouldRejectTinWithInvalidLeapDate() {
        assertFalse(validator.isValid("290299-001P", (TinType) null));
    }

    @Test
    void shouldRejectTinWithMissingSeparator() {
        assertFalse(validator.isValid("010190001P", (TinType) null));
    }

    @Test
    void shouldRejectTinWithDuplicateSeparators() {
        assertFalse(validator.isValid("010190--001P", (TinType) null));
    }

    @Test
    void shouldRejectTinWithSpecialCharacters() {
        assertFalse(validator.isValid("010190-001?", (TinType) null));
    }

    @Test
    void shouldAcceptTinWithLowercaseChecksum() {
        assertTrue(validator.isValid("010190-001p", (TinType) null));
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
