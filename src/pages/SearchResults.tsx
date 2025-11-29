import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResidenceCard } from "@/components/ResidenceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Grid, List, MapIcon, SlidersHorizontal } from "lucide-react";
import { mockResidences } from "@/data/residences";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [compareList, setCompareList] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          {/* Header with filters toggle */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Resultados de Búsqueda</h1>
              <p className="text-muted-foreground">
                {mockResidences.length} residencias encontradas
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <aside className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-5 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Filtrar por</h3>
                    </div>

                    <div className="space-y-2">
                      <Label>Provincia</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todas">Todas</SelectItem>
                          <SelectItem value="madrid">Madrid</SelectItem>
                          <SelectItem value="barcelona">Barcelona</SelectItem>
                          <SelectItem value="valencia">Valencia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="publica" />
                          <label htmlFor="publica" className="text-sm cursor-pointer">
                            Pública
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="privada" />
                          <label htmlFor="privada" className="text-sm cursor-pointer">
                            Privada
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="concertada" />
                          <label htmlFor="concertada" className="text-sm cursor-pointer">
                            Concertada
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Precio máximo</Label>
                      <Input type="number" placeholder="€/mes" />
                    </div>

                    <Button className="w-full">Aplicar Filtros</Button>
                  </CardContent>
                </Card>
              </aside>
            )}

            {/* Results Grid */}
            <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
              {/* Map placeholder */}
              <Card className="mb-6 overflow-hidden">
                <div className="relative h-64 bg-muted flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Mapa de ubicaciones (requiere Google Maps API)
                    </p>
                  </div>
                </div>
              </Card>

              {/* Results */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {mockResidences.map((residence) => (
                  <ResidenceCard
                    key={residence.id}
                    residence={residence}
                    onCompare={handleCompare}
                    isComparing={compareList.includes(residence.id)}
                  />
                ))}
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
