import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Play, Link2, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NewsArticle } from "@/hooks/useNewsArticles";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\s]+)/);
  return match ? match[1] : null;
};

const categoryColors: Record<string, string> = {
  "Entrevistas": "bg-primary/10 text-primary border-primary/20",
  "Eventos": "bg-secondary/10 text-secondary border-secondary/20",
  "Convenios": "bg-accent text-accent-foreground border-accent",
  "Salud": "bg-trust/10 text-trust border-trust/20",
  "Formación": "bg-muted text-muted-foreground border-muted",
  "Institucional": "bg-primary/10 text-primary border-primary/20",
  "Capacitación": "bg-secondary text-secondary-foreground border-secondary",
  "En los medios": "bg-secondary/10 text-secondary border-secondary/20",
};


const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setArticle(data as NewsArticle);
        // Update document title
        document.title = `${data.title} | Integra Residenciales`;
        // Update OG meta tags client-side (limited but useful for some crawlers)
        updateMetaTags(data as NewsArticle);
      }
      setLoading(false);
    };

    fetchArticle();

    return () => {
      document.title = "Integra Residenciales";
    };
  }, [slug]);

  const updateMetaTags = (article: NewsArticle) => {
    const setMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? "name" : "property";
      let el = document.querySelector(`meta[${attr}="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const articleUrl = `${window.location.origin}/noticias/${article.slug}`;
    const image = article.image_url || `${window.location.origin}/og-image.png`;
    const description = article.excerpt || article.content.substring(0, 160);

    setMeta("og:title", article.title);
    setMeta("og:description", description);
    setMeta("og:image", image);
    setMeta("og:url", articleUrl);
    setMeta("og:type", "article");
    setMeta("og:site_name", "Integra Residenciales Uruguay");
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:title", article.title, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:image", image, true);
  };

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "d 'de' MMMM, yyyy", { locale: es });
    } catch {
      return "";
    }
  };

  const articleUrl = article ? `${window.location.origin}/noticias/${article.slug}` : "";


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      toast.success("¡Enlace copiado al portapapeles!");
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = articleUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast.success("¡Enlace copiado al portapapeles!");
    }
  };

  if (loading) {
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

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <p className="text-lg text-muted-foreground">La noticia que buscás no existe o fue eliminada.</p>
            <Button onClick={() => navigate("/noticias")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Ver todas las noticias
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero image */}
        {article.image_url && (
          <div className="relative h-64 md:h-96 overflow-hidden bg-muted">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <article className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Back button */}
            <Button
              variant="ghost"
              className="gap-2 mb-6 text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/noticias")}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a noticias
            </Button>

            {/* Category + date */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {article.category && (
                <Badge className={`${categoryColors[article.category] || categoryColors["Formación"]} border rounded-full px-3 py-1 text-xs font-medium`}>
                  {article.category}
                </Badge>
              )}
              {article.is_featured && (
                <Badge className="bg-secondary text-secondary-foreground border-secondary rounded-full px-3 py-1 text-xs font-semibold">
                  Destacado
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              {article.published_at && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.published_at)}</span>
                </div>
              )}
              {article.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            {/* Video player */}
            {article.video_url && (
              <div className="mb-8">
                {article.video_source === 'upload' ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <video src={article.video_url} controls className="w-full h-full" preload="metadata" />
                  </div>
                ) : (article.video_source === 'YouTube' || getYouTubeVideoId(article.video_url)) ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(article.video_url)}`}
                      title={article.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : null}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none text-foreground">
              {article.content.split('\n').map((paragraph, i) => (
                paragraph.trim() ? <p key={i} className="mb-4 leading-relaxed">{paragraph}</p> : null
              ))}
            </div>

            {/* External link */}
            {article.external_link && (
              <div className="mt-6">
                <a
                  href={article.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver fuente original
                </a>
              </div>
            )}

            {/* Gallery */}
            {article.images && article.images.length > 0 && (
              <div className="mt-8 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Galería</h3>
                <div className="grid grid-cols-2 gap-3">
                  {article.images.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={img}
                        alt={`${article.title} - Imagen ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        loading="lazy"
                        onClick={() => window.open(img, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share section */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">¿Te pareció útil? Compartilo</h3>
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="gap-2"
                aria-label="Copiar enlace del artículo"
              >
                <Link2 className="h-5 w-5" />
                Copiar enlace
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
