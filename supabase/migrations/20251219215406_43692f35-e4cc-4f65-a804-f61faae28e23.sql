-- Create storage bucket for residence logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('residence-logos', 'residence-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for residence gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('residence-images', 'residence-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for director photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('director-photos', 'director-photos', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for residence-logos bucket
CREATE POLICY "Logos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'residence-logos');

CREATE POLICY "Admins can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'residence-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'residence-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'residence-logos' AND public.has_role(auth.uid(), 'admin'));

-- RLS policies for residence-images bucket
CREATE POLICY "Gallery images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'residence-images');

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'residence-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'residence-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'residence-images' AND public.has_role(auth.uid(), 'admin'));

-- RLS policies for director-photos bucket
CREATE POLICY "Director photos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'director-photos');

CREATE POLICY "Admins can upload director photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'director-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update director photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'director-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete director photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'director-photos' AND public.has_role(auth.uid(), 'admin'));