import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

export const ConveniosSection = () => {
  const { data: convenios, isLoading } = useConvenios();

  if (isLoading) {
    return (
      <section id="convenios" className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!convenios || convenios.length === 0) {
    return null;
  }

  // Get unique logos from convenios
  const getLogos = () => {
    const logos: { src: string; alt: string }[] = [];
    
    convenios.forEach((convenio) => {
      const fallback = fallbackLogos[convenio.name];
      const primaryLogo = convenio.logo_url || fallback?.primary;
      const secondaryLogo = convenio.secondary_logo_url || fallback?.secondary;
      
      if (primaryLogo) {
        logos.push({ src: primaryLogo, alt: convenio.name });
      }
      if (secondaryLogo) {
        logos.push({ src: secondaryLogo, alt: `${convenio.name} secundario` });
      }
    });
    
    return logos;
  };

  const logos = getLogos();

  return (
    <section id="convenios" className="py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Convenios Red Integra
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Beneficios exclusivos para residenciales y familias de la red
          </p>
        </div>

        {/* Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto mb-10">
          {logos.map((logo, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild 
            variant="secondary" 
            size="lg"
            className="gap-2 bg-white text-primary hover:bg-white/90"
          >
            <Link to="/convenios">
              Ver todos los convenios
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
