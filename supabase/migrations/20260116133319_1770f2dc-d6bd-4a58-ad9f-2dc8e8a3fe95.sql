-- Create storage bucket for residence videos
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('residence-videos', 'residence-videos', true, 188743680)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public can view residence videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'residence-videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload residence videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'residence-videos' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete videos
CREATE POLICY "Authenticated users can delete residence videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'residence-videos' AND auth.role() = 'authenticated');

-- Allow authenticated users to update videos
CREATE POLICY "Authenticated users can update residence videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'residence-videos' AND auth.role() = 'authenticated');