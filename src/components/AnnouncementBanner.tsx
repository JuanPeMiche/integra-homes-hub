import { useState } from "react";
import { GraduationCap, CalendarDays, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GOOGLE_FORM_URL = "https://forms.gle/QJ37viRArQM22F5SA";

const SYLLABUS = {
  session1: {
    title: "Sesión 1: Directores y gerentes",
    heading: "Reflexiones sobre los servicios que se presta a las personas que viven en residenciales en Uruguay: Calidad de la atención, sostenibilidad económica y liderazgo humano.",
    objective: "Analizar dificultades y dialogar estrategias viables para mejorar la atención a personas con deterioro cognitivo en residencias pequeñas, integrando calidad asistencial, sostenibilidad económica y fortalecimiento del liderazgo humano.",
  },
  session2: {
    title: "Sesión 2: Junta Directiva / enfoque estratégico",
    heading: "Rol de las asociaciones patronales en la mejora del sector residencial: retos, corresponsabilidad y propuestas de futuro.",
    objective: "Reflexionar sobre el papel estratégico de las asociaciones patronales en el fortalecimiento del sector de los Cuidados de Larga Duración y en la mejora de la atención a las personas mayores, identificando aportes y líneas de acción posibles desde una lógica colectiva.",
  },
  session3: {
    title: "Actividad complementaria: Cuidadores",
    heading: "Acompañar y cuidar a personas con demencia: Reflexiones y aportaciones prácticas para la atención a las personas que nos plantean mayor complejidad y reto en el día a día.",
    objective: "Ayudar a las personas trabajadoras a relacionarse y a cuidar a las personas que atienden partiendo de la comprensión de las necesidades, conductas y vivencias (específicamente a las que viven con demencia) y analizando propuestas de actuación.",
  },
};

export function AnnouncementBanner() {
  const [showSyllabus, setShowSyllabus] = useState(false);

  return (
    <>
      {/* Inline Hero Banner - styled for dark background */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 text-base font-bold">
                  Capacitación para Directores
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <CalendarDays className="h-4 w-4" />
                  <span>10, 11 y 12 de febrero (10:00 AM)</span>
                  <span className="hidden lg:inline">• Cupos limitados</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 gap-1"
                onClick={() => setShowSyllabus(true)}
                aria-label="Ver temario de la capacitación"
              >
                Ver temario
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                size="default"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 font-semibold"
                onClick={() => window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer")}
                aria-label="Inscribirse a la capacitación para directores"
              >
                Inscribirme
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div className="text-left">
                <span className="font-bold block text-sm">Capacitación para Directores</span>
                <span className="text-white/90 text-xs flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  10, 11 y 12 de febrero • 10:00 AM
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-white hover:bg-white/20 text-xs h-9 border border-white/20"
                onClick={() => setShowSyllabus(true)}
              >
                Ver temario
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs h-9 font-semibold gap-1"
                onClick={() => window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer")}
              >
                Inscribirme
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Modal */}
      <Dialog open={showSyllabus} onOpenChange={setShowSyllabus}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Capacitación para Directores
            </DialogTitle>
            <p className="text-muted-foreground mt-2">
              10, 11 y 12 de febrero de 2026 • Comienza a las 10:00 AM
            </p>
          </DialogHeader>

          <div className="mt-4">
            <Accordion type="single" collapsible className="w-full" defaultValue="session1">
              <AccordionItem value="session1">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-primary">{SYLLABUS.session1.title}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Tema:</p>
                    <p className="text-muted-foreground leading-relaxed">{SYLLABUS.session1.heading}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Objetivo:</p>
                    <p className="text-muted-foreground leading-relaxed">{SYLLABUS.session1.objective}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="session2">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-primary">{SYLLABUS.session2.title}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Tema:</p>
                    <p className="text-muted-foreground leading-relaxed">{SYLLABUS.session2.heading}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Objetivo:</p>
                    <p className="text-muted-foreground leading-relaxed">{SYLLABUS.session2.objective}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="session3">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-secondary">{SYLLABUS.session3.title}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Tema:</p>
                    <p className="text-muted-foreground leading-relaxed">{SYLLABUS.session3.heading}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Objetivo:</p>
                    <p className="text-muted-foreground leading-relaxed">{SYLLABUS.session3.objective}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 gap-2"
              onClick={() => window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer")}
              aria-label="Inscribirse a la capacitación"
            >
              Inscribirme ahora
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowSyllabus(false)}
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
