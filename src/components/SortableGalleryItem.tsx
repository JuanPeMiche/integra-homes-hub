import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortableGalleryItemProps {
  id: string;
  image: string;
  index: number;
  onRemove: () => void;
}

export function SortableGalleryItem({ id, image, index, onRemove }: SortableGalleryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative aspect-video rounded-lg overflow-hidden border bg-muted group ${
        isDragging ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-border'
      }`}
    >
      <img
        src={image}
        alt={`Imagen ${index + 1}`}
        className="w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Delete button - positioned in bottom right */}
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute bottom-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X className="h-4 w-4" />
      </Button>
      
      {/* Drag handle - positioned in top right, higher z-index */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      
      {/* Index badge */}
      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {index + 1}
      </div>
      
      {/* First image indicator */}
      {index === 0 && (
        <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium">
          Principal
        </div>
      )}
    </div>
  );
}
