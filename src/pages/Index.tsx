import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchForm } from "@/components/SearchForm";
import { StatsSection } from "@/components/StatsSection";
import { ChatBot } from "@/components/ChatBot";
import { ResidenceCard } from "@/components/ResidenceCard";
import { ConveniosSection } from "@/components/ConveniosSection";
import { TeamSection } from "@/components/TeamSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Target, Heart, CheckCircle } from "lucide-react";
import { useResidences } from "@/hooks/useResidences";
import heroBg from "@/assets/hero-residence.jpg";

const Index = () => {
  const { data: residences = [], isLoading } = useResidences();
  
  // Get Red Integra residences sorted alphabetically
  const allFeaturedResidences = residences.filter(r => r.redIntegra);
  
  // Show 3 on mobile, 6 on desktop (handled via CSS)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative text-white py-20 md:py-32 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(34, 139, 104, 0.9) 0%, rgba(59, 130, 163, 0.9) 100%), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Encontrá el mejor hogar para tus mayores en Uruguay
              </h1>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                Integra Residenciales es la única asociación de residenciales habilitados en Uruguay. Todos nuestros residenciales cuentan con la mejor atención, cuidados personalizados y trato digno.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="gap-2 text-base h-14 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={() => window.location.href = '/buscar'}
                >
                  Buscar ahora
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 text-base h-14 px-8 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
                  onClick={() => window.location.href = '/contacto'}
                >
                  Asesoramiento gratuito
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Form Section */}
        <section className="py-12 md:py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SearchForm />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Featured Residences - Red Integra */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Red Integra</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Residencias de la red
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conocé las residencias que forman parte de nuestra red de confianza
              </p>
            </div>

            {isLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFeaturedResidences.slice(0, 3).map((residence) => (
                  <ResidenceCard key={residence.id} residence={residence} />
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2"
                onClick={() => window.location.href = '/buscar'}
              >
                Ver todas las residencias
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Por qué elegir Integra Residenciales?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nuestro compromiso es ayudarte a encontrar el mejor cuidado para tus seres queridos en Uruguay.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-soft transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Confianza y seguridad</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Todas nuestras residencias están verificadas y cumplen con los más altos estándares de calidad y atención.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-soft transition-shadow">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Selección estratégica</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conocemos cada institución y ubicamos a cada persona en el entorno que mejor la acompaña.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-soft transition-shadow">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-6">
                  <Heart className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cuidado centrado en la persona</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Priorizamos el bienestar, la dignidad y la felicidad de cada residente en todas nuestras recomendaciones, con un enfoque humano y cálido.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Convenios Section */}
        <ConveniosSection />

        {/* Team Section */}
        <TeamSection />
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                ¿Necesitás ayuda para elegir?
              </h2>
              <p className="text-lg text-muted-foreground">
                Nuestro equipo de expertos está disponible para ofrecerte asesoramiento gratuito y personalizado
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="gap-2 text-base h-14 px-8"
                  onClick={() => window.location.href = 'mailto:integraresidenciales@cns.com.uy'}
                >
                  Contactar ahora
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
