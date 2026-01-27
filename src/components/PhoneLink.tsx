import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { openPhoneCall, CONTACT_INFO } from "@/utils/contactHelpers";

interface PhoneLinkProps {
  phone?: string;
  displayPhone?: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

/**
 * PhoneLink component that renders a proper <a href="tel:..."> link
 * Works on both desktop (opens phone app/dialer) and mobile (opens dialer)
 */
export const PhoneLink = ({ 
  phone = CONTACT_INFO.phone,
  displayPhone = CONTACT_INFO.phoneDisplay, 
  children, 
  className,
  showIcon = false 
}: PhoneLinkProps) => {
  // Ensure E.164 format for href
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  const formattedPhone = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;

  const handleClick = (e: React.MouseEvent) => {
    // Let the native <a href="tel:"> behavior handle it
    // Only use JS fallback if href doesn't work
    e.preventDefault();
    openPhoneCall(phone);
  };

  return (
    <a 
      href={`tel:${formattedPhone}`}
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
    >
      {showIcon && <Phone className="h-4 w-4 mr-2 inline-block" />}
      {children || displayPhone}
    </a>
  );
};

export default PhoneLink;
