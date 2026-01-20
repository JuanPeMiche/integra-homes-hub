import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickReplies = [
  "¿Cómo busco una residencia?",
  "¿Qué servicios ofrecen?",
  "Necesito asesoramiento",
  "Otro",
];

const botResponses: Record<string, string> = {
  "¿Cómo busco una residencia?": "Puedes usar nuestro buscador en la página principal. Filtra por departamento, barrio, tipo de atención y servicios que necesites. ¡Es muy fácil!",
  "¿Qué servicios ofrecen?": "Nuestras residencias asociadas ofrecen: enfermería 24h, fisioterapia, terapia ocupacional, actividades recreativas, alimentación especializada, atención Alzheimer, y más.",
  "Necesito asesoramiento": "¡Con gusto te ayudamos! Puedes contactarnos al 598 97 774 000 o escribirnos a integraresidenciales@cncs.com.uy. El asesoramiento es gratuito.",
  "Otro": "Por favor escribe tu consulta y te responderemos a la brevedad. También puedes contactarnos directamente al 598 97 774 000.",
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! ¿Necesitas ayuda para encontrar la residencia ideal?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleQuickReply = (reply: string) => {
    const userMessage: Message = { id: Date.now(), text: reply, isBot: false };
    const botMessage: Message = { 
      id: Date.now() + 1, 
      text: botResponses[reply] || "Gracias por tu mensaje. Un asesor te contactará pronto.", 
      isBot: true 
    };
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = { id: Date.now(), text: inputValue, isBot: false };
    const botMessage: Message = { 
      id: Date.now() + 1, 
      text: "Gracias por tu mensaje. Un asesor de Integra Residenciales te contactará pronto. También puedes llamarnos al 598 97 774 000.", 
      isBot: true 
    };
    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputValue("");
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
        aria-label="Abrir chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Envíanos un mensaje</h3>
              <p className="text-xs text-primary-foreground/80">Respuesta en minutos</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-4 bg-background">
            <p className="text-center text-xs text-muted-foreground">Hoy</p>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.isBot
                      ? "bg-muted text-foreground rounded-bl-none"
                      : "bg-primary text-primary-foreground rounded-br-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="space-y-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="block w-full text-left px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Mensaje..."
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
