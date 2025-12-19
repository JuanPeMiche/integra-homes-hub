import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type BucketType = 'residence-logos' | 'residence-images' | 'director-photos';

export function useStorageUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (
    file: File,
    bucket: BucketType,
    folder: string
  ): Promise<string | null> => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error('Error al subir el archivo: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (url: string, bucket: BucketType): Promise<boolean> => {
    try {
      const urlParts = url.split(`${bucket}/`);
      if (urlParts.length < 2) return false;
      
      const filePath = urlParts[1];
      
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast.error('Error al eliminar el archivo');
      return false;
    }
  };

  return { uploadFile, deleteFile, uploading };
}
