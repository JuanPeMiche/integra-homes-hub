import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type Residence = Tables<"residences">;

interface CopyDataDialogProps {
  sourceResidence: Residence;
  allResidences: Residence[];
  onSuccess?: () => void;
}

export const CopyDataDialog = ({ 
  sourceResidence, 
  allResidences, 
  onSuccess 
}: CopyDataDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedResidences, setSelectedResidences] = useState<string[]>([]);
  const [copyOptions, setCopyOptions] = useState({
    services: true,
    facilities: true,
    activities: true,
  });
  const [isCopying, setIsCopying] = useState(false);

  const targetResidences = allResidences.filter(r => r.id !== sourceResidence.id);

  const handleToggleResidence = (id: string) => {
    setSelectedResidences(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedResidences.length === targetResidences.length) {
      setSelectedResidences([]);
    } else {
      setSelectedResidences(targetResidences.map(r => r.id));
    }
  };

  const handleCopy = async () => {
    if (selectedResidences.length === 0) {
      toast.error("Selecciona al menos una residencia destino");
      return;
    }

    if (!copyOptions.services && !copyOptions.facilities && !copyOptions.activities) {
      toast.error("Selecciona al menos un tipo de datos a copiar");
      return;
    }

    setIsCopying(true);

    try {
      const updateData: Partial<Residence> = {};
      
      if (copyOptions.services && sourceResidence.services) {
        updateData.services = sourceResidence.services;
      }
      if (copyOptions.facilities && sourceResidence.facilities) {
        updateData.facilities = sourceResidence.facilities;
      }
      if (copyOptions.activities && sourceResidence.activities) {
        updateData.activities = sourceResidence.activities;
      }

      const { error } = await supabase
        .from('residences')
        .update(updateData)
        .in('id', selectedResidences);

      if (error) throw error;

      const copiedItems = [];
      if (copyOptions.services) copiedItems.push('servicios');
      if (copyOptions.facilities) copiedItems.push('instalaciones');
      if (copyOptions.activities) copiedItems.push('actividades');

      toast.success(
        `${copiedItems.join(', ')} copiados a ${selectedResidences.length} residencia(s)`
      );

      setOpen(false);
      setSelectedResidences([]);
      onSuccess?.();
    } catch (error: any) {
      toast.error("Error al copiar: " + error.message);
    } finally {
      setIsCopying(false);
    }
  };

  const hasDataToCopy = 
    (sourceResidence.services?.length || 0) > 0 ||
    (sourceResidence.facilities?.length || 0) > 0 ||
    (sourceResidence.activities?.length || 0) > 0;

  if (!hasDataToCopy) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Copy className="w-4 h-4 mr-2" />
          Copiar a otras
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Copiar datos a otras residencias</DialogTitle>
          <DialogDescription>
            Copia servicios, instalaciones y/o actividades de "{sourceResidence.name}" a otras residencias.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* What to copy */}
          <div className="space-y-3">
            <Label className="font-semibold">¿Qué copiar?</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="copy-services"
                  checked={copyOptions.services}
                  onCheckedChange={(checked) => 
                    setCopyOptions(prev => ({ ...prev, services: !!checked }))
                  }
                  disabled={(sourceResidence.services?.length || 0) === 0}
                />
                <label htmlFor="copy-services" className="text-sm cursor-pointer">
                  Servicios ({sourceResidence.services?.length || 0})
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="copy-facilities"
                  checked={copyOptions.facilities}
                  onCheckedChange={(checked) => 
                    setCopyOptions(prev => ({ ...prev, facilities: !!checked }))
                  }
                  disabled={(sourceResidence.facilities?.length || 0) === 0}
                />
                <label htmlFor="copy-facilities" className="text-sm cursor-pointer">
                  Instalaciones ({sourceResidence.facilities?.length || 0})
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="copy-activities"
                  checked={copyOptions.activities}
                  onCheckedChange={(checked) => 
                    setCopyOptions(prev => ({ ...prev, activities: !!checked }))
                  }
                  disabled={(sourceResidence.activities?.length || 0) === 0}
                />
                <label htmlFor="copy-activities" className="text-sm cursor-pointer">
                  Actividades ({sourceResidence.activities?.length || 0})
                </label>
              </div>
            </div>
          </div>

          {/* Target residences */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Residencias destino</Label>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedResidences.length === targetResidences.length 
                  ? 'Deseleccionar todas' 
                  : 'Seleccionar todas'
                }
              </Button>
            </div>
            <ScrollArea className="h-[200px] border rounded-md p-2">
              <div className="space-y-1">
                {targetResidences.map((residence) => (
                  <div 
                    key={residence.id}
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
                      selectedResidences.includes(residence.id) 
                        ? 'bg-primary/10' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => handleToggleResidence(residence.id)}
                  >
                    <Checkbox 
                      checked={selectedResidences.includes(residence.id)}
                      onCheckedChange={() => handleToggleResidence(residence.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{residence.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {residence.city}, {residence.province}
                      </p>
                    </div>
                    {selectedResidences.includes(residence.id) && (
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            {selectedResidences.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {selectedResidences.length} residencia(s) seleccionada(s)
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleCopy} 
            disabled={isCopying || selectedResidences.length === 0}
          >
            {isCopying ? "Copiando..." : "Copiar datos"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
