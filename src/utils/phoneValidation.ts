/**
 * Normalizes a phone number to a consistent format
 * - Removes all non-digit characters except + at the start
 * - Handles common Uruguay phone formats
 */
export function normalizePhone(phone: string): string {
  if (!phone || typeof phone !== "string") return "";

  // Remove all whitespace and common separators
  let cleaned = phone.replace(/[\s\-\.\(\)]/g, "").trim();

  // If it starts with +, keep it
  if (cleaned.startsWith("+")) {
    // Remove + and non-digits, then re-add +
    const digits = cleaned.slice(1).replace(/\D/g, "");
    return "+" + digits;
  }

  // Remove all non-digits
  cleaned = cleaned.replace(/\D/g, "");

  // Handle Uruguay-specific formats
  // If it's a mobile (9 digits starting with 09)
  if (cleaned.startsWith("09") && cleaned.length === 9) {
    return cleaned;
  }

  // If it's a landline (8 digits starting with 2, 4, or similar)
  if (cleaned.length === 8 && /^[24]/.test(cleaned)) {
    return cleaned;
  }

  // If it has country code 598
  if (cleaned.startsWith("598")) {
    // Remove 598 and validate the rest
    const local = cleaned.slice(3);
    if (local.length >= 8) {
      return "+598" + local;
    }
  }

  return cleaned;
}

/**
 * Formats a phone number for display
 * Example: 099123456 -> 099 123 456
 */
export function formatPhoneDisplay(phone: string): string {
  const normalized = normalizePhone(phone);
  
  if (normalized.startsWith("+598")) {
    const local = normalized.slice(4);
    if (local.length === 9 && local.startsWith("9")) {
      // Mobile: +598 99 123 456
      return `+598 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
    }
    if (local.length === 8) {
      // Landline: +598 2 123 4567
      return `+598 ${local.slice(0, 1)} ${local.slice(1, 4)} ${local.slice(4)}`;
    }
  }

  // Local format
  if (normalized.length === 9 && normalized.startsWith("09")) {
    return `${normalized.slice(0, 3)} ${normalized.slice(3, 6)} ${normalized.slice(6)}`;
  }

  if (normalized.length === 8) {
    return `${normalized.slice(0, 4)} ${normalized.slice(4)}`;
  }

  return normalized;
}

/**
 * Validates if a phone number is in a valid format
 */
export function isValidPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  
  if (!normalized) return false;

  // Uruguay mobile (09X XXX XXX)
  if (/^09\d{7}$/.test(normalized)) return true;

  // Uruguay landline (2XXX XXXX or 4XXX XXXX)
  if (/^[24]\d{7}$/.test(normalized)) return true;

  // With country code
  if (/^\+598\d{8,9}$/.test(normalized)) return true;

  // Generic international format
  if (/^\+\d{10,15}$/.test(normalized)) return true;

  // Allow any reasonable length for flexibility
  return normalized.length >= 7 && normalized.length <= 15;
}

/**
 * Normalizes a WhatsApp number for proper link generation
 * Returns number without + prefix, ready for wa.me links
 */
export function normalizeWhatsApp(whatsapp: string): string {
  const normalized = normalizePhone(whatsapp);
  
  // Remove + if present
  let digits = normalized.replace(/^\+/, "");

  // If it starts with 09 (Uruguay mobile), add country code
  if (digits.startsWith("09") && digits.length === 9) {
    digits = "598" + digits.slice(1); // Remove the leading 0
  }

  // If it doesn't have country code and is a valid length, assume Uruguay
  if (!digits.startsWith("598") && digits.length === 8) {
    digits = "598" + digits;
  }

  return digits;
}

/**
 * Removes duplicates from an array of phone numbers
 * Compares normalized versions to catch duplicates with different formatting
 */
export function removeDuplicatePhones(phones: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const phone of phones) {
    const normalized = normalizePhone(phone);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      result.push(phone.trim());
    }
  }

  return result;
}

/**
 * Validates and normalizes an array of phone numbers
 * Returns cleaned array with duplicates removed and invalid entries filtered
 */
export function validateAndNormalizePhones(
  phones: string[],
  options: { 
    removeInvalid?: boolean; 
    normalize?: boolean; 
    removeDuplicates?: boolean;
  } = {}
): { 
  valid: string[]; 
  invalid: string[]; 
  duplicates: string[];
} {
  const { 
    removeInvalid = true, 
    normalize = true, 
    removeDuplicates = true 
  } = options;

  const valid: string[] = [];
  const invalid: string[] = [];
  const duplicates: string[] = [];
  const seen = new Set<string>();

  for (const phone of phones) {
    const trimmed = phone.trim();
    if (!trimmed) continue;

    const normalized = normalizePhone(trimmed);

    // Check for duplicates
    if (removeDuplicates && seen.has(normalized)) {
      duplicates.push(trimmed);
      continue;
    }

    // Validate
    if (!isValidPhone(trimmed)) {
      if (!removeInvalid) {
        valid.push(trimmed);
      } else {
        invalid.push(trimmed);
      }
      continue;
    }

    seen.add(normalized);
    valid.push(normalize ? normalized : trimmed);
  }

  return { valid, invalid, duplicates };
}
