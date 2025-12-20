import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, ExternalLink } from "lucide-react";
import { useConvenios, Convenio } from "@/hooks/useConvenios";

// Fallback logos for initial data
import tiendaInglesaLogo from "@/assets/convenios/tienda-inglesa.png";
import macroMercadoLogo from "@/assets/convenios/macro-mercado.png";
import sumumLogo from "@/assets/convenios/sumum.png";
import hospitalBritanicoLogo from "@/assets/convenios/hospital-britanico.png";
import indaslipLogo from "@/assets/convenios/indaslip.png";

// Map of fallback logos by name for existing convenios without uploaded logos
const fallbackLogos: Record<string, { primary: string; secondary?: string }> = {
  "Tienda Inglesa": { primary: tiendaInglesaLogo },
  "Macro Mercado": { primary: macroMercadoLogo },
  "SUMUM + Hospital Británico": { primary: sumumLogo, secondary: hospitalBritanicoLogo },
  "Pañales IndaSlip": { primary: indaslipLogo },
};

export const ConveniosSection = () => {
  const { data: convenios, isLoading } = useConvenios();

  if (isLoading) {
    return (
      <section id="convenios" className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!convenios || convenios.length === 0) {
    return null;
  }

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
  convenio: Convenio;
}

const ConvenioCard = ({ convenio }: ConvenioCardProps) => {
  const handleClick = () => {
    if (convenio.cta_link) {
      window.location.href = convenio.cta_link;
    }
  };

  // Use uploaded logos or fallback to bundled assets
  const fallback = fallbackLogos[convenio.name];
  const primaryLogo = convenio.logo_url || fallback?.primary;
  const secondaryLogo = convenio.secondary_logo_url || fallback?.secondary;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-soft transition-all duration-300 hover:border-primary/20 flex flex-col">
      {/* Header with Logo and Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {primaryLogo && (
            <div className="flex items-center gap-2">
              <div className="h-14 w-14 rounded-lg bg-white border border-border flex items-center justify-center p-1.5 overflow-hidden">
                <img 
                  src={primaryLogo} 
                  alt={convenio.name}
                  className="h-full w-full object-contain"
                />
              </div>
              {secondaryLogo && (
                <div className="h-14 w-14 rounded-lg bg-white border border-border flex items-center justify-center p-1.5 overflow-hidden">
                  <img 
                    src={secondaryLogo} 
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
            {convenio.main_benefit}
          </p>
        </div>

        {/* Details */}
        {convenio.details && (
          <p className="text-muted-foreground text-sm mb-2">
            {convenio.details}
          </p>
        )}
        
        {/* Conditions */}
        {convenio.conditions && (
          <p className="text-xs text-muted-foreground/80 italic">
            {convenio.conditions}
          </p>
        )}
      </div>

      {/* CTA Button */}
      {convenio.cta_label && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 w-full gap-2"
          onClick={handleClick}
        >
          {convenio.cta_label}
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
