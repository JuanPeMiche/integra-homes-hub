import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, ExternalLink } from "lucide-react";

// Logos
import tiendaInglesaLogo from "@/assets/convenios/tienda-inglesa.png";
import macroMercadoLogo from "@/assets/convenios/macro-mercado.png";
import sumumLogo from "@/assets/convenios/sumum.png";
import hospitalBritanicoLogo from "@/assets/convenios/hospital-britanico.png";
import indaslipLogo from "@/assets/convenios/indaslip.png";

interface Convenio {
  id: string;
  name: string;
  mainBenefit: string;
  details: string;
  conditions: string;
  logoUrl?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

const convenios: Convenio[] = [
  {
    id: "tienda-inglesa",
    name: "Tienda Inglesa",
    mainBenefit: "10% de descuento en góndolas (todos los productos)",
    details: "Descuento directo en compras en Tienda Inglesa.",
    conditions: "Aplicable con la tarjeta de Tienda Inglesa provista por Integra / la Red.",
    logoUrl: tiendaInglesaLogo,
    ctaLabel: "Consultar",
    ctaLink: "/contacto",
  },
  {
    id: "macro-mercado",
    name: "Macro Mercado",
    mainBenefit: "Mejor descuento por unidad (no requiere comprar 6 o 12)",
    details: "Ahorro inmediato sin compra mínima.",
    conditions: "El precio con descuento aplica desde 1 unidad.",
    logoUrl: macroMercadoLogo,
    ctaLabel: "Consultar",
    ctaLink: "/contacto",
  },
  {
    id: "sumum-britanico",
    name: "SUMUM + Hospital Británico",
    mainBenefit: "40% de descuento en la cuota mensual del plan",
    details: "Beneficio mensual con condiciones de afiliación/plan.",
    conditions: "Plan asociado a SUMUM e internación en el Hospital Británico.",
    logoUrl: sumumLogo,
    secondaryLogoUrl: hospitalBritanicoLogo,
    ctaLabel: "Consultar",
    ctaLink: "/contacto",
  } as Convenio & { secondaryLogoUrl?: string },
  {
    id: "indaslip",
    name: "Pañales IndaSlip",
    mainBenefit: "Pañales europeos premium a mitad de precio vs farmacia",
    details: "IndaSlip — alta calidad con ahorro significativo.",
    conditions: "Compra directa de fábrica en España.",
    logoUrl: indaslipLogo,
    ctaLabel: "Consultar",
    ctaLink: "/contacto",
  },
];

export const ConveniosSection = () => {
  return (
    <section id="convenios" className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Handshake className="h-5 w-5" />
            <span className="font-medium">Beneficios Exclusivos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Convenios y beneficios para la Red Integra
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beneficios exclusivos disponibles para residenciales y familias vinculadas a la red
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {convenios.map((convenio) => (
            <ConvenioCard key={convenio.id} convenio={convenio} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground mt-10 max-w-xl mx-auto">
          Los beneficios pueden estar sujetos a condiciones. Consultá para más información.
        </p>
      </div>
    </section>
  );
};

interface ConvenioCardProps {
  convenio: Convenio & { secondaryLogoUrl?: string };
}

const ConvenioCard = ({ convenio }: ConvenioCardProps) => {
  const handleClick = () => {
    if (convenio.ctaLink) {
      window.location.href = convenio.ctaLink;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-soft transition-all duration-300 hover:border-primary/20 flex flex-col">
      {/* Header with Logo and Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {convenio.logoUrl && (
            <div className="flex items-center gap-2">
              <div className="h-14 w-14 rounded-lg bg-white border border-border flex items-center justify-center p-1.5 overflow-hidden">
                <img 
                  src={convenio.logoUrl} 
                  alt={convenio.name}
                  className="h-full w-full object-contain"
                />
              </div>
              {convenio.secondaryLogoUrl && (
                <div className="h-14 w-14 rounded-lg bg-white border border-border flex items-center justify-center p-1.5 overflow-hidden">
                  <img 
                    src={convenio.secondaryLogoUrl} 
                    alt={`${convenio.name} secundario`}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0 text-xs font-medium">
          Exclusivo Red Integra
        </Badge>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          {convenio.name}
        </h3>
        
        {/* Main Benefit - Highlighted */}
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-3">
          <p className="font-bold text-primary text-sm md:text-base">
            {convenio.mainBenefit}
          </p>
        </div>

        {/* Details */}
        <p className="text-muted-foreground text-sm mb-2">
          {convenio.details}
        </p>
        
        {/* Conditions */}
        <p className="text-xs text-muted-foreground/80 italic">
          {convenio.conditions}
        </p>
      </div>

      {/* CTA Button */}
      {convenio.ctaLabel && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 w-full gap-2"
          onClick={handleClick}
        >
          {convenio.ctaLabel}
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
