-- Add secondary_name field for additional location/branch name
ALTER TABLE public.residences 
ADD COLUMN secondary_name text;