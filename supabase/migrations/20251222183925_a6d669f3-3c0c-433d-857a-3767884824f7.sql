-- Add activities column to residences table
ALTER TABLE public.residences 
ADD COLUMN activities text[] DEFAULT '{}'::text[];