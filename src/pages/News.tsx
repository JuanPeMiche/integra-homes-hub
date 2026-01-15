import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, ExternalLink, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  image: string;
  externalLink?: string;
}

interface Interview {
  id: string;
  title: string;
  source: "YouTube" | "X";
  url: string;
  thumbnail: string;
}

const interviews: Interview[] = [
  {
    id: "int-1",
    title: "Entrevista Integra Residenciales - Cuidados de larga duración",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=KDHvTFm_AzY",
    thumbnail: "https://img.youtube.com/vi/KDHvTFm_AzY/maxresdefault.jpg",
  },
  {
    id: "int-2",
    title: "Atención a personas mayores en Uruguay",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=b3af__NQl3E",
    thumbnail: "https://img.youtube.com/vi/b3af__NQl3E/maxresdefault.jpg",
  },
  {
    id: "int-3",
    title: "Políticas de cuidado y bienestar",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=8imgQj_0cxk",
    thumbnail: "https://img.youtube.com/vi/8imgQj_0cxk/maxresdefault.jpg",
  },
  {
    id: "int-4",
    title: "Nuevas tendencias en residencias para mayores",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=If3caBEtoMQ",
    thumbnail: "https://img.youtube.com/vi/If3caBEtoMQ/maxresdefault.jpg",
  },
  {
    id: "int-5",
    title: "Entrevista Radio Sarandí - Integra Residenciales",
    source: "X",
    url: "https://x.com/radiosarandi690/status/1814264894151152094",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
  },
  {
    id: "int-6",
    title: "Perspectivas del sector de cuidados",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=fJqTdwHWB5k",
    thumbnail: "https://img.youtube.com/vi/fJqTdwHWB5k/maxresdefault.jpg",
  },
];

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Palabras Mayores Uruguay - Temporada 3: Entrevista a Sabino Montenegro y Martín Felípez",
    date: "31 de Julio, 2024",
    category: "Entrevistas",
    author: "Integra Residenciales",
    excerpt: "Nuestro presidente Sabino Montenegro y el Dr. Martín Felípez participan en el programa 'Palabras Mayores Uruguay' discutiendo temas fundamentales sobre el cuidado de personas mayores y la nueva longevidad.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
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

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;

// Helper to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
};

const News = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  const categoryColors: Record<string, string> = {
    "Entrevistas": "bg-primary/10 text-primary border-primary/20",
    "Eventos": "bg-secondary/10 text-secondary border-secondary/20",
    "Convenios": "bg-accent text-accent-foreground border-accent",
    "Salud": "bg-trust/10 text-trust border-trust/20",
    "Formación": "bg-muted text-muted-foreground border-muted",
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, newsArticles.length));
  };

  const handleArticleClick = (article: NewsArticle) => {
    if (article.externalLink) {
      window.open(article.externalLink, "_blank", "noopener,noreferrer");
    } else {
      // For now, show a toast - in future can navigate to /noticias/[id]
      toast.info("Próximamente: Detalle de artículo", {
        description: article.title,
      });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor ingresá tu email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor ingresá un email válido");
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call - in production this would call an actual endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("¡Gracias por suscribirte!", {
        description: "Te enviaremos las últimas novedades a tu correo.",
      });
      setEmail("");
    } catch (error) {
      toast.error("Error al suscribirse", {
        description: "Por favor intentá nuevamente.",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1559209172-8b9c41679187?w=800&q=80";
  };

  const handleInterviewThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80";
  };

  const handleInterviewClick = (interview: Interview) => {
    if (interview.source === "YouTube") {
      setSelectedInterview(interview);
    } else {
      // X (Twitter) - open in new tab
      window.open(interview.url, "_blank", "noopener,noreferrer");
    }
  };

  const visibleArticles = newsArticles.slice(0, visibleCount);
  const hasMore = visibleCount < newsArticles.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
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
                {visibleArticles.map((article, index) => (
                  <Card 
                    key={article.id} 
                    className="overflow-hidden hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(index * 50, 200)}ms` }}
                    onClick={() => handleArticleClick(article)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleArticleClick(article)}
                    role="article"
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={handleImageError}
                        loading="lazy"
                      />
                      <Badge 
                        className={`absolute top-4 left-4 ${categoryColors[article.category] || categoryColors["Formación"]} border rounded-full px-3 py-1 text-xs font-medium`}
                      >
                        {article.category}
                      </Badge>
                      {article.externalLink && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span className="truncate max-w-[120px]">{article.author}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        className="gap-2 group-hover:gap-3 transition-all p-0 h-auto text-primary hover:text-primary hover:bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArticleClick(article);
                        }}
                      >
                        Leer más
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={handleLoadMore}
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Cargar más noticias
                  </Button>
                </div>
              )}

              {!hasMore && visibleCount > INITIAL_COUNT && (
                <p className="text-center text-muted-foreground mt-8">
                  Has visto todas las noticias
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Interviews Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 rounded-full px-4 py-1">
                  <Play className="h-4 w-4 mr-2" />
                  Multimedia
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Entrevistas
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Conocé más sobre nuestra labor a través de entrevistas en medios de comunicación
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews.map((interview, index) => (
                  <Card 
                    key={interview.id}
                    className="overflow-hidden hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(index * 50, 200)}ms` }}
                    onClick={() => handleInterviewClick(interview)}
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={interview.thumbnail}
                        alt={interview.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={handleInterviewThumbnailError}
                        loading="lazy"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-primary fill-primary ml-1" />
                        </div>
                      </div>
                      {/* Source badge */}
                      <Badge 
                        className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium ${
                          interview.source === "YouTube" 
                            ? "bg-red-500 text-white border-red-600" 
                            : "bg-gray-900 text-white border-gray-800"
                        }`}
                      >
                        {interview.source}
                      </Badge>
                      {interview.source === "X" && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-3">
                        {interview.title}
                      </h3>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInterviewClick(interview);
                        }}
                      >
                        <Play className="h-4 w-4" />
                        Ver entrevista
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold">
                Suscribite a nuestro boletín
              </h2>
              <p className="text-xl text-primary-foreground/90">
                Recibí las últimas noticias y artículos sobre cuidado de personas mayores 
                directamente en tu correo
              </p>
              <form 
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white"
                  disabled={isSubscribing}
                  aria-label="Email para suscripción"
                />
                <Button 
                  type="submit"
                  size="lg" 
                  variant="secondary"
                  disabled={isSubscribing}
                  className="min-w-[140px]"
                >
                  {isSubscribing ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      Enviando...
                    </span>
                  ) : (
                    "Suscribirse"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* YouTube Video Modal */}
      <Dialog open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="pr-8 line-clamp-1">
              {selectedInterview?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedInterview && selectedInterview.source === "YouTube" && (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedInterview.url)}?autoplay=1`}
                title={selectedInterview.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default News;
