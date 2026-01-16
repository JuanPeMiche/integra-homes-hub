-- Add video_urls column to residences table for presentation videos
ALTER TABLE public.residences 
ADD COLUMN video_urls TEXT[] DEFAULT '{}'::text[];