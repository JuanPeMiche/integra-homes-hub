import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockResidences } from "@/data/residences";
import { ArrowLeft, Check, X, Users, Star, MapPin, Building, Shield, CheckCircle } from "lucide-react";

const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ids = searchParams.get("ids")?.split(",") || [];
  const residences = mockResidences.filter((r) => ids.includes(r.id)).slice(0, 3);

  if (residences.length < 2) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              Selecciona al menos 2 residencias para comparar
            </h1>
            <p className="text-muted-foreground">Máximo 3 residencias</p>
            <Button onClick={() => navigate("/buscar")}>Ir a Búsqueda</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const typeLabels: Record<string, string> = {
    publica: "Pública",
    privada: "Privada",
    concertada: "Concertada",
  };

  const allServices = Array.from(
    new Set(residences.flatMap((r) => r.services))
  ).sort();

  const allFacilities = Array.from(
    new Set(residences.flatMap((r) => r.facilities))
  ).sort();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-subtle pt-20">
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
              Comparando {residences.length} residencias (máximo 3)
            </p>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <Card className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold w-48">
                      Característica
                    </th>
                    {residences.map((residence) => (
                      <th key={residence.id} className="py-4 px-4 min-w-[220px]">
                        <div className="space-y-3">
                          <img
                            src={residence.image}
                            alt={residence.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <h3 className="font-bold text-base text-left">
                            {residence.name}
                          </h3>
                          {residence.redIntegra && (
                            <Badge variant="outline" className="gap-1 border-secondary text-secondary text-xs">
                              <CheckCircle className="h-3 w-3" />
                              Red Integra
                            </Badge>
                          )}
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
                  {/* Basic Info */}
                  <tr className="border-b border-border bg-muted/30">
                    <td colSpan={residences.length + 1} className="py-3 px-4 font-semibold text-lg">
                      Información General
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 font-medium text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Ubicación
                    </td>
                    {residences.map((r) => (
                      <td key={r.id} className="py-4 px-4 text-center">
                        <span className="font-medium">{r.city}, {r.province}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 font-medium text-muted-foreground flex items-center gap-2">
                      <Building className="h-4 w-4" /> Tipo
                    </td>
                    {residences.map((r) => (
                      <td key={r.id} className="py-4 px-4 text-center">
                        <Badge variant="secondary">{typeLabels[r.type]}</Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 font-medium text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" /> Capacidad
                    </td>
                    {residences.map((r) => (
                      <td key={r.id} className="py-4 px-4 text-center">
                        <span className="font-medium">{r.capacity} plazas</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 font-medium text-muted-foreground flex items-center gap-2">
                      <Star className="h-4 w-4" /> Transparencia
                    </td>
                    {residences.map((r) => (
                      <td key={r.id} className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= r.transparency
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 font-medium text-muted-foreground">
                      Precio
                    </td>
                    {residences.map((r) => (
                      <td key={r.id} className="py-4 px-4 text-center">
                        <span className="font-bold text-primary">{r.priceRange}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Services */}
                  <tr className="border-b border-border bg-muted/30">
                    <td colSpan={residences.length + 1} className="py-3 px-4 font-semibold text-lg">
                      Servicios Disponibles
                    </td>
                  </tr>
                  {allServices.slice(0, 12).map((service, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {service}
                      </td>
                      {residences.map((r) => (
                        <td key={r.id} className="py-3 px-4 text-center">
                          {r.services.includes(service) ? (
                            <Check className="h-5 w-5 text-secondary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Facilities */}
                  <tr className="border-b border-border bg-muted/30">
                    <td colSpan={residences.length + 1} className="py-3 px-4 font-semibold text-lg">
                      Instalaciones
                    </td>
                  </tr>
                  {allFacilities.slice(0, 8).map((facility, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {facility}
                      </td>
                      {residences.map((r) => (
                        <td key={r.id} className="py-3 px-4 text-center">
                          {r.facilities.includes(facility) ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Certifications */}
                  <tr className="border-b border-border bg-muted/30">
                    <td colSpan={residences.length + 1} className="py-3 px-4 font-semibold text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" /> Habilitaciones
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 text-muted-foreground">
                      Certificaciones
                    </td>
                    {residences.map((r) => (
                      <td key={r.id} className="py-4 px-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {r.certifications?.length ? (
                            r.certifications.map((cert, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
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
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-xl">{residence.name}</h3>
                  {residence.redIntegra && (
                    <Badge variant="outline" className="gap-1 border-secondary text-secondary text-xs">
                      <CheckCircle className="h-3 w-3" />
                      Red Integra
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Ubicación
                    </span>
                    <span className="font-medium">{residence.city}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Tipo</span>
                    <Badge variant="secondary">{typeLabels[residence.type]}</Badge>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" /> Capacidad
                    </span>
                    <span className="font-medium">{residence.capacity} plazas</span>
                  </div>
                  <div className="flex justify-between py-2 border-b items-center">
                    <span className="text-muted-foreground">Transparencia</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= residence.transparency
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Precio</span>
                    <span className="font-bold text-primary">{residence.priceRange}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Servicios:</h4>
                  <div className="flex flex-wrap gap-1">
                    {residence.services.slice(0, 5).map((service, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {service.length > 25 ? service.substring(0, 25) + "..." : service}
                      </Badge>
                    ))}
                    {residence.services.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{residence.services.length - 5} más
                      </Badge>
                    )}
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
