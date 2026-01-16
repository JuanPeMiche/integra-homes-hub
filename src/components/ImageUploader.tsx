import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStorageUpload } from '@/hooks/useStorageUpload';

interface ImageUploaderProps {
  bucket: 'residence-logos' | 'residence-images' | 'director-photos' | 'convenio-logos' | 'team-photos' | 'article-images';
  folder: string;
  currentImage?: string | null;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  accept?: string;
  label?: string;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}

export function ImageUploader({
  bucket,
  folder,
  currentImage,
  onUpload,
  onRemove,
  accept = 'image/*',
  label = 'Subir imagen',
  className = '',
  aspectRatio = 'landscape'
}: ImageUploaderProps) {
  const { uploadFile, uploading } = useStorageUpload();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    const url = await uploadFile(file, bucket, folder);
    if (url) {
      onUpload(url);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onRemove?.();
  };

  const aspectClass = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]'
  }[aspectRatio];

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
      
      {preview ? (
        <div className={`relative ${aspectClass} rounded-lg overflow-hidden border border-border bg-muted`}>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {!uploading && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`${aspectClass} w-full rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <>
              <Upload className="h-8 w-8" />
              <span className="text-sm">{label}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
