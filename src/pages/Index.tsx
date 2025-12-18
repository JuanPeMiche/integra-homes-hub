import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchForm } from "@/components/SearchForm";
import { StatsSection } from "@/components/StatsSection";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Heart } from "lucide-react";
import heroBg from "@/assets/hero-residence.jpg";

const Index = () => {
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
                Encontrá el Mejor Hogar para Tus Mayores en Uruguay
              </h1>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                Integra Residenciales te ayuda a encontrar la residencia perfecta con la mejor atención, cuidados personalizados y trato digno
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="gap-2 text-base h-14 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={() => window.location.href = '/buscar'}
                >
                  Buscar Ahora
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 text-base h-14 px-8 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
                  onClick={() => window.location.href = '/contacto'}
                >
                  Asesoramiento Gratuito
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

        {/* Benefits Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Por Qué Elegir Integra Residenciales?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nuestro compromiso es ayudarte a encontrar el mejor cuidado para tus seres queridos en Uruguay
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-soft transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Confianza y Seguridad</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Todas nuestras residencias están verificadas y cumplen con los más altos estándares de calidad y atención.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-soft transition-shadow">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Asesoramiento Personalizado</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Te acompañamos en todo el proceso, desde la búsqueda hasta la elección de la residencia ideal.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-soft transition-shadow">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-6">
                  <Heart className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cuidado Centrado en la Persona</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Priorizamos el bienestar, la dignidad y la felicidad de cada residente en todas nuestras recomendaciones, con un enfoque humano y cálido.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                ¿Necesitas Ayuda para Elegir?
              </h2>
              <p className="text-lg text-muted-foreground">
                Nuestro equipo de expertos está disponible para ofrecerte asesoramiento gratuito y personalizado
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="gap-2 text-base h-14 px-8"
                  onClick={() => window.location.href = '/contacto'}
                >
                  Contactar Ahora
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
