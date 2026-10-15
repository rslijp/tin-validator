 const INVALID_CHARS = /[^0-9A-Za-z]+/;

export function sanitise(tin: string | null, countryCode: string, invalidChars: RegExp = INVALID_CHARS): string | null {
    let sanitised = tin == null ? null : tin.replace(invalidChars, "").toUpperCase();
    if (sanitised != null && countryCode != null && sanitised.startsWith(countryCode)) {
      sanitised = sanitised.substring(2);
    }
    return sanitised;
  }