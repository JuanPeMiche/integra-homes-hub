import { useState, useRef } from 'react';
import { X, Loader2, ImagePlus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStorageUpload } from '@/hooks/useStorageUpload';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableGalleryItem } from './SortableGalleryItem';

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img === active.id);
      const newIndex = images.findIndex((img) => img === over.id);
      
      const newImages = arrayMove(images, oldIndex, newIndex);
      onChange(newImages);
      toast.success('Orden actualizado');
    }
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <SortableGalleryItem
                key={image}
                id={image}
                image={image}
                index={index}
                onRemove={() => handleRemove(index)}
              />
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
        </SortableContext>
      </DndContext>
      
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
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <GripVertical className="h-4 w-4" />
        <span>
          Arrastra para reordenar. {images.length} de {maxImages} imágenes. La primera será la principal.
        </span>
      </div>
    </div>
  );
}
