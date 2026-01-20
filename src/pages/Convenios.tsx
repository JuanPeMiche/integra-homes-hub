import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, ExternalLink } from "lucide-react";
import { useConvenios, Convenio } from "@/hooks/useConvenios";
import { Link } from "react-router-dom";

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
  "SUMMUM + Hospital Británico": { primary: sumumLogo, secondary: hospitalBritanicoLogo },
  "Pañales IndaSlip": { primary: indaslipLogo },
};

const Convenios = () => {
  const { data: convenios, isLoading } = useConvenios();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Handshake className="h-5 w-5" />
                <span className="font-medium">Beneficios Exclusivos</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Convenios y beneficios para la Red Integra
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Descubrí todos los beneficios exclusivos disponibles para residenciales y familias vinculadas a nuestra red
              </p>
            </div>
          </div>
        </section>

        {/* Convenios Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : convenios && convenios.length > 0 ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  Convenios Activos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {convenios.map((convenio) => (
                    <ConvenioCard key={convenio.id} convenio={convenio} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay convenios disponibles en este momento.</p>
              </div>
            )}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Próximamente más beneficios
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Estamos trabajando para ampliar nuestra red de convenios y ofrecerte más beneficios exclusivos. 
              ¿Tenés sugerencias o querés proponer un convenio?
            </p>
            <Button asChild>
              <Link to="/contacto">Contactanos</Link>
            </Button>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto">
              Los beneficios pueden estar sujetos a condiciones específicas. Consultá para más información sobre cada convenio.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
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
    <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-soft transition-all duration-300 hover:border-primary/20 flex flex-col h-full">
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
        <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0 text-xs font-medium shrink-0">
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

export default Convenios;
