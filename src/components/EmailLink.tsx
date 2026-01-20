import { Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EmailLinkProps {
  email: string;
  subject?: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export const EmailLink = ({ 
  email, 
  subject, 
  children, 
  className,
  showIcon = false 
}: EmailLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast("Abriendo correo...", {
      description: "Se abrirá tu cliente de email",
      icon: <Mail className="h-4 w-4" />,
      duration: 2000,
    });
    const mailtoUrl = subject 
      ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
      : `mailto:${email}`;
    window.open(mailtoUrl, '_self');
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
