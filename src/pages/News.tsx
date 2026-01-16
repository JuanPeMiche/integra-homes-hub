import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, ExternalLink, Play, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewsArticles, NewsArticle } from "@/hooks/useNewsArticles";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;

// Helper to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
};

const News = () => {
  const { articles, isLoading } = useNewsArticles();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<NewsArticle | null>(null);

  // Filter published articles and interviews
  const newsArticles = articles.filter(a => a.article_type === 'article' && a.is_published);
  const interviews = articles.filter(a => a.article_type === 'interview' && a.is_published);

  const categoryColors: Record<string, string> = {
    "Entrevistas": "bg-primary/10 text-primary border-primary/20",
    "Eventos": "bg-secondary/10 text-secondary border-secondary/20",
    "Convenios": "bg-accent text-accent-foreground border-accent",
    "Salud": "bg-trust/10 text-trust border-trust/20",
    "Formación": "bg-muted text-muted-foreground border-muted",
    "Institucional": "bg-primary/10 text-primary border-primary/20",
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, newsArticles.length));
  };

  const handleArticleClick = (article: NewsArticle) => {
    if (article.external_link) {
      window.open(article.external_link, "_blank", "noopener,noreferrer");
    } else {
      // For now, show a toast - in future can navigate to /noticias/[slug]
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

  const handleInterviewClick = (interview: NewsArticle) => {
    if (interview.video_source === "YouTube" && interview.video_url) {
      setSelectedInterview(interview);
    } else if (interview.video_url) {
      // X (Twitter) or other - open in new tab
      window.open(interview.video_url, "_blank", "noopener,noreferrer");
    }
  };

  const getInterviewThumbnail = (interview: NewsArticle): string => {
    if (interview.image_url) return interview.image_url;
    if (interview.video_source === "YouTube" && interview.video_url) {
      const videoId = getYouTubeVideoId(interview.video_url);
      if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80";
  };

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "d 'de' MMMM, yyyy", { locale: es });
    } catch {
      return "";
    }
  };

  const visibleArticles = newsArticles.slice(0, visibleCount);
  const hasMore = visibleCount < newsArticles.length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

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
              {newsArticles.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No hay noticias publicadas aún.
                </div>
              ) : (
                <>
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
                            src={article.image_url || "https://images.unsplash.com/photo-1559209172-8b9c41679187?w=800&q=80"}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={handleImageError}
                            loading="lazy"
                          />
                          {article.category && (
                            <Badge 
                              className={`absolute top-4 left-4 ${categoryColors[article.category] || categoryColors["Formación"]} border rounded-full px-3 py-1 text-xs font-medium`}
                            >
                              {article.category}
                            </Badge>
                          )}
                          {article.external_link && (
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {article.published_at && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(article.published_at)}</span>
                              </div>
                            )}
                            {article.author && (
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span className="truncate max-w-[120px]">{article.author}</span>
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                            {article.excerpt || article.content}
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
                </>
              )}
            </div>
          </div>
        </section>

        {/* Interviews Section */}
        {interviews.length > 0 && (
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
                          src={getInterviewThumbnail(interview)}
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
                            interview.video_source === "YouTube" 
                              ? "bg-red-500 text-white border-red-600" 
                              : "bg-gray-900 text-white border-gray-800"
                          }`}
                        >
                          {interview.video_source}
                        </Badge>
                        {interview.video_source === "X" && (
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
        )}

        {/* Newsletter Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold">
                Suscribite a nuestro boletín
              </h2>
              <p className="text-lg opacity-90">
                Recibí las últimas novedades, consejos y noticias directamente en tu correo.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
                  disabled={isSubscribing}
                />
                <Button 
                  type="submit"
                  variant="secondary"
                  className="whitespace-nowrap"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Suscribirme"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal for YouTube */}
      <Dialog open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          <DialogHeader className="absolute top-2 right-2 z-10">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedInterview(null)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </DialogHeader>
          {selectedInterview?.video_url && (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedInterview.video_url)}?autoplay=1`}
                title={selectedInterview.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default News;
