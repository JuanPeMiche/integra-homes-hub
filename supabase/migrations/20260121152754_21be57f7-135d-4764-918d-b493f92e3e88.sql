-- Add emails array column for multiple emails support
ALTER TABLE public.residences ADD COLUMN IF NOT EXISTS emails text[] DEFAULT '{}'::text[];