import { useState, useRef } from 'react';
import { Upload, X, Loader2, Play, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStorageUpload } from '@/hooks/useStorageUpload';
import { toast } from 'sonner';

interface VideoUploaderProps {
  folder: string;
  videos: string[];
  onChange: (urls: string[]) => void;
  maxVideos?: number;
}

const MAX_VIDEO_SIZE_MB = 180; // ~3 minutes at decent quality
const MAX_VIDEO_DURATION_SECONDS = 180; // 3 minutes

export function VideoUploader({
  folder,
  videos,
  onChange,
  maxVideos = 5
}: VideoUploaderProps) {
  const { uploadFile, uploading } = useStorageUpload();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const validateVideo = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check file size
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_VIDEO_SIZE_MB) {
        toast.error(`El video es muy grande (${sizeMB.toFixed(1)}MB). Máximo permitido: ${MAX_VIDEO_SIZE_MB}MB`);
        resolve(false);
        return;
      }

      // Check duration using video element
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > MAX_VIDEO_DURATION_SECONDS) {
          toast.error(`El video es muy largo (${Math.round(video.duration / 60)} min). Máximo permitido: 3 minutos`);
          resolve(false);
        } else {
          resolve(true);
        }
      };
      video.onerror = () => {
        toast.error('Error al leer el video. Asegurate de que sea un formato válido.');
        resolve(false);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (videos.length >= maxVideos) {
      toast.warning(`Máximo ${maxVideos} videos permitidos`);
      return;
    }

    // Validate video
    const isValid = await validateVideo(file);
    if (!isValid) {
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setUploadingIndex(videos.length);
    
    const url = await uploadFile(file, 'residence-videos', folder);
    
    if (url) {
      onChange([...videos, url]);
      toast.success('Video subido correctamente');
    }
    
    setUploadingIndex(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    onChange(newVideos);
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/mov,video/quicktime"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading || videos.length >= maxVideos}
      />

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((videoUrl, idx) => (
          <div 
            key={idx} 
            className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted group"
          >
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <Video className="w-3 h-3" />
              Video {idx + 1}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(idx)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Upload Button */}
        {videos.length < maxVideos && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-video w-full rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
          >
            {uploadingIndex !== null ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-sm">Subiendo video...</span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8" />
                <span className="text-sm">Agregar video</span>
                <span className="text-xs text-muted-foreground">MP4, WebM, MOV (máx 3 min)</span>
              </>
            )}
          </button>
        )}
      </div>

      {videos.length >= maxVideos && (
        <p className="text-sm text-muted-foreground text-center">
          Has alcanzado el límite de {maxVideos} videos
        </p>
      )}
    </div>
  );
}
