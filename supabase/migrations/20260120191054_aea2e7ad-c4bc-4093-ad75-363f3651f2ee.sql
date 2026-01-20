-- Add fire department certification field and visibility toggle to residences
ALTER TABLE public.residences 
ADD COLUMN IF NOT EXISTS fire_certification VARCHAR(50) DEFAULT NULL;

-- Add comment explaining the field
COMMENT ON COLUMN public.residences.fire_certification IS 'Fire department certification/permit ID (habilitación de bomberos)';

-- Add is_hidden field to allow hiding residences from public view
ALTER TABLE public.residences 
ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT FALSE;

-- Add comment explaining the field
COMMENT ON COLUMN public.residences.is_hidden IS 'If true, the residence is hidden from public listings';