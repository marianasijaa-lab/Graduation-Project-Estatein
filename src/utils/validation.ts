// ─── Regex patterns ──────────────────────────────────────────────────────────

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Accepts: +1 234 567 8900 / (123) 456-7890 / 0501234567 / +44 20 5555 0300
export const PHONE_REGEX = /^[+]?[\d\s\-()\/.]{7,20}$/;

// At least 2 real characters (no digit-only names)
export const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,}$/;

// Basic URL — must start with http:// or https://
export const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

// ─── Individual field validators ──────────────────────────────────────────────

export function validateRequired(value: string, label = "This field"): string {
  return value.trim() ? "" : `${label} is required.`;
}

export function validateEmail(value: string): string {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address.";
  return "";
}

export function validatePhone(value: string): string {
  if (!value.trim()) return "Phone number is required.";
  if (!PHONE_REGEX.test(value.trim())) return "Enter a valid phone number.";
  return "";
}

export function validateName(value: string, label = "Name"): string {
  if (!value.trim()) return `${label} is required.`;
  if (!NAME_REGEX.test(value.trim())) return `${label} must contain only letters.`;
  return "";
}

export function validateMessage(value: string, min = 10): string {
  if (!value.trim()) return "Message is required.";
  if (value.trim().length < min) return `Message must be at least ${min} characters.`;
  return "";
}

export function validatePassword(value: string): string {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  return "";
}

// ─── Password strength ────────────────────────────────────────────────────────

export type PasswordStrength = "empty" | "weak" | "fair" | "strong";

/**
 * Returns a strength level based on length + character variety.
 *
 * weak   — less than 8 chars, or only one character type
 * fair   — 8+ chars with 2 character types
 * strong — 8+ chars with 3+ character types (upper, lower, digit, special)
 */
export function getPasswordStrength(value: string): PasswordStrength {
  if (!value) return "empty";
  if (value.length < 8) return "weak";

  let score = 0;
  if (/[a-z]/.test(value)) score++;          // lowercase
  if (/[A-Z]/.test(value)) score++;          // uppercase
  if (/[0-9]/.test(value)) score++;          // digit
  if (/[^A-Za-z0-9]/.test(value)) score++;   // special character

  if (score >= 3) return "strong";
  if (score === 2) return "fair";
  return "weak";
}

// ─── Email quality helpers ────────────────────────────────────────────────────

// Well-known legitimate providers — we won't warn about these.
const TRUSTED_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "outlook.com", "hotmail.com", "live.com", "msn.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.fr",
  "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com",
  "tutanota.com",
  "aol.com",
  "zoho.com",
]);

// Domains that look like throwaway / test addresses.
const WEAK_DOMAINS = new Set([
  "test.com", "test.net", "mail.com", "email.com",
  "mailinator.com", "guerrillamail.com", "tempmail.com",
  "yopmail.com", "sharklasers.com", "trashmail.com",
  "fakeinbox.com", "maildrop.cc", "dispostable.com",
  "example.com", "sample.com", "demo.com",
]);

const SUGGESTED_DOMAINS = ["gmail.com", "outlook.com", "yahoo.com", "icloud.com", "proton.me"];

export interface EmailQuality {
  /** true when the domain looks suspicious / disposable */
  weak: boolean;
  /** suggested alternative full addresses when weak === true */
  suggestions: string[];
}

/**
 * Analyses the email domain and returns quality info.
 * Call only after basic format validation passes.
 */
export function getEmailQuality(value: string): EmailQuality {
  const trimmed = value.trim().toLowerCase();
  const atIdx   = trimmed.lastIndexOf("@");
  if (atIdx === -1) return { weak: false, suggestions: [] };

  const local  = trimmed.slice(0, atIdx);
  const domain = trimmed.slice(atIdx + 1);

  // Trusted — no warning
  if (TRUSTED_DOMAINS.has(domain)) return { weak: false, suggestions: [] };

  // Known weak / disposable
  if (WEAK_DOMAINS.has(domain)) {
    const suggestions = SUGGESTED_DOMAINS.map((d) => `${local}@${d}`);
    return { weak: true, suggestions };
  }

  // Heuristic: very short domain (e.g. "a.co") or no dot at all
  if (!domain.includes(".") || domain.split(".").every((p) => p.length <= 2)) {
    const suggestions = SUGGESTED_DOMAINS.map((d) => `${local}@${d}`);
    return { weak: true, suggestions };
  }

  return { weak: false, suggestions: [] };
}

export function validateUrl(value: string, label = "URL", required = false): string {
  if (!value.trim()) return required ? `${label} is required.` : "";
  if (!URL_REGEX.test(value.trim())) return `Enter a valid URL (must start with https://).`;
  return "";
}

export function validateNumber(
  value: string,
  label: string,
  options: { required?: boolean; min?: number; max?: number; integer?: boolean } = {},
): string {
  const { required = false, min, max, integer = false } = options;
  if (!value.trim()) return required ? `${label} is required.` : "";
  const num = Number(value);
  if (Number.isNaN(num)) return `${label} must be a number.`;
  if (integer && !Number.isInteger(num)) return `${label} must be a whole number.`;
  if (min !== undefined && num < min) return `${label} must be at least ${min}.`;
  if (max !== undefined && num > max) return `${label} must be at most ${max}.`;
  return "";
}

// ─── Helper: build a "touched" record from a set of field keys ────────────────

export function buildTouched<T extends string>(keys: T[]): Record<T, boolean> {
  return keys.reduce((acc, k) => ({ ...acc, [k]: false }), {} as Record<T, boolean>);
}

// ─── Helper: mark all fields as touched (used on submit attempt) ──────────────

export function touchAll<T extends string>(keys: T[]): Record<T, boolean> {
  return keys.reduce((acc, k) => ({ ...acc, [k]: true }), {} as Record<T, boolean>);
}
