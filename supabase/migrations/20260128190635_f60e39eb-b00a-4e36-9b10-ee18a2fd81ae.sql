-- Add is_featured column to news_articles for pinned/highlighted articles
ALTER TABLE public.news_articles 
ADD COLUMN is_featured boolean DEFAULT false;

-- Add event date columns for event-type articles (courses, workshops, etc.)
ALTER TABLE public.news_articles 
ADD COLUMN event_start_date timestamp with time zone,
ADD COLUMN event_end_date timestamp with time zone;

-- Create an index for faster featured articles lookup
CREATE INDEX idx_news_articles_featured ON public.news_articles(is_featured) WHERE is_featured = true;