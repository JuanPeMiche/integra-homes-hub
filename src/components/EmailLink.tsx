import { Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { openEmail, CONTACT_INFO } from "@/utils/contactHelpers";

interface EmailLinkProps {
  email?: string;
  subject?: string;
  body?: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export const EmailLink = ({ 
  email = CONTACT_INFO.email, 
  subject, 
  body,
  children, 
  className,
  showIcon = false 
}: EmailLinkProps) => {
  const mailtoHref = (() => {
    const params: string[] = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    const qs = params.join("&");
    return qs ? `mailto:${email}?${qs}` : `mailto:${email}`;
  })();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Open email FIRST, then show toast
    const { gmailUrl } = openEmail(email, subject, body);
    
    // Show feedback toast after triggering mailto
    toast("Abriendo correo...", {
      description: "Se abrirá tu cliente de email",
      icon: <Mail className="h-4 w-4" />,
      duration: 2000,
      action: {
        label: "Abrir Gmail",
        onClick: () => {
          try {
            const isInIframe = window.self !== window.top;
            if (isInIframe) {
              window.open(gmailUrl, "_blank", "noopener,noreferrer");
            } else {
              window.location.href = gmailUrl;
            }
          } catch {
            window.open(gmailUrl, "_blank", "noopener,noreferrer");
          }
        },
      },
    });
  };

  return (
    <a 
      href={mailtoHref}
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
    >
      {showIcon && <Mail className="h-4 w-4 mr-2 inline-block" />}
      {children || email}
    </a>
  );
};

export default EmailLink;
