import { useState, useMemo, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { GoogleMapComponent } from "@/components/GoogleMap";
import { ResidenceCard } from "@/components/ResidenceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, RotateCcw, List, Map, SlidersHorizontal, CheckCircle } from "lucide-react";
import { useResidences, useProvinces, useCities, Residence } from "@/hooks/useResidences";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useDebouncedCallback } from "@/hooks/useDebouncedSearch";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: residences = [], isLoading } = useResidences();
  const { data: departamentos = [] } = useProvinces();
  const { data: barrios = [] } = useCities();
  
  const [compareList, setCompareList] = useState<string[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [barrio, setBarrio] = useState("");
  const [redIntegraOnly, setRedIntegraOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name-asc");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Read URL params on mount
  useEffect(() => {
    const depParam = searchParams.get('departamento');
    const barrioParam = searchParams.get('barrio');
    
    if (depParam) setDepartamento(depParam);
    if (barrioParam) {
      setBarrio(barrioParam);
      setSearchInputValue(barrioParam);
    }
  }, [searchParams]);

  // Debounce search input to avoid losing focus
  const debouncedSetSearchName = useCallback((value: string) => {
    setSearchName(value);
  }, []);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputValue(value);
    // Debounce the actual filter update
    const timeoutId = setTimeout(() => {
      debouncedSetSearchName(value);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [debouncedSetSearchName]);

  // Filter and sort residences
  const filteredResidences = useMemo(() => {
    let results = [...residences];

    // Filter by name (autocomplete-like)
    if (searchName) {
      const searchLower = searchName.toLowerCase();
      results = results.filter(r => 
        r.name.toLowerCase().includes(searchLower) ||
        r.city.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by departamento
    if (departamento) {
      results = results.filter(r => r.province.toLowerCase() === departamento.toLowerCase());
    }

    // Filter by barrio
    if (barrio) {
      results = results.filter(r => r.city.toLowerCase().includes(barrio.toLowerCase()));
    }

    // Filter by Red Integra
    if (redIntegraOnly) {
      results = results.filter(r => r.redIntegra);
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "transparency-desc":
        results.sort((a, b) => b.transparency - a.transparency);
        break;
      case "transparency-asc":
        results.sort((a, b) => a.transparency - b.transparency);
        break;
      case "rating-desc":
        results.sort((a, b) => b.rating - a.rating);
        break;
    }

    return results;
  }, [residences, searchName, departamento, barrio, redIntegraOnly, sortBy]);

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
    setSearchName("");
    setSearchInputValue("");
    setDepartamento("");
    setBarrio("");
    setRedIntegraOnly(false);
    setSortBy("name-asc");
  };

  const activeFiltersCount = [searchName, departamento, barrio, redIntegraOnly].filter(Boolean).length;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search by Name */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Buscar por nombre</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            value={searchInputValue}
            onChange={handleSearchInputChange}
            placeholder="Ej: Moiru, Dolce..."
            className="pl-10 bg-background"
          />
        </div>
      </div>

      {/* Departamento */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Departamento</Label>
        <Select value={departamento || "_all"} onValueChange={(val) => setDepartamento(val === "_all" ? "" : val)}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="_all">Todos</SelectItem>
            {departamentos.map((dep) => (
              <SelectItem key={dep} value={dep}>
                {dep}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Barrio / Localidad */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Barrio / Zona</Label>
        <Select value={barrio || "_all"} onValueChange={(val) => setBarrio(val === "_all" ? "" : val)}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="_all">Todos</SelectItem>
            {barrios.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Red Integra Filter */}
      <div className="flex items-center space-x-3 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
        <Checkbox
          id="redIntegra"
          checked={redIntegraOnly}
          onCheckedChange={(checked) => setRedIntegraOnly(checked as boolean)}
        />
        <label
          htmlFor="redIntegra"
          className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4 text-secondary" />
          Solo Red Integra
        </label>
      </div>

      {/* Sort By */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Ordenar por</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="name-asc">Nombre (A → Z)</SelectItem>
            <SelectItem value="name-desc">Nombre (Z → A)</SelectItem>
            <SelectItem value="transparency-desc">Mayor transparencia</SelectItem>
            <SelectItem value="transparency-asc">Menor transparencia</SelectItem>
            <SelectItem value="rating-desc">Mejor valoración</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Filters */}
      <button 
        onClick={resetFilters}
        className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
      >
        <RotateCcw className="h-4 w-4" />
        Limpiar filtros
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background pt-20">
        {/* Top Bar */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Residencias en Uruguay</h1>
                <p className="text-muted-foreground text-sm">
                  {isLoading ? "Cargando..." : `${filteredResidences.length} residencias encontradas`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="gap-2"
                  >
                    <List className="h-4 w-4" />
                    Lista
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                    className="gap-2"
                  >
                    <Map className="h-4 w-4" />
                    Mapa
                  </Button>
                </div>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filtros
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtrar resultados</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterPanel />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Desktop Sidebar - Filters */}
          <aside className="hidden lg:block w-80 border-r border-border min-h-[calc(100vh-180px)] p-6 flex-shrink-0 bg-card">
            <h2 className="text-lg font-semibold mb-6">Filtrar resultados</h2>
            <FilterPanel />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : viewMode === "list" ? (
              <div className="p-6">
                {filteredResidences.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg mb-4">
                      No se encontraron residencias con los filtros seleccionados
                    </p>
                    <Button onClick={resetFilters} variant="outline">
                      Limpiar filtros
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredResidences.map((residence) => (
                      <ResidenceCard
                        key={residence.id}
                        residence={residence}
                        onCompare={handleCompare}
                        isComparing={compareList.includes(residence.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[calc(100vh-180px)]">
                <GoogleMapComponent 
                  residences={filteredResidences as any}
                  onMarkerClick={(residence: Residence) => navigate(`/residencia/${residence.id}`)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-4 z-40">
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
                  Comparar ahora
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