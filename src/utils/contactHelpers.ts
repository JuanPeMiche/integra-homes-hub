/**
 * Centralized helpers for phone and email contact actions
 * Ensures consistent behavior across desktop and mobile, local and production
 */

// Institutional contact data
export const CONTACT_INFO = {
  phone: "+59897774000", // E.164 format for tel: links
  phoneDisplay: "598 97 774 000", // Human-readable format
  email: "integraresidenciales@cncs.com.uy",
  whatsapp: "59897774000", // For wa.me links (no +)
  defaultSubject: "Consulta - Integra Residenciales",
  defaultBody: "Hola, quisiera realizar una consulta.\n\nMi nombre es: ____\nTeléfono: ____\nConsulta: ____",
};

/**
 * Opens the phone dialer with the given phone number
 * Uses window.location.href for maximum compatibility
 * @param phone - Phone number in E.164 format (e.g., +59897774000)
 */
export function openPhoneCall(phone: string = CONTACT_INFO.phone): void {
  // Ensure E.164 format (no spaces, starts with +)
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  const formattedPhone = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;
  
  // Use location.href for better mobile compatibility
  window.location.href = `tel:${formattedPhone}`;
}

/**
 * Opens the default email client with pre-filled recipient, subject, and body
 * Uses window.location.href for maximum compatibility
 * @param to - Recipient email address
 * @param subject - Optional email subject
 * @param body - Optional email body
 */
export function openEmail(
  to: string = CONTACT_INFO.email,
  subject?: string,
  body?: string
): void {
  const params = new URLSearchParams();
  
  if (subject) {
    params.set("subject", subject);
  }
  
  if (body) {
    params.set("body", body);
  }
  
  const queryString = params.toString();
  const mailtoUrl = queryString ? `mailto:${to}?${queryString}` : `mailto:${to}`;
  
  // Use location.href for better compatibility across browsers and production
  window.location.href = mailtoUrl;
}

/**
 * Opens WhatsApp with the given phone number and optional message
 * @param phone - Phone number without + prefix
 * @param message - Optional pre-filled message
 */
export function openWhatsApp(
  phone: string = CONTACT_INFO.whatsapp,
  message?: string
): void {
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, "");
  const baseUrl = `https://wa.me/${cleanPhone}`;
  
  if (message) {
    window.open(`${baseUrl}?text=${encodeURIComponent(message)}`, "_blank");
  } else {
    window.open(baseUrl, "_blank");
  }
}
