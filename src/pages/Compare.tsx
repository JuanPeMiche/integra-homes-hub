import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockResidences } from "@/data/residences";
import { ArrowLeft, Check, X, Euro, Users, Star } from "lucide-react";

const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ids = searchParams.get("ids")?.split(",") || [];
  const residences = mockResidences.filter((r) => ids.includes(r.id));

  if (residences.length < 2) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              Selecciona al menos 2 residencias para comparar
            </h1>
            <Button onClick={() => navigate("/buscar")}>Ir a Búsqueda</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const compareItems = [
    { label: "Ubicación", key: "city" },
    { label: "Tipo", key: "type" },
    { label: "Precio mensual", key: "price", format: (v: number) => `${v}€` },
    { label: "Capacidad", key: "capacity", format: (v: number) => `${v} plazas` },
    { label: "Valoración", key: "rating" },
  ];

  const allServices = Array.from(
    new Set(residences.flatMap((r) => r.services))
  );

  const typeLabels = {
    publica: "Pública",
    privada: "Privada",
    concertada: "Concertada",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="gap-2 mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Comparar Residencias
            </h1>
            <p className="text-muted-foreground">
              Compara las características de {residences.length} residencias seleccionadas
            </p>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <Card className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">
                      Característica
                    </th>
                    {residences.map((residence) => (
                      <th key={residence.id} className="py-4 px-4">
                        <div className="space-y-3">
                          <img
                            src={residence.image}
                            alt={residence.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <h3 className="font-bold text-base text-left">
                            {residence.name}
                          </h3>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => navigate(`/residencia/${residence.id}`)}
                          >
                            Ver Detalles
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-muted-foreground">
                        {item.label}
                      </td>
                      {residences.map((residence) => {
                        let value: string | number = residence[item.key as keyof typeof residence] as string | number;
                        if (item.key === "type") {
                          value = typeLabels[value as keyof typeof typeLabels];
                        }
                        if (item.format && typeof value === "number") {
                          value = item.format(value);
                        }
                        return (
                          <td key={residence.id} className="py-4 px-4 text-center">
                            {item.key === "rating" ? (
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{value}</span>
                              </div>
                            ) : item.key === "price" ? (
                              <div className="flex items-center justify-center gap-1 text-primary font-bold">
                                <Euro className="h-4 w-4" />
                                {residence.price}
                              </div>
                            ) : item.key === "capacity" ? (
                              <div className="flex items-center justify-center gap-1">
                                <Users className="h-4 w-4" />
                                {residence.capacity}
                              </div>
                            ) : (
                              <span className="font-medium">{String(value)}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Services Comparison */}
                  <tr className="border-b border-border">
                    <td
                      colSpan={residences.length + 1}
                      className="py-4 px-4 font-semibold text-lg"
                    >
                      Servicios Disponibles
                    </td>
                  </tr>
                  {allServices.map((service, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="py-3 px-4 text-muted-foreground">
                        {service}
                      </td>
                      {residences.map((residence) => (
                        <td key={residence.id} className="py-3 px-4 text-center">
                          {residence.services.includes(service) ? (
                            <Check className="h-5 w-5 text-secondary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-6">
            {residences.map((residence) => (
              <Card key={residence.id} className="p-6 space-y-4">
                <img
                  src={residence.image}
                  alt={residence.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="font-bold text-xl">{residence.name}</h3>

                <div className="space-y-3">
                  {compareItems.map((item, idx) => {
                    let value = residence[item.key as keyof typeof residence];
                    if (item.key === "type") {
                      value = typeLabels[value as keyof typeof typeLabels];
                    }
                    if (item.format && typeof value === "number") {
                      value = item.format(value);
                    }
                    return (
                      <div key={idx} className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">{item.label}:</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Servicios:</h4>
                  <div className="flex flex-wrap gap-2">
                    {residence.services.map((service, idx) => (
                      <Badge key={idx} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => navigate(`/residencia/${residence.id}`)}
                >
                  Ver Detalles
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
