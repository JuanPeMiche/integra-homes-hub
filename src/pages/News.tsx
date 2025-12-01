import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsArticles = [
  {
    id: "1",
    title: "Palabras Mayores Uruguay - Temporada 3: Entrevista a Sabino Montenegro y Martín Felípez",
    date: "31 de Julio, 2024",
    category: "Entrevistas",
    author: "Integra Residenciales",
    excerpt: "Nuestro presidente Sabino Montenegro y el Dr. Martín Felípez participan en el programa 'Palabras Mayores Uruguay' discutiendo temas fundamentales sobre el cuidado de personas mayores y la nueva longevidad.",
    image: "https://images.unsplash.com/photo-1559209172-8b9c41679187?w=800&q=80",
  },
  {
    id: "2",
    title: "Día Internacional del Adulto Mayor: Celebrando la experiencia y sabiduría",
    date: "1 de Octubre, 2023",
    category: "Eventos",
    author: "Integra Residenciales",
    excerpt: "Celebramos junto a todas las residencias de nuestra red el Día Internacional del Adulto Mayor, destacando la importancia del cuidado digno y humanizado de nuestros mayores.",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
  },
  {
    id: "3",
    title: "Convenio con el MIDES para fortalecer el sector de cuidados",
    date: "15 de Septiembre, 2023",
    category: "Convenios",
    author: "Integra Residenciales",
    excerpt: "Firmamos un importante convenio de cooperación con el Ministerio de Desarrollo Social para mejorar la calidad de los servicios de cuidados de larga estadía en Uruguay.",
    image: "https://images.unsplash.com/photo-1559209172-8b9c41679187?w=800&q=80",
  },
  {
    id: "4",
    title: "La importancia de la actividad física en la tercera edad",
    date: "10 de Agosto, 2023",
    category: "Salud",
    author: "Equipo Médico Integra",
    excerpt: "Descubrí cómo la actividad física regular contribuye al bienestar físico y emocional de las personas mayores, mejorando su calidad de vida y autonomía.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  },
  {
    id: "5",
    title: "Nutrición especializada: Un pilar fundamental del cuidado",
    date: "5 de Julio, 2023",
    category: "Salud",
    author: "Dpto. de Nutrición",
    excerpt: "La alimentación adecuada es esencial para mantener la salud de nuestros mayores. Conocé cómo nuestras residencias diseñan menús equilibrados y adaptados a cada necesidad.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  },
  {
    id: "6",
    title: "Jornada de capacitación sobre atención centrada en la persona",
    date: "20 de Junio, 2023",
    category: "Formación",
    author: "Integra Residenciales",
    excerpt: "Realizamos una jornada de capacitación para todo el personal de las residencias miembro, enfocada en el modelo de Atención Centrada en la Persona (ACP).",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
  },
];

const News = () => {
  const categoryColors: Record<string, string> = {
    "Entrevistas": "bg-primary text-primary-foreground",
    "Eventos": "bg-secondary text-secondary-foreground",
    "Convenios": "bg-accent text-accent-foreground",
    "Salud": "bg-trust text-trust-foreground",
    "Formación": "bg-muted text-muted-foreground",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Noticias y Artículos</h1>
              <p className="text-xl text-white/95 leading-relaxed">
                Mantente informado sobre las últimas novedades de Integra Residenciales 
                y el ámbito del cuidado de personas mayores en Uruguay
              </p>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-hover transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-4 left-4 ${categoryColors[article.category]}`}>
                        {article.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <Button variant="ghost" className="gap-2 group-hover:gap-3 transition-all p-0">
                        Leer más
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              <div className="flex justify-center mt-12">
                <Button size="lg" variant="outline">
                  Cargar más noticias
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Suscribite a nuestro boletín
              </h2>
              <p className="text-xl text-primary-foreground/90">
                Recibí las últimas noticias y artículos sobre cuidado de personas mayores 
                directamente en tu correo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-3 rounded-lg text-foreground"
                />
                <Button size="lg" variant="secondary">
                  Suscribirse
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

export default News;
