import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  HandHeart,
  FileText,
  Search,
  PhoneCall,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: PhoneCall,
      title: "Asesoramiento Personalizado",
      description:
        "Te escuchamos y te ayudamos a encontrar la residencia que mejor se adapte a las necesidades de tu familiar, considerando ubicación, presupuesto y tipo de atención requerida. Nuestro equipo de expertos está disponible para orientarte en cada paso del proceso.",
    },
    {
      icon: HandHeart,
      title: "Acompañamiento en la Elección",
      description:
        "Un experto de Integra puede acompañarte en visitas a residencias preseleccionadas, haciendo las preguntas adecuadas y ofreciendo su evaluación profesional. Te ayudamos a tomar la decisión más informada posible.",
    },
    {
      icon: FileText,
      title: "Soporte Legal y Administrativo",
      description:
        "Ayuda con trámites administrativos, gestión de plazas, comprensión de contratos de admisión y orientación sobre regulaciones locales. Facilitamos toda la documentación necesaria para que el proceso sea lo más simple posible.",
    },
    {
      icon: Search,
      title: 'Búsqueda Proactiva "Buscamos por Ti"',
      description:
        "Deja tus criterios y nuestro equipo se encarga de buscar activamente plazas disponibles en residencias que encajen perfectamente con tus necesidades. Ahorra tiempo y esfuerzo con nuestro servicio personalizado de búsqueda.",
    },
    {
      icon: Users,
      title: "Seguimiento Continuo",
      description:
        "No terminamos nuestro trabajo cuando encuentras una residencia. Ofrecemos seguimiento continuo para asegurarnos de que tu familiar esté recibiendo la mejor atención y que estés satisfecho con tu elección.",
    },
    {
      icon: CheckCircle,
      title: "Verificación de Calidad",
      description:
        "Todas las residencias en nuestra red han sido verificadas y cumplen con estrictos estándares de calidad. Realizamos visitas regulares y mantenemos actualizadas las valoraciones para garantizar la mejor información.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Integra Residenciales es una asociación civil sin fines de lucro dedicada a mejorar la calidad del cuidado de personas mayores en Uruguay
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="hover:shadow-soft transition-shadow"
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                ¿Por Qué Elegir Integra Residenciales?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Integra Residenciales es una asociación civil sin fines de lucro con trayectoria en Uruguay, ayudando a familias a encontrar el hogar perfecto para sus mayores. Nuestro compromiso es ofrecer un servicio personalizado, transparente y gratuito que ponga las necesidades de tu familia en primer lugar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    +100
                  </div>
                  <div className="text-muted-foreground">
                    Residencias en Uruguay
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    +1,000
                  </div>
                  <div className="text-muted-foreground">Familias Ayudadas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    100%
                  </div>
                  <div className="text-muted-foreground">
                    Asesoramiento Gratuito
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                ¿Listo para Empezar?
              </h2>
              <p className="text-lg text-muted-foreground">
                Contacta con nosotros hoy mismo y descubre cómo podemos ayudarte
                a encontrar la residencia perfecta
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() => navigate("/contacto")}
                >
                  Contactar Ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/buscar")}
                >
                  Buscar Residencias
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

export default Services;
