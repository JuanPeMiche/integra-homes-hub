import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface MultiValueInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const MultiValueInput = ({ label, values, onChange, placeholder }: MultiValueInputProps) => {
  const [newValue, setNewValue] = useState("");
  const newValueRef = useRef("");

  const addValue = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    onChange([...values, trimmed]);
    setNewValue("");
    newValueRef.current = "";
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue(newValueRef.current);
    }
  };

  const handleBlur = () => {
    // UX: si el usuario escribió algo y se va (p.ej. hace click en "Guardar"), lo agregamos automáticamente.
    addValue(newValueRef.current);
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {/* Existing values */}
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <Input value={value} onChange={(e) => handleUpdate(index, e.target.value)} className="flex-1" />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleRemove(index)}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add new value */}
      <div className="flex gap-2">
        <Input
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
            newValueRef.current = e.target.value;
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={placeholder || `Agregar ${label.toLowerCase()}`}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          // Evita que el input pierda foco y dispare el onBlur (doble alta)
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => addValue(newValueRef.current)}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

