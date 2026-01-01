import { useState, useRef } from 'react';
import { Plus, X, Loader2, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStorageUpload } from '@/hooks/useStorageUpload';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface GalleryUploaderProps {
  folder: string;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function GalleryUploader({
  folder,
  images,
  onChange,
  maxImages = 50
}: GalleryUploaderProps) {
  const { uploadFile, uploading } = useStorageUpload();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots === 0) {
      toast.error(`Ya tienes el máximo de ${maxImages} imágenes`);
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      toast.warning(`Solo se subirán ${remainingSlots} imágenes (límite: ${maxImages})`);
    }

    setIsUploading(true);
    setUploadProgress({ current: 0, total: filesToUpload.length });

    const newImages: string[] = [];
    
    for (let i = 0; i < filesToUpload.length; i++) {
      setUploadProgress({ current: i + 1, total: filesToUpload.length });
      const url = await uploadFile(filesToUpload[i], 'residence-images', folder);
      if (url) {
        newImages.push(url);
      }
    }
    
    if (newImages.length > 0) {
      onChange([...images, ...newImages]);
      toast.success(`${newImages.length} imagen${newImages.length > 1 ? 'es subidas' : ' subida'} correctamente`);
    }
    
    setIsUploading(false);
    setUploadProgress({ current: 0, total: 0 });
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted group"
          >
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </div>
          </div>
        ))}
        
        {isUploading && (
          <div className="aspect-video rounded-lg border-2 border-dashed border-primary bg-muted/50 flex flex-col items-center justify-center gap-2 p-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground text-center">
              Subiendo {uploadProgress.current}/{uploadProgress.total}
            </span>
          </div>
        )}
        
        {canAddMore && !isUploading && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-video rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ImagePlus className="h-8 w-8" />
            <span className="text-sm">Agregar</span>
            <span className="text-xs opacity-70">Múltiples</span>
          </button>
        )}
      </div>
      
      {isUploading && uploadProgress.total > 1 && (
        <Progress value={(uploadProgress.current / uploadProgress.total) * 100} className="h-2" />
      )}
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
      
      <p className="text-sm text-muted-foreground">
        {images.length} de {maxImages} imágenes. La primera imagen será la principal. 
        <span className="text-primary ml-1">Puedes seleccionar varias a la vez.</span>
      </p>
    </div>
  );
}
