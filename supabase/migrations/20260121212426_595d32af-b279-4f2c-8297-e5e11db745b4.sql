-- Add new certification fields for MSP and MIDES
ALTER TABLE public.residences 
ADD COLUMN IF NOT EXISTS msp_certification character varying DEFAULT 'Habilitado',
ADD COLUMN IF NOT EXISTS mides_certification character varying DEFAULT 'Habilitado';

-- Update fire_certification default to 'Habilitado'
ALTER TABLE public.residences 
ALTER COLUMN fire_certification SET DEFAULT 'Habilitado';

-- Update all existing residences to have default 'Habilitado' values
UPDATE public.residences 
SET msp_certification = 'Habilitado',
    mides_certification = 'Habilitado',
    fire_certification = COALESCE(fire_certification, 'Habilitado')
WHERE msp_certification IS NULL OR mides_certification IS NULL;