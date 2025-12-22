-- Create table for team members (directiva)
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  photo_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Public can view active team members
CREATE POLICY "Team members are publicly viewable"
ON public.team_members
FOR SELECT
USING (is_active = true);

-- Only admins can manage team members
CREATE POLICY "Admins can manage team members"
ON public.team_members
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Insert initial team members
INSERT INTO public.team_members (name, role, display_order) VALUES
  ('Angela Agriel', 'Presidente', 1),
  ('Cesar Raymondo', 'Vicepresidente', 2),
  ('Sabino Montenegro', 'Secretario', 3),
  ('Julieta López', 'Tesorera', 4),
  ('Gabriela Martínez', 'Vocal', 5);