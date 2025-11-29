import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchForm } from "@/components/SearchForm";
import { StatsSection } from "@/components/StatsSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDM2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Encuentra el Mejor Hogar para Tus Mayores
              </h1>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                Ayudamos a las familias a encontrar la residencia perfecta con la mejor atención y cuidados personalizados
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" className="gap-2 text-base h-14 px-8">
                  Buscar Ahora
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base h-14 px-8 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
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
                Nuestro compromiso es ayudarte a encontrar el mejor cuidado para tus seres queridos
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
                  Priorizamos el bienestar, la dignidad y la felicidad de cada residente en todas nuestras recomendaciones.
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
                <Button size="lg" className="gap-2 text-base h-14 px-8">
                  Contactar Ahora
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
