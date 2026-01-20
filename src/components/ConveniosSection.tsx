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

// Map of fallback logos and benefits by name for existing convenios
const fallbackData: Record<string, { primary: string; secondary?: string; benefit: string }> = {
  "Tienda Inglesa": { 
    primary: tiendaInglesaLogo,
    benefit: "10% de descuento"
  },
  "Macro Mercado": { 
    primary: macroMercadoLogo,
    benefit: "Mejor descuento por unidad"
  },
  "SUMMUM + Hospital Británico": { 
    primary: sumumLogo, 
    secondary: hospitalBritanicoLogo,
    benefit: "40% de descuento en la cuota mensual del plan"
  },
  "Pañales IndaSlip": { 
    primary: indaslipLogo,
    benefit: "Pañales premium a mitad de precio vs farmacia"
  },
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

  // Get convenios with their logos and benefits
  const getConvenioData = () => {
    return convenios.map((convenio) => {
      const fallback = fallbackData[convenio.name];
      const primaryLogo = convenio.logo_url || fallback?.primary;
      const secondaryLogo = convenio.secondary_logo_url || fallback?.secondary;
      const benefit = convenio.main_benefit || fallback?.benefit || "";
      
      return {
        name: convenio.name,
        primaryLogo,
        secondaryLogo,
        benefit
      };
    });
  };

  const convenioData = getConvenioData();

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

        {/* Convenios Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {convenioData.map((convenio, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-white/20 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                {convenio.primaryLogo && (
                  <img 
                    src={convenio.primaryLogo} 
                    alt={convenio.name}
                    className="h-20 md:h-24 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                )}
                {convenio.secondaryLogo && (
                  <img 
                    src={convenio.secondaryLogo} 
                    alt={`${convenio.name} secundario`}
                    className="h-20 md:h-24 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                )}
              </div>
              {convenio.benefit && (
                <p className="text-sm text-muted-foreground font-medium mt-2">
                  {convenio.benefit}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="secondary" 
            size="lg"
            className="gap-2 bg-white text-primary hover:bg-white/90"
            onClick={() => {
              window.scrollTo(0, 0);
              window.location.href = '/convenios';
            }}
          >
            Ver todos los convenios
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
