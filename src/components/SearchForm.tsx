import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

// Static list of common services for the search form (simpler than database services with emojis)
const searchServices = [
  "Enfermería 24h",
  "Fisioterapia",
  "Terapia Ocupacional",
  "Médico Geriatra",
  "Actividades Recreativas",
  "Alimentación Especializada",
  "Atención Alzheimer",
  "Centro de Día",
];

export const SearchForm = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>("");
  const [departamento, setDepartamento] = useState("");
  const [barrio, setBarrio] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (departamento) params.set('departamento', departamento);
    if (barrio) params.set('barrio', barrio);
    if (tipo) params.set('tipo', tipo);
    if (selectedService) params.set('service', selectedService);
    
    navigate(`/buscar?${params.toString()}`);
  };

  return (
    <Card className="shadow-soft border-border/50">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Encuentra la residencia perfecta</h2>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departamento" className="text-base font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Departamento
              </Label>
              <Select value={departamento} onValueChange={setDepartamento}>
                <SelectTrigger id="departamento" className="h-12">
                  <SelectValue placeholder="Selecciona departamento" />
                </SelectTrigger>
              <SelectContent>
                  <SelectItem value="Montevideo">Montevideo</SelectItem>
                  <SelectItem value="Canelones">Canelones</SelectItem>
                  <SelectItem value="Colonia">Colonia</SelectItem>
                  <SelectItem value="Maldonado">Maldonado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="barrio" className="text-base font-medium">Barrio / Localidad</Label>
              <Input id="barrio" placeholder="Ej: Cordón, Prado, Punta Gorda" className="h-12" value={barrio} onChange={(e) => setBarrio(e.target.value)} />
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="tipo" className="text-base font-medium flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Tipo de atención
            </Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger id="tipo" className="h-12">
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanente">Permanente (larga estadía)</SelectItem>
                <SelectItem value="temporal">Temporal (estadía corta)</SelectItem>
                <SelectItem value="centro-dia">Centro de día</SelectItem>
                <SelectItem value="asistida">Atención asistida</SelectItem>
                <SelectItem value="autovalidos">Autoválidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Services - Radio Group like in the image */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Servicios disponibles</Label>
            <RadioGroup 
              value={selectedService} 
              onValueChange={setSelectedService}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {searchServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <RadioGroupItem value={service} id={`service-${service}`} />
                  <label
                    htmlFor={`service-${service}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {service}
                  </label>
                </div>
              ))}
            </RadioGroup>
            {selectedService && (
              <button
                type="button"
                onClick={() => setSelectedService("")}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Quitar selección
              </button>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg gap-2"
          >
            <Search className="h-5 w-5" />
            Buscar residencias
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
