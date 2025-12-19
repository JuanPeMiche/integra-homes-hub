-- Create residences table to store all residence data
CREATE TABLE public.residences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('publica', 'privada', 'concertada')),
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  address TEXT NOT NULL,
  price INTEGER DEFAULT 0,
  price_range TEXT DEFAULT 'Consultar',
  capacity INTEGER DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 0,
  transparency INTEGER DEFAULT 0 CHECK (transparency >= 0 AND transparency <= 5),
  image TEXT,
  images TEXT[] DEFAULT '{}',
  description TEXT,
  services TEXT[] DEFAULT '{}',
  facilities TEXT[] DEFAULT '{}',
  coordinates_lat NUMERIC(10,7),
  coordinates_lng NUMERIC(10,7),
  phone TEXT,
  email TEXT,
  schedule TEXT,
  red_integra BOOLEAN DEFAULT false,
  website TEXT,
  facebook TEXT,
  instagram TEXT,
  whatsapp TEXT,
  stay_types TEXT[] DEFAULT '{}',
  admissions TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  logo_url TEXT,
  maps_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create directors table for residence directors/team
CREATE TABLE public.residence_directors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  residence_id UUID NOT NULL REFERENCES public.residences(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  photo_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.residences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.residence_directors ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (residences are public info)
CREATE POLICY "Residences are publicly viewable"
  ON public.residences
  FOR SELECT
  USING (true);

CREATE POLICY "Directors are publicly viewable"
  ON public.residence_directors
  FOR SELECT
  USING (true);

-- Only admins can manage residences
CREATE POLICY "Admins can manage residences"
  ON public.residences
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage directors"
  ON public.residence_directors
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create index for common queries
CREATE INDEX idx_residences_province ON public.residences(province);
CREATE INDEX idx_residences_city ON public.residences(city);
CREATE INDEX idx_residences_red_integra ON public.residences(red_integra);
CREATE INDEX idx_residence_directors_residence ON public.residence_directors(residence_id);

-- Trigger for updated_at
CREATE TRIGGER update_residences_updated_at
  BEFORE UPDATE ON public.residences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();