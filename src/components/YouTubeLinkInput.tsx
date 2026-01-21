import { useState } from 'react';
import { Plus, X, Youtube, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface YouTubeLinkInputProps {
  links: string[];
  onChange: (links: string[]) => void;
  maxLinks?: number;
}

const isValidYouTubeUrl = (url: string): boolean => {
  const patterns = [
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]+/,
    /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]+/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]+/,
  ];
  return patterns.some(pattern => pattern.test(url));
};

const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const getYouTubeThumbnail = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }
  return null;
};

export function YouTubeLinkInput({
  links,
  onChange,
  maxLinks = 5
}: YouTubeLinkInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddLink = () => {
    const trimmedUrl = inputValue.trim();
    
    if (!trimmedUrl) {
      toast.error('Ingresa un link de YouTube');
      return;
    }

    if (!isValidYouTubeUrl(trimmedUrl)) {
      toast.error('El link no es válido. Debe ser un link de YouTube.');
      return;
    }

    if (links.includes(trimmedUrl)) {
      toast.error('Este link ya fue agregado');
      return;
    }

    if (links.length >= maxLinks) {
      toast.warning(`Máximo ${maxLinks} links permitidos`);
      return;
    }

    onChange([...links, trimmedUrl]);
    setInputValue('');
    toast.success('Link de YouTube agregado');
  };

  const handleRemove = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    onChange(newLinks);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLink();
    }
  };

  return (
    <div className="space-y-4">
      {/* Input para agregar nuevo link */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://youtube.com/watch?v=..."
            className="pl-9"
            disabled={links.length >= maxLinks}
          />
        </div>
        <Button
          type="button"
          onClick={handleAddLink}
          disabled={links.length >= maxLinks}
          variant="secondary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar
        </Button>
      </div>

      {/* Lista de links agregados */}
      {links.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map((link, idx) => {
            const thumbnail = getYouTubeThumbnail(link);
            return (
              <div
                key={idx}
                className="relative group rounded-lg overflow-hidden border border-border bg-muted"
              >
                <div className="aspect-video relative">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={`YouTube video ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Youtube className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center">
                      <Youtube className="w-6 h-6 text-destructive-foreground" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Youtube className="w-3 h-3" />
                  YouTube {idx + 1}
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
            );
          })}
        </div>
      )}

      {links.length >= maxLinks && (
        <p className="text-sm text-muted-foreground text-center">
          Has alcanzado el límite de {maxLinks} links de YouTube
        </p>
      )}
    </div>
  );
}
