import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, Save, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnsavedChangesIndicatorProps {
  hasChanges: boolean;
  isSaving?: boolean;
  autosaveEnabled?: boolean;
  onAutosaveToggle?: (enabled: boolean) => void;
  showAutosaveToggle?: boolean;
  className?: string;
}

export function UnsavedChangesIndicator({
  hasChanges,
  isSaving = false,
  autosaveEnabled = false,
  onAutosaveToggle,
  showAutosaveToggle = true,
  className,
}: UnsavedChangesIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Status Badge */}
      {isSaving ? (
        <Badge variant="secondary" className="gap-1.5 animate-pulse">
          <Save className="h-3 w-3 animate-spin" />
          Guardando...
        </Badge>
      ) : hasChanges ? (
        <Badge variant="destructive" className="gap-1.5">
          <AlertCircle className="h-3 w-3" />
          Cambios sin guardar
        </Badge>
      ) : (
        <Badge variant="outline" className="gap-1.5 text-green-600 border-green-300 bg-green-50">
          <CheckCircle className="h-3 w-3" />
          Guardado
        </Badge>
      )}

      {/* Autosave Toggle */}
      {showAutosaveToggle && onAutosaveToggle && (
        <div className="flex items-center gap-2">
          <Switch
            id="autosave"
            checked={autosaveEnabled}
            onCheckedChange={onAutosaveToggle}
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="autosave" className="text-sm text-muted-foreground cursor-pointer">
            Autoguardado
          </Label>
        </div>
      )}
    </div>
  );
}
