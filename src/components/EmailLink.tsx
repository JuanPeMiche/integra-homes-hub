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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Open email FIRST, then show toast
    openEmail(email, subject, body);
    
    // Show feedback toast after triggering mailto
    toast("Abriendo correo...", {
      description: "Se abrirá tu cliente de email",
      icon: <Mail className="h-4 w-4" />,
      duration: 2000,
    });
  };

  return (
    <a 
      href={`mailto:${email}`}
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
    >
      {showIcon && <Mail className="h-4 w-4 mr-2 inline-block" />}
      {children || email}
    </a>
  );
};

export default EmailLink;
