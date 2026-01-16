-- Add article_type and additional fields to news_articles
ALTER TABLE public.news_articles 
ADD COLUMN article_type TEXT NOT NULL DEFAULT 'article',
ADD COLUMN category TEXT,
ADD COLUMN external_link TEXT,
ADD COLUMN video_url TEXT,
ADD COLUMN video_source TEXT;