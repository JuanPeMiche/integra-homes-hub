import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResidenceCard } from "@/components/ResidenceCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Search, RotateCcw, MapPin } from "lucide-react";
import { mockResidences } from "@/data/residences";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const [compareList, setCompareList] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedBarrios, setSelectedBarrios] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState("latest");

  const departamentos = [
    { id: "montevideo", name: "Montevideo" },
    { id: "canelones", name: "Canelones" },
    { id: "colonia", name: "Colonia" },
    { id: "maldonado", name: "Maldonado" },
  ];

  const barriosMontevideo = [
    "Parque Batlle",
    "Prado",
    "Cordón",
    "Punta Gorda",
    "Tres Cruces",
    "Carrasco",
    "La Blanqueada",
    "Reducto",
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

  const toggleDepartment = (id: string) => {
    setSelectedDepartments(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const toggleBarrio = (barrio: string) => {
    setSelectedBarrios(prev => 
      prev.includes(barrio) ? prev.filter(b => b !== barrio) : [...prev, barrio]
    );
  };

  const resetFilters = () => {
    setSelectedDepartments([]);
    setSelectedBarrios([]);
    setOrderBy("latest");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Filters */}
          <aside className="w-72 border-r border-border overflow-y-auto p-6 flex-shrink-0">
            <h2 className="text-lg font-semibold mb-6">¿Qué estas buscando?</h2>
            
            {/* Order By */}
            <div className="mb-6">
              <Label className="text-sm text-muted-foreground mb-2 block">Ordenar por...</Label>
              <Select value={orderBy} onValueChange={setOrderBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Los últimos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Los últimos</SelectItem>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Departamento */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Departamento</Label>
              <div className="space-y-2">
                {departamentos.map((dep) => (
                  <div key={dep.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={dep.id} 
                      checked={selectedDepartments.includes(dep.id)}
                      onCheckedChange={() => toggleDepartment(dep.id)}
                    />
                    <label htmlFor={dep.id} className="text-sm cursor-pointer">
                      {dep.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Barrio */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Barrio</Label>
              <div className="space-y-2">
                {barriosMontevideo.map((barrio) => (
                  <div key={barrio} className="flex items-center space-x-2">
                    <Checkbox 
                      id={barrio} 
                      checked={selectedBarrios.includes(barrio)}
                      onCheckedChange={() => toggleBarrio(barrio)}
                    />
                    <label htmlFor={barrio} className="text-sm cursor-pointer">
                      {barrio}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <Button className="w-full mb-3 gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>

            {/* Reset Filters */}
            <button 
              onClick={resetFilters}
              className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Filters
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
    </div>
  );
};

export default SearchResults;
