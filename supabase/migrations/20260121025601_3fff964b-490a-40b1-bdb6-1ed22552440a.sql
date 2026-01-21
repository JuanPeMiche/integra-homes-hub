-- Create residence_menus table to store seasonal menus
CREATE TABLE public.residence_menus (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  residence_id UUID NOT NULL REFERENCES public.residences(id) ON DELETE CASCADE,
  season TEXT NOT NULL CHECK (season IN ('verano', 'invierno')),
  nota TEXT,
  menu_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(residence_id, season)
);

-- Enable RLS
ALTER TABLE public.residence_menus ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Menus are publicly viewable" 
ON public.residence_menus 
FOR SELECT 
USING (true);

-- Admin write access
CREATE POLICY "Admins can manage menus" 
ON public.residence_menus 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_residence_menus_updated_at
BEFORE UPDATE ON public.residence_menus
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();