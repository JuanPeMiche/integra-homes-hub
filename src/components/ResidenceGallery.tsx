import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

interface ResidenceGalleryProps {
  residenceName: string;
  images: string[];
}

export function ResidenceGallery({ residenceName, images }: ResidenceGalleryProps) {
  const safeImages = useMemo(() => images?.filter(Boolean) ?? [], [images]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const hasMany = safeImages.length > 1;
  const current = safeImages[Math.min(index, Math.max(0, safeImages.length - 1))];

  const next = () => {
    if (!safeImages.length) return;
    setIndex((prev) => (prev + 1) % safeImages.length);
  };

  const prev = () => {
    if (!safeImages.length) return;
    setIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  if (!safeImages.length) return null;

  return (
    <div className="space-y-4">
      <div className="relative h-80 lg:h-[450px] rounded-xl overflow-hidden">
        <button
          type="button"
          className="group relative w-full h-full"
          onClick={() => setOpen(true)}
          aria-label="Abrir galería en pantalla completa"
        >
          <img
            src={current}
            alt={`${residenceName} - Foto ${index + 1} de ${safeImages.length}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
          <div className="absolute left-4 bottom-4 flex items-center gap-2">
            <span className="text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1">
              {index + 1}/{safeImages.length}
            </span>
          </div>
          <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1">
              <Expand className="h-4 w-4" />
              Ampliar
            </span>
          </div>
        </button>

        {hasMany && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/85 hover:bg-background"
              onClick={prev}
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/85 hover:bg-background"
              onClick={next}
              aria-label="Foto siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === index ? "bg-background" : "bg-background/50"
                  }`}
                  aria-label={`Ir a la foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMany && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {safeImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                i === index ? "border-primary" : "border-transparent"
              }`}
              aria-label={`Seleccionar miniatura ${i + 1}`}
            >
              <img
                src={img}
                alt={`${residenceName} - Miniatura ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <div className="relative bg-background">
            <div className="relative aspect-[16/10] w-full">
              <img
                src={current}
                alt={`${residenceName} - Foto ampliada ${index + 1} de ${safeImages.length}`}
                className="absolute inset-0 w-full h-full object-contain bg-background"
                loading="eager"
              />

              {hasMany && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/85 hover:bg-background"
                    onClick={prev}
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/85 hover:bg-background"
                    onClick={next}
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              <div className="absolute left-4 top-4">
                <span className="text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1">
                  {residenceName} · {index + 1}/{safeImages.length}
                </span>
              </div>
            </div>

            {hasMany && (
              <div className="p-4 border-t border-border">
                <div className="flex gap-2 overflow-x-auto">
                  {safeImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        i === index ? "border-primary" : "border-transparent"
                      }`}
                      aria-label={`Seleccionar foto ${i + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${residenceName} - Miniatura ampliada ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
