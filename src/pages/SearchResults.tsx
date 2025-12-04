import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RotateCcw, MapPin } from "lucide-react";
import { mockResidences } from "@/data/residences";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const [compareList, setCompareList] = useState<string[]>([]);
  const [departamento, setDepartamento] = useState("");
  const [barrio, setBarrio] = useState("");
  const [tipoAtencion, setTipoAtencion] = useState("");
  const [rangoPrecio, setRangoPrecio] = useState("");
  const [servicio, setServicio] = useState("");

  const departamentos = [
    { id: "montevideo", name: "Montevideo" },
    { id: "canelones", name: "Canelones" },
    { id: "colonia", name: "Colonia" },
    { id: "maldonado", name: "Maldonado" },
  ];

  const tiposAtencion = [
    { id: "permanente", name: "Permanente (Larga estadía)" },
    { id: "temporal", name: "Temporal (Estadía corta)" },
    { id: "centro-dia", name: "Centro de Día" },
    { id: "asistida", name: "Atención Asistida" },
    { id: "autovalidos", name: "Autoválidos" },
  ];

  const rangosPrecios = [
    { id: "30000-50000", name: "$30.000 - $50.000" },
    { id: "50000-80000", name: "$50.000 - $80.000" },
    { id: "80000-120000", name: "$80.000 - $120.000" },
    { id: "120000+", name: "$120.000 o más" },
    { id: "consultar", name: "Consultar" },
  ];

  const servicios = [
    { id: "enfermeria-24h", name: "Enfermería 24h" },
    { id: "fisioterapia", name: "Fisioterapia" },
    { id: "terapia-ocupacional", name: "Terapia Ocupacional" },
    { id: "medico-geriatra", name: "Médico Geriatra" },
    { id: "actividades-recreativas", name: "Actividades Recreativas" },
    { id: "alimentacion-especializada", name: "Alimentación Especializada" },
    { id: "atencion-alzheimer", name: "Atención Alzheimer" },
    { id: "centro-dia", name: "Centro de Día" },
  ];

  const handleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const goToCompare = () => {
    if (compareList.length >= 2) {
      navigate(`/comparar?ids=${compareList.join(",")}`);
    }
  };

  const resetFilters = () => {
    setDepartamento("");
    setBarrio("");
    setTipoAtencion("");
    setRangoPrecio("");
    setServicio("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Filters */}
          <aside className="w-80 border-r border-border overflow-y-auto p-6 flex-shrink-0 bg-card">
            <h2 className="text-lg font-semibold mb-6">Filtrar los resultados</h2>
            
            {/* Departamento */}
            <div className="mb-5">
              <Label className="text-sm font-medium mb-2 block">Departamento</Label>
              <Select value={departamento} onValueChange={setDepartamento}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {departamentos.map((dep) => (
                    <SelectItem key={dep.id} value={dep.id}>
                      {dep.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Barrio / Localidad */}
            <div className="mb-5">
              <Label className="text-sm font-medium mb-2 block">Barrio / Localidad</Label>
              <Input 
                value={barrio}
                onChange={(e) => setBarrio(e.target.value)}
                placeholder="Ej: Cordón, Prado, Punta Gorda"
                className="bg-background"
              />
            </div>

            {/* Tipo de Atención */}
            <div className="mb-5">
              <Label className="text-sm font-medium mb-2 block">Tipo de Atención</Label>
              <Select value={tipoAtencion} onValueChange={setTipoAtencion}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {tiposAtencion.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rango de Precio */}
            <div className="mb-5">
              <Label className="text-sm font-medium mb-2 block">Rango de Precio Mensual</Label>
              <Select value={rangoPrecio} onValueChange={setRangoPrecio}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {rangosPrecios.map((rango) => (
                    <SelectItem key={rango.id} value={rango.id}>
                      {rango.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">Precio medio en la zona: $65.000 UY/mes</p>
            </div>

            {/* Servicios Disponibles */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-2 block">Servicios Disponibles</Label>
              <Select value={servicio} onValueChange={setServicio}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {servicios.map((serv) => (
                    <SelectItem key={serv.id} value={serv.id}>
                      {serv.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button className="w-full mb-3 gap-2 h-12">
              <Search className="h-4 w-4" />
              Buscar
            </Button>

            {/* Reset Filters */}
            <button 
              onClick={resetFilters}
              className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Limpiar filtros
            </button>
          </aside>

          {/* Center - Residence Cards */}
          <div className="w-[400px] overflow-y-auto flex-shrink-0 border-r border-border">
            <div className="space-y-0">
              {mockResidences.map((residence) => (
                <div 
                  key={residence.id} 
                  className="relative cursor-pointer group"
                  onClick={() => navigate(`/residencia/${residence.id}`)}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={residence.image} 
                      alt={residence.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Badge overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="bg-primary text-primary-foreground p-1.5 rounded">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <span className="bg-foreground/80 text-background px-3 py-1 rounded text-sm font-medium">
                        {residence.city}
                      </span>
                    </div>
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                        {residence.name}
                        <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </h3>
                      {residence.description && (
                        <p className="text-white/80 text-sm mt-1 line-clamp-1">
                          {residence.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-8 h-8 p-0">1</Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">2</Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">→</Button>
            </div>
          </div>

          {/* Right - Map */}
          <div className="flex-1 bg-muted relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Mapa de Ubicaciones</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Para ver el mapa interactivo con las ubicaciones de las residencias, 
                    se necesita integrar Google Maps API.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft p-4 z-40">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  {compareList.length} residencia{compareList.length !== 1 ? "s" : ""} seleccionada
                  {compareList.length !== 1 ? "s" : ""}
                </span>
                {compareList.length < 2 && (
                  <span className="text-sm text-muted-foreground">
                    (Selecciona al menos 2 para comparar)
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCompareList([])}>
                  Limpiar
                </Button>
                <Button onClick={goToCompare} disabled={compareList.length < 2}>
                  Comparar Ahora
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default SearchResults;
