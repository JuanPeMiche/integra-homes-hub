-- Add array columns for multiple phones, whatsapps, addresses and cities
ALTER TABLE public.residences 
ADD COLUMN phones text[] DEFAULT '{}',
ADD COLUMN whatsapps text[] DEFAULT '{}',
ADD COLUMN addresses text[] DEFAULT '{}',
ADD COLUMN cities text[] DEFAULT '{}';