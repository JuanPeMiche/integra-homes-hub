import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, MessageCircle } from "lucide-react";

interface SendMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: Record<string, string | string[] | boolean>;
  recipientEmail?: string;
  recipientWhatsApp?: string;
  subject?: string;
}

export function SendMethodDialog({
  open,
  onOpenChange,
  formData,
  recipientEmail = "integraresidenciales@cncs.com.uy",
  recipientWhatsApp = "59897774000",
  subject = "Nueva consulta desde el sitio web",
}: SendMethodDialogProps) {
  const [sending, setSending] = useState(false);

  const formatMessage = () => {
    const lines: string[] = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== "aceptaContacto") {
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .replace("Adulto", "del adulto")
          .replace("Preferido", "preferido");
        
        if (Array.isArray(value)) {
          if (value.length > 0) {
            lines.push(`${label}: ${value.join(", ")}`);
          }
        } else if (typeof value === "string" && value.trim()) {
          lines.push(`${label}: ${value}`);
        }
      }
    });
    return lines.join("\n");
  };

  const handleEmail = () => {
    setSending(true);
    const body = encodeURIComponent(formatMessage());
    const subjectEncoded = encodeURIComponent(subject);
    const mailtoUrl = `mailto:${recipientEmail}?subject=${subjectEncoded}&body=${body}`;
    window.open(mailtoUrl, '_self');
    setTimeout(() => {
      setSending(false);
      onOpenChange(false);
    }, 500);
  };

  const handleWhatsApp = () => {
    setSending(true);
    const message = encodeURIComponent(`*${subject}*\n\n${formatMessage()}`);
    window.open(`https://wa.me/${recipientWhatsApp}?text=${message}`, "_blank");
    setTimeout(() => {
      setSending(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>¿Cómo preferís enviarnos tu consulta?</DialogTitle>
          <DialogDescription>
            Elegí el medio que te resulte más cómodo
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            size="lg"
            className="h-auto flex-col gap-3 py-6 hover:border-primary hover:bg-primary/5"
            onClick={handleEmail}
            disabled={sending}
          >
            <Mail className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="font-semibold">Email</p>
              <p className="text-xs text-muted-foreground">Se abrirá tu app de correo</p>
            </div>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-auto flex-col gap-3 py-6 hover:border-green-600 hover:bg-green-50"
            onClick={handleWhatsApp}
            disabled={sending}
          >
            <MessageCircle className="h-8 w-8 text-green-600" />
            <div className="text-center">
              <p className="font-semibold">WhatsApp</p>
              <p className="text-xs text-muted-foreground">Respuesta más rápida</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
