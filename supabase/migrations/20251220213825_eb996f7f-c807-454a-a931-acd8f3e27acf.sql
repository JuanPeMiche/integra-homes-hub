-- Create convenios table
CREATE TABLE public.convenios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  main_benefit TEXT NOT NULL,
  details TEXT,
  conditions TEXT,
  logo_url TEXT,
  secondary_logo_url TEXT,
  cta_label TEXT DEFAULT 'Consultar',
  cta_link TEXT DEFAULT '/contacto',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.convenios ENABLE ROW LEVEL SECURITY;

-- Public can view active convenios
CREATE POLICY "Convenios are publicly viewable" 
ON public.convenios 
FOR SELECT 
USING (is_active = true);

-- Admins can manage all convenios
CREATE POLICY "Admins can manage convenios" 
ON public.convenios 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_convenios_updated_at
BEFORE UPDATE ON public.convenios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial convenios data
INSERT INTO public.convenios (name, main_benefit, details, conditions, logo_url, display_order) VALUES
('Tienda Inglesa', '10% de descuento en góndolas (todos los productos)', 'Descuento directo en compras en Tienda Inglesa.', 'Aplicable con la tarjeta de Tienda Inglesa provista por Integra / la Red.', NULL, 1),
('Macro Mercado', 'Mejor descuento por unidad (no requiere comprar 6 o 12)', 'Ahorro inmediato sin compra mínima.', 'El precio con descuento aplica desde 1 unidad.', NULL, 2),
('SUMUM + Hospital Británico', '40% de descuento en la cuota mensual del plan', 'Beneficio mensual con condiciones de afiliación/plan.', 'Plan asociado a SUMUM e internación en el Hospital Británico.', NULL, 3),
('Pañales IndaSlip', 'Pañales europeos premium a mitad de precio vs farmacia', 'IndaSlip — alta calidad con ahorro significativo.', 'Compra directa de fábrica en España.', NULL, 4);