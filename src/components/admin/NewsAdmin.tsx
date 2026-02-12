import { useState } from "react";
import { useNewsArticles, NewsArticle } from "@/hooks/useNewsArticles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploader } from "@/components/ImageUploader";
import { GalleryUploader } from "@/components/GalleryUploader";
import { Plus, Pencil, Trash2, Eye, EyeOff, Calendar, Loader2, Newspaper, Video, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ArticleFormData {
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  is_published: boolean;
  is_featured: boolean;
  article_type: string;
  category: string;
  external_link: string;
  video_url: string;
  video_source: string;
  event_start_date: string;
  event_end_date: string;
  images: string[];
}

const emptyFormData: ArticleFormData = {
  title: "",
  excerpt: "",
  content: "",
  image_url: "",
  author: "",
  is_published: false,
  is_featured: false,
  article_type: "article",
  category: "",
  external_link: "",
  video_url: "",
  video_source: "YouTube",
  event_start_date: "",
  event_end_date: "",
  images: [],
};

const categories = ["Entrevistas", "Eventos", "Convenios", "Salud", "Formación", "Institucional"];

export const NewsAdmin = () => {
  const { articles, isLoading, createArticle, updateArticle, deleteArticle, togglePublish } = useNewsArticles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>(emptyFormData);
  const [activeTab, setActiveTab] = useState<string>("article");

  const filteredArticles = articles.filter(a => a.article_type === activeTab);

  const handleOpenCreate = (type: string) => {
    setEditingArticle(null);
    setFormData({
      ...emptyFormData,
      article_type: type,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt || "",
      content: article.content,
      image_url: article.image_url || "",
      author: article.author || "",
      is_published: article.is_published,
      is_featured: article.is_featured || false,
      article_type: article.article_type,
      category: article.category || "",
      external_link: article.external_link || "",
      video_url: article.video_url || "",
      video_source: article.video_source || "YouTube",
      event_start_date: article.event_start_date || "",
      event_end_date: article.event_end_date || "",
      images: article.images || [],
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editingArticle) {
      await updateArticle.mutateAsync({
        id: editingArticle.id,
        updates: {
          title: formData.title,
          excerpt: formData.excerpt || null,
          content: formData.content,
          image_url: formData.image_url || null,
          author: formData.author || null,
          is_published: formData.is_published,
          is_featured: formData.is_featured,
          published_at: formData.is_published && !editingArticle.is_published
            ? new Date().toISOString()
            : editingArticle.published_at,
          article_type: formData.article_type,
          category: formData.category || null,
          external_link: formData.external_link || null,
          video_url: formData.video_url || null,
          video_source: formData.video_source || null,
          event_start_date: formData.event_start_date || null,
          event_end_date: formData.event_end_date || null,
          images: formData.images.length > 0 ? formData.images : null,
        },
      });
    } else {
      await createArticle.mutateAsync({
        title: formData.title,
        excerpt: formData.excerpt || null,
        content: formData.content,
        image_url: formData.image_url || null,
        author: formData.author || null,
        is_published: formData.is_published,
        is_featured: formData.is_featured,
        published_at: formData.is_published ? new Date().toISOString() : null,
        article_type: formData.article_type,
        category: formData.category || null,
        external_link: formData.external_link || null,
        video_url: formData.video_url || null,
        video_source: formData.video_source || null,
        event_start_date: formData.event_start_date || null,
        event_end_date: formData.event_end_date || null,
        images: formData.images.length > 0 ? formData.images : null,
      });
    }

    setIsDialogOpen(false);
    setEditingArticle(null);
    setFormData(emptyFormData);
  };

  const handleDelete = async (id: string) => {
    await deleteArticle.mutateAsync(id);
  };

  const handleTogglePublish = async (article: NewsArticle) => {
    await togglePublish.mutateAsync({
      id: article.id,
      isPublished: !article.is_published,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const renderArticleCard = (article: NewsArticle) => (
    <Card key={article.id} className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {article.image_url && (
          <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold text-lg truncate">{article.title}</h3>
                <Badge variant={article.is_published ? "default" : "secondary"}>
                  {article.is_published ? "Publicado" : "Borrador"}
                </Badge>
                {article.category && (
                  <Badge variant="outline">{article.category}</Badge>
                )}
                {article.video_source && (
                  <Badge variant="outline" className="gap-1">
                    <Video className="h-3 w-3" />
                    {article.video_source}
                  </Badge>
                )}
                {article.external_link && (
                  <Badge variant="outline" className="gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Link externo
                  </Badge>
                )}
              </div>
              {article.excerpt && (
                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                  {article.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {article.author && <span>Por {article.author}</span>}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(article.created_at), "d MMM yyyy", { locale: es })}
                </span>
                {article.published_at && (
                  <span>
                    Publicado: {format(new Date(article.published_at), "d MMM yyyy", { locale: es })}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleTogglePublish(article)}
                title={article.is_published ? "Despublicar" : "Publicar"}
              >
                {article.is_published ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenEdit(article)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar {article.article_type === 'interview' ? 'entrevista' : 'artículo'}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. "{article.title}" será eliminado permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(article.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Noticias y Entrevistas</h2>
          <p className="text-muted-foreground">Gestiona las noticias, artículos y entrevistas del sitio</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <TabsList>
            <TabsTrigger value="article" className="gap-2">
              <Newspaper className="h-4 w-4" />
              Noticias/Artículos ({articles.filter(a => a.article_type === 'article').length})
            </TabsTrigger>
            <TabsTrigger value="interview" className="gap-2">
              <Video className="h-4 w-4" />
              Entrevistas ({articles.filter(a => a.article_type === 'interview').length})
            </TabsTrigger>
          </TabsList>
          <Button onClick={() => handleOpenCreate(activeTab)}>
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === 'article' ? 'Nueva Noticia' : 'Nueva Entrevista'}
          </Button>
        </div>

        <TabsContent value="article" className="mt-6">
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No hay noticias/artículos creados</p>
                <Button onClick={() => handleOpenCreate('article')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primera noticia
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredArticles.map(renderArticleCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="interview" className="mt-6">
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No hay entrevistas creadas</p>
                <Button onClick={() => handleOpenCreate('interview')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primera entrevista
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredArticles.map(renderArticleCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle 
                ? `Editar ${formData.article_type === 'interview' ? 'Entrevista' : 'Noticia/Artículo'}` 
                : `Nueva ${formData.article_type === 'interview' ? 'Entrevista' : 'Noticia/Artículo'}`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título"
              />
            </div>

            {formData.article_type === 'article' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Autor</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Nombre del autor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="external_link">Link externo (opcional)</Label>
                  <Input
                    id="external_link"
                    value={formData.external_link}
                    onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
                    placeholder="https://..."
                  />
                  <p className="text-xs text-muted-foreground">Si se proporciona, "Leer más" abrirá este enlace</p>
                </div>
              </>
            )}

            {formData.article_type === 'interview' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="video_url">URL del video/enlace *</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://youtube.com/watch?v=... o https://x.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video_source">Fuente</Label>
                  <Select
                    value={formData.video_source}
                    onValueChange={(value) => setFormData({ ...formData, video_source: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="X">X (Twitter)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="excerpt">Extracto / Descripción breve</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Breve descripción (se muestra en las tarjetas)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido {formData.article_type === 'article' ? '*' : ''}</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={formData.article_type === 'article' ? "Contenido completo del artículo" : "Descripción de la entrevista"}
                rows={formData.article_type === 'article' ? 10 : 4}
              />
            </div>

            <div className="space-y-2">
              <Label>Imagen de portada</Label>
              <ImageUploader
                currentImage={formData.image_url}
                onUpload={(url) => setFormData({ ...formData, image_url: url })}
                onRemove={() => setFormData({ ...formData, image_url: "" })}
                bucket="article-images"
                folder="covers"
              />
              {formData.article_type === 'interview' && (
                <p className="text-xs text-muted-foreground">
                  Para videos de YouTube, si no subes imagen se usará la miniatura automática
                </p>
              )}
            </div>

            {formData.article_type === 'article' && (
              <div className="space-y-2">
                <Label>Galería de imágenes</Label>
                <GalleryUploader
                  folder={`articles/${editingArticle?.id || 'new'}`}
                  images={formData.images}
                  onChange={(images) => setFormData({ ...formData, images })}
                  maxImages={20}
                  bucket="article-images"
                />
              </div>
            )}

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="is_published">Publicar</Label>
                <p className="text-sm text-muted-foreground">
                  El contenido publicado es visible en el sitio
                </p>
              </div>
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.title.trim() || (formData.article_type === 'article' && !formData.content.trim()) || createArticle.isPending || updateArticle.isPending}
            >
              {(createArticle.isPending || updateArticle.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {editingArticle ? "Guardar cambios" : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
