-- Create news_articles table
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can manage news articles"
ON public.news_articles
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Published articles are publicly viewable"
ON public.news_articles
FOR SELECT
USING (is_published = true);

-- Trigger for updated_at
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Storage policies
CREATE POLICY "Article images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Admins can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'article-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update article images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'article-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete article images"
ON storage.objects FOR DELETE
USING (bucket_id = 'article-images' AND has_role(auth.uid(), 'admin'::app_role));