-- Add staff_ratio field for personnel ratio information
ALTER TABLE public.residences
ADD COLUMN staff_ratio JSONB DEFAULT NULL;

-- Update La Estancia with the staff ratio data
UPDATE public.residences
SET staff_ratio = '{
  "ratio": "7/10",
  "description": "7 profesionales cada 10 residentes",
  "categories": [
    "Trabajador social",
    "Director Técnico",
    "Profesionales",
    "Cuidadores",
    "Gerente/Encargados",
    "Cocineros"
  ]
}'::jsonb
WHERE name = 'La Estancia';