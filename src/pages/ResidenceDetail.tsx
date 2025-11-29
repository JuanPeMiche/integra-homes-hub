import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Euro,
  Users,
  Star,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { mockResidences } from "@/data/residences";
import { toast } from "sonner";

const ResidenceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const residence = mockResidences.find((r) => r.id === id);

  if (!residence) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Residencia no encontrada</h1>
            <Button onClick={() => navigate("/buscar")}>Volver a búsqueda</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % residence.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? residence.images.length - 1 : prev - 1
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Solicitud enviada", {
      description: "Nos pondremos en contacto contigo pronto.",
    });
  };

  const typeLabels = {
    publica: "Pública",
    privada: "Privada",
    concertada: "Concertada",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-subtle py-6">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              className="gap-2 mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-foreground">
                    {residence.name}
                  </h1>
                  <Badge className="bg-primary text-primary-foreground">
                    {typeLabels[residence.type]}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{residence.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{residence.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="lg" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Llamar Ahora
                </Button>
                <Button size="lg" variant="outline">
                  Reservar Visita
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="relative">
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <img
                    src={residence.images[currentImageIndex]}
                    alt={`${residence.name} - Imagen ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {residence.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {residence.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                        idx === currentImageIndex
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Miniatura ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {residence.description}
                  </p>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Servicios Disponibles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {residence.services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-secondary" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Instalaciones</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {residence.facilities.map((facility, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Ubicación</h2>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Mapa (Google Maps API)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-baseline gap-2">
                      <Euro className="h-6 w-6 text-primary" />
                      <span className="text-4xl font-bold text-primary">
                        {residence.price}
                      </span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Capacidad:</span>
                        <span className="font-medium flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {residence.capacity} plazas
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Valoración:</span>
                        <span className="font-medium flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {residence.rating}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Información de Contacto</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{residence.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>{residence.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{residence.schedule}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Solicitar Información</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" type="tel" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea id="message" rows={4} required />
                      </div>
                      <Button type="submit" className="w-full">
                        Enviar Solicitud
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResidenceDetail;
