import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchForm } from "@/components/SearchForm";
import { StatsSection } from "@/components/StatsSection";
import { ChatBot } from "@/components/ChatBot";
import { ResidenceCard } from "@/components/ResidenceCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Heart, CheckCircle, Quote } from "lucide-react";
import { mockResidences } from "@/data/residences";
import heroBg from "@/assets/hero-residence.jpg";
import madrinaImg from "@/assets/madrina-lourdes-bermejo.png";

const Index = () => {
  // Get Red Integra residences sorted alphabetically
  const featuredResidences = mockResidences
    .filter(r => r.redIntegra)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 6);
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

        {/* Featured Residences - Red Integra */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Red Integra</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Residencias Destacadas
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conocé las residencias que forman parte de nuestra red de confianza
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResidences.map((residence) => (
                <ResidenceCard
                  key={residence.id}
                  residence={residence}
                  onCompare={() => {}}
                  isComparing={false}
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2"
                onClick={() => window.location.href = '/buscar'}
              >
                Ver Todas las Residencias
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Madrina Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-20" />
                  <img
                    src={madrinaImg}
                    alt="Lourdes Bermejo - Madrina de Integra Residenciales"
                    className="relative w-full h-full object-cover rounded-full border-4 border-background shadow-xl"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Nuestra Madrina</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Lourdes Bermejo
                </h2>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                  <p className="text-lg text-muted-foreground leading-relaxed pl-6">
                    Referente internacional en gerontología y atención centrada en la persona.
                    Con su guía, impulsamos un modelo de cuidado humanizado, digno y de calidad
                    para los adultos mayores en Uruguay.
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Lourdes Bermejo es psicóloga, doctora en Ciencias de la Educación y una de las
                  voces más influyentes en el ámbito del envejecimiento activo y la atención
                  integral a personas mayores en el mundo hispanohablante.
                </p>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open('https://lourdesbermejo.es', '_blank')}
                >
                  Conocer más
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

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
