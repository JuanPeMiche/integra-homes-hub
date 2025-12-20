-- Create storage bucket for convenio logos
INSERT INTO storage.buckets (id, name, public) VALUES ('convenio-logos', 'convenio-logos', true);

-- Storage policies for convenio logos
CREATE POLICY "Convenio logos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'convenio-logos');

CREATE POLICY "Admins can upload convenio logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'convenio-logos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update convenio logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'convenio-logos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete convenio logos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'convenio-logos' AND has_role(auth.uid(), 'admin'::app_role));