-- Create commission_members table
CREATE TABLE public.commission_members (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    commission_type TEXT NOT NULL CHECK (commission_type IN ('fiscal', 'etica')),
    name TEXT NOT NULL,
    role TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.commission_members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage commission members" 
ON public.commission_members 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Commission members are publicly viewable" 
ON public.commission_members 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_commission_members_updated_at
BEFORE UPDATE ON public.commission_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data for Comisión fiscal
INSERT INTO public.commission_members (commission_type, name, role, display_order) VALUES
('fiscal', 'Gerardo Pilatti', 'presidente', 1),
('fiscal', 'María José Pintos', NULL, 2),
('fiscal', 'Liliana Massei', NULL, 3);

-- Insert initial data for Comisión de ética
INSERT INTO public.commission_members (commission_type, name, role, display_order) VALUES
('etica', 'Claudia Hernández', NULL, 1),
('etica', 'Mariana López', NULL, 2),
('etica', 'Raquel Silva', NULL, 3),
('etica', 'Sandra Berlín', NULL, 4);