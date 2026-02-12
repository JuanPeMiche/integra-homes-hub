import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  author: string | null;
  is_published: boolean;
  is_featured: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  article_type: string;
  category: string | null;
  external_link: string | null;
  video_url: string | null;
  video_source: string | null;
  event_start_date: string | null;
  event_end_date: string | null;
  images: string[] | null;
}

export type NewsArticleInsert = Omit<NewsArticle, "id" | "created_at" | "updated_at">;
export type NewsArticleUpdate = Partial<NewsArticleInsert>;

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const useNewsArticles = (articleType?: 'article' | 'interview') => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["news-articles", articleType],
    queryFn: async () => {
      let query = supabase
        .from("news_articles")
        .select("*")
        .order("published_at", { ascending: false });

      if (articleType) {
        query = query.eq("article_type", articleType);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as NewsArticle[];
    },
  });

  const createArticle = useMutation({
    mutationFn: async (article: Omit<NewsArticleInsert, "slug">) => {
      const slug = generateSlug(article.title);
      const { data, error } = await supabase
        .from("news_articles")
        .insert({ ...article, slug })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-articles"] });
      toast({
        title: "Artículo creado",
        description: "El artículo se ha creado correctamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo crear el artículo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateArticle = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: NewsArticleUpdate }) => {
      const finalUpdates = { ...updates };
      if (updates.title) {
        finalUpdates.slug = generateSlug(updates.title);
      }

      const { data, error } = await supabase
        .from("news_articles")
        .update(finalUpdates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-articles"] });
      toast({
        title: "Artículo actualizado",
        description: "El artículo se ha actualizado correctamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo actualizar el artículo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteArticle = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("news_articles")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-articles"] });
      toast({
        title: "Artículo eliminado",
        description: "El artículo se ha eliminado correctamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo eliminar el artículo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const updates: NewsArticleUpdate = {
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
      };

      const { data, error } = await supabase
        .from("news_articles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["news-articles"] });
      toast({
        title: data.is_published ? "Artículo publicado" : "Artículo despublicado",
        description: data.is_published
          ? "El artículo ahora es visible públicamente."
          : "El artículo ya no es visible públicamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo cambiar el estado: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    articles,
    isLoading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    togglePublish,
  };
};
