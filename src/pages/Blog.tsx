import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: "1",
    title: "Cómo Elegir la Residencia Adecuada para tu Familiar",
    excerpt:
      "Descubre los factores clave que debes considerar al buscar una residencia de mayores. Te ayudamos a tomar la mejor decisión.",
    image: "https://images.unsplash.com/photo-1559209172-8b9c41679187?w=800&q=80",
    date: "15 de Noviembre, 2024",
    category: "Consejos",
  },
  {
    id: "2",
    title: "Los Beneficios de la Terapia Ocupacional en Residencias",
    excerpt:
      "La terapia ocupacional mejora significativamente la calidad de vida de los residentes. Conoce todos sus beneficios.",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    date: "10 de Noviembre, 2024",
    category: "Salud",
  },
  {
    id: "3",
    title: "Adaptando el Hogar: Consejos de Accesibilidad",
    excerpt:
      "Si decides que tu familiar permanezca en casa, estos consejos de accesibilidad te serán de gran ayuda.",
    image: "https://images.unsplash.com/photo-1584622781867-b0bc5362a709?w=800&q=80",
    date: "5 de Noviembre, 2024",
    category: "Hogar",
  },
  {
    id: "4",
    title: "La Importancia de las Actividades Recreativas",
    excerpt:
      "Las actividades recreativas son fundamentales para mantener activa la mente y el cuerpo de nuestros mayores.",
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80",
    date: "1 de Noviembre, 2024",
    category: "Bienestar",
  },
];

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Consejos, noticias y recursos útiles sobre el cuidado de personas
              mayores
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-soft transition-shadow cursor-pointer"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" className="gap-2 p-0 h-auto">
                      Leer más
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
