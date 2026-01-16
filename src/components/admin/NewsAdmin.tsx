import { useState } from "react";
import { useNewsArticles, NewsArticle } from "@/hooks/useNewsArticles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { ImageUploader } from "@/components/ImageUploader";
import { Plus, Pencil, Trash2, Eye, EyeOff, Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ArticleFormData {
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  is_published: boolean;
}

const emptyFormData: ArticleFormData = {
  title: "",
  excerpt: "",
  content: "",
  image_url: "",
  author: "",
  is_published: false,
};

export const NewsAdmin = () => {
  const { articles, isLoading, createArticle, updateArticle, deleteArticle, togglePublish } = useNewsArticles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>(emptyFormData);

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData(emptyFormData);
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
          published_at: formData.is_published && !editingArticle.is_published
            ? new Date().toISOString()
            : editingArticle.published_at,
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
        published_at: formData.is_published ? new Date().toISOString() : null,
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Noticias y Artículos</h2>
          <p className="text-muted-foreground">Gestiona las noticias y artículos del sitio</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Artículo
        </Button>
      </div>

      {articles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No hay artículos creados</p>
            <Button onClick={handleOpenCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Crear primer artículo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
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
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg truncate">{article.title}</h3>
                        <Badge variant={article.is_published ? "default" : "secondary"}>
                          {article.is_published ? "Publicado" : "Borrador"}
                        </Badge>
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
                            <AlertDialogTitle>¿Eliminar artículo?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El artículo "{article.title}" será eliminado permanentemente.
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
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? "Editar Artículo" : "Nuevo Artículo"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título del artículo"
              />
            </div>

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
              <Label htmlFor="excerpt">Extracto</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Breve descripción del artículo (se muestra en las tarjetas)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Contenido completo del artículo"
                rows={10}
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
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="is_published">Publicar artículo</Label>
                <p className="text-sm text-muted-foreground">
                  Los artículos publicados son visibles en el sitio
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
              disabled={!formData.title.trim() || !formData.content.trim() || createArticle.isPending || updateArticle.isPending}
            >
              {(createArticle.isPending || updateArticle.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {editingArticle ? "Guardar cambios" : "Crear artículo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
