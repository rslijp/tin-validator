package nl.captin.tin;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class AustriaTinValidatorTest {

  private final CountryTinValidator validator = AustriaTinValidator.INSTANCE;

  @Test
  void shouldAcceptValidAustriaTin() {
    assertTrue(validator.isValid("931736581"));
  }

  @Test
  void shouldAcceptValidAustriaTinWithCountryPrefix() {
    assertTrue(validator.isValid("AT", "931736581"));
    assertTrue(validator.isValid("AT", "AT931736581"));
    assertTrue(validator.isValid("AT", "AT-931736581"));
  }

  @Test
  void shouldAcceptValidTinForAnyType() {
    assertTrue(validator.isValid("931736581", TinType.ANY));
    assertTrue(validator.isValid("931736581", TinType.PERSONAL));
    assertTrue(validator.isValid("931736581", TinType.COMPANY));
  }

  @Test
  void shouldRejectInvalidChecksum() {
    assertFalse(validator.isValid("931736580"));
  }

  @Test
  void shouldRejectNullAndEmptyTin() {
    assertFalse(validator.isValid((String) null));
    assertFalse(validator.isValid(""));
  }

  @Test
  void shouldRejectTinWithInvalidLength() {
    assertFalse(validator.isValid("93173658"));
    assertFalse(validator.isValid("9317365810"));
  }

  @Test
  void shouldRejectTinWithLetters() {
    assertFalse(validator.isValid("93173658A"));
  }

  @Test
  void shouldRejectUnsupportedCountry() {
    assertFalse(validator.isValid("DE", "931736581"));
    assertFalse(validator.isValid((String) null, "931736581"));
  }

  @Test
  void shouldExposeAustriaCountryCodes() {
    assertTrue(validator.isCountrySupported("AT"));
    assertTrue(validator.isCountrySupported("AUT"));
    assertTrue(validator.isCountrySupported("040"));
    assertFalse(validator.isCountrySupported("DE"));
  }
}
