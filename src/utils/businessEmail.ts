import freeDomains from "./freeDomains.json";

const FREE_EMAIL_DOMAINS = new Set(freeDomains);

export const BUSINESS_EMAIL_REQUIRED_MESSAGE =
  "Použijte pracovní e-mail. Osobní schránky u free poskytovatelů nejsou podporovány.";

export function getEmailDomain(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex < 0 || atIndex === trimmed.length - 1) {
    return null;
  }

  const domain = trimmed.slice(atIndex + 1).replace(/\.+$/, "");
  if (!domain || domain.includes(" ") || !domain.includes(".")) {
    return null;
  }

  return domain;
}

/**
 * Returns true when the e-mail domain belongs to a known free / consumer provider.
 */
export function isFreeEmailProvider(email: string): boolean {
  const domain = getEmailDomain(email);
  if (!domain) {
    return false;
  }

  if (FREE_EMAIL_DOMAINS.has(domain)) {
    return true;
  }

  // Catch regional variants such as hotmail.de, yahoo.it, live.fr
  const parts = domain.split(".");
  if (parts.length >= 3) {
    const parent = parts.slice(-2).join(".");
    if (FREE_EMAIL_DOMAINS.has(parent)) {
      return true;
    }
  }

  const localBrand = parts[0];
  const freeBrands = new Set([
    "gmail",
    "googlemail",
    "hotmail",
    "outlook",
    "live",
    "msn",
    "yahoo",
    "ymail",
    "icloud",
    "protonmail",
    "proton",
    "aol",
    "gmx",
    "yandex",
  ]);

  return freeBrands.has(localBrand) && parts.length >= 2;
}

/**
 * Validates that the address looks like an e-mail and is not a free provider.
 * Returns an error message or null when valid.
 */
export function getBusinessEmailError(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return "Zadejte e-mailovou adresu.";
  }

  const domain = getEmailDomain(trimmed);
  if (!domain || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Zadejte platnou e-mailovou adresu.";
  }

  if (isFreeEmailProvider(trimmed)) {
    return BUSINESS_EMAIL_REQUIRED_MESSAGE;
  }

  return null;
}
