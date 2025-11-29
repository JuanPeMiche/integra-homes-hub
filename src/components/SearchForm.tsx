import { useState } from "react";
import { Search, MapPin, Home, Euro } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

export const SearchForm = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    "Enfermería 24h",
    "Fisioterapia",
    "Terapia Ocupacional",
    "Médico Propio",
    "Actividades Recreativas",
    "Centro de Día",
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <Card className="shadow-soft border-border/50">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Encuentra la Residencia Perfecta</h2>
        
        <form className="space-y-6">
          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provincia" className="text-base font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Provincia
              </Label>
              <Select>
                <SelectTrigger id="provincia" className="h-12">
                  <SelectValue placeholder="Selecciona provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="barcelona">Barcelona</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="sevilla">Sevilla</SelectItem>
                  <SelectItem value="malaga">Málaga</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ciudad" className="text-base font-medium">Ciudad</Label>
              <Input id="ciudad" placeholder="Introduce ciudad" className="h-12" />
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="tipo" className="text-base font-medium flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Tipo de Residencia
            </Label>
            <Select>
              <SelectTrigger id="tipo" className="h-12">
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publica">Pública</SelectItem>
                <SelectItem value="privada">Privada</SelectItem>
                <SelectItem value="concertada">Concertada</SelectItem>
                <SelectItem value="asistencia">Con Asistencia Médica</SelectItem>
                <SelectItem value="centro-dia">Centro de Día</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label className="text-base font-medium flex items-center gap-2">
              <Euro className="h-4 w-4 text-primary" />
              Rango de Precio Mensual
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder="Mínimo €" className="h-12" />
              <Input type="number" placeholder="Máximo €" className="h-12" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Servicios Disponibles</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <label
                    htmlFor={service}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {service}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full h-14 text-lg gap-2">
            <Search className="h-5 w-5" />
            Buscar Residencias
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
