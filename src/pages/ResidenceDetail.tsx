import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResidenceGallery } from "@/components/ResidenceGallery";
import { SendMethodDialog } from "@/components/SendMethodDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Star,
  Check,
  ArrowLeft,
  MessageCircle,
  Globe,
  Facebook,
  Instagram,
  Navigation,
  CheckCircle,
  User,
  Building,
  Shield,
  Stethoscope,
  Pill,
  UtensilsCrossed,
  ShowerHead,
  Bed,
  Tv,
  Wifi,
  Car,
  TreeDeciduous,
  Dumbbell,
  Heart,
  Music,
  Palette,
  BookOpen,
  Gamepad2,
  Dog,
  Church,
  Scissors,
  Calculator,
  Brain,
  HandHeart,
  Utensils,
  Shirt,
  BedDouble,
  Sofa,
  LampDesk,
  Flower2,
  Coffee,
  HeartPulse,
  Waves,
  Sparkles,
  Snowflake,
  Flame,
  ArrowUpDown,
  Accessibility,
  WashingMachine,
  DoorOpen,
} from "lucide-react";
import { useResidence } from "@/hooks/useResidences";

// Icon mapping for services
const getServiceIcon = (service: string) => {
  const text = service.toLowerCase();
  if (text.includes('enfermería') || text.includes('enfermeria')) return Stethoscope;
  if (text.includes('médic') || text.includes('medic') || text.includes('doctor')) return HeartPulse;
  if (text.includes('medicación') || text.includes('medicacion') || text.includes('farmacia')) return Pill;
  if (text.includes('alimentación') || text.includes('alimentacion') || text.includes('comida') || text.includes('cocina')) return UtensilsCrossed;
  if (text.includes('lavandería') || text.includes('lavanderia') || text.includes('ropa')) return Shirt;
  if (text.includes('limpieza') || text.includes('aseo')) return ShowerHead;
  if (text.includes('fisioterapia') || text.includes('kinesiología') || text.includes('rehabilitación')) return Dumbbell;
  if (text.includes('psicología') || text.includes('psicolog')) return Brain;
  if (text.includes('podología') || text.includes('podolog')) return Scissors;
  if (text.includes('peluquería') || text.includes('peluquer')) return Scissors;
  if (text.includes('transporte') || text.includes('traslado')) return Car;
  if (text.includes('wifi') || text.includes('internet')) return Wifi;
  if (text.includes('televisión') || text.includes('television') || text.includes('tv') || text.includes('cable')) return Tv;
  if (text.includes('acompañamiento') || text.includes('compañía')) return HandHeart;
  if (text.includes('religios') || text.includes('espiritual') || text.includes('misa')) return Church;
  if (text.includes('mascota') || text.includes('pet')) return Dog;
  if (text.includes('seguridad') || text.includes('vigilancia')) return Shield;
  if (text.includes('emergencia')) return HeartPulse;
  if (text.includes('nutrición') || text.includes('dietista')) return UtensilsCrossed;
  return Check;
};

// Icon mapping for facilities
const getFacilityIcon = (facility: string) => {
  const text = facility.toLowerCase();
  if (text.includes('habitación') || text.includes('habitacion') || text.includes('dormitorio')) return BedDouble;
  if (text.includes('baño') || text.includes('bano')) return ShowerHead;
  if (text.includes('comedor')) return Utensils;
  if (text.includes('jardín') || text.includes('jardin') || text.includes('parque') || text.includes('patio')) return TreeDeciduous;
  if (text.includes('cocina')) return UtensilsCrossed;
  if (text.includes('living') || text.includes('sala') || text.includes('estar')) return Sofa;
  if (text.includes('gimnasio') || text.includes('ejercicio')) return Dumbbell;
  if (text.includes('biblioteca') || text.includes('lectura')) return BookOpen;
  if (text.includes('capilla') || text.includes('oratorio')) return Church;
  if (text.includes('estacionamiento') || text.includes('parking') || text.includes('garage')) return Car;
  if (text.includes('televisión') || text.includes('tv')) return Tv;
  if (text.includes('wifi') || text.includes('internet')) return Wifi;
  if (text.includes('terraza') || text.includes('balcón')) return Flower2;
  if (text.includes('café') || text.includes('cafetería')) return Coffee;
  if (text.includes('consultorio') || text.includes('enfermería')) return Stethoscope;
  if (text.includes('piscina') || text.includes('pileta')) return Waves;
  if (text.includes('spa') || text.includes('jacuzzi') || text.includes('sauna')) return Sparkles;
  if (text.includes('aire acondicionado') || text.includes('climatización') || text.includes('refrigeración')) return Snowflake;
  if (text.includes('calefacción') || text.includes('calefactor')) return Flame;
  if (text.includes('ascensor') || text.includes('elevador')) return ArrowUpDown;
  if (text.includes('rampa') || text.includes('accesibilidad')) return Accessibility;
  if (text.includes('lavadero') || text.includes('lavadora')) return WashingMachine;
  if (text.includes('recepción') || text.includes('lobby')) return DoorOpen;
  return Building;
};

// Icon mapping for activities
const getActivityIcon = (activity: string) => {
  const text = activity.toLowerCase();
  if (text.includes('música') || text.includes('musica') || text.includes('canto') || text.includes('coral')) return Music;
  if (text.includes('pintura') || text.includes('arte') || text.includes('manualidades') || text.includes('dibujo')) return Palette;
  if (text.includes('lectura') || text.includes('biblioteca') || text.includes('libro')) return BookOpen;
  if (text.includes('juego') || text.includes('bingo') || text.includes('cartas') || text.includes('dominó')) return Gamepad2;
  if (text.includes('gimnasia') || text.includes('ejercicio') || text.includes('físic') || text.includes('yoga')) return Dumbbell;
  if (text.includes('jardín') || text.includes('jardinería') || text.includes('huerta')) return Flower2;
  if (text.includes('paseo') || text.includes('salida') || text.includes('excursión')) return TreeDeciduous;
  if (text.includes('película') || text.includes('cine') || text.includes('televisión')) return Tv;
  if (text.includes('cocina') || text.includes('repostería')) return UtensilsCrossed;
  if (text.includes('religios') || text.includes('misa') || text.includes('espiritual')) return Church;
  if (text.includes('mascota') || text.includes('animal')) return Dog;
  if (text.includes('memoria') || text.includes('cognitiv') || text.includes('estimulación')) return Brain;
  if (text.includes('terapia') || text.includes('grupo')) return Heart;
  return Star;
};

const TransparencyStars = ({ rating }: { rating: number }) => {
  if (rating === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground italic">Transparencia: sin datos</span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              Transparencia: {rating}/5
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Índice de transparencia basado en información verificada</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Get initials for placeholder
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
};

const ResidenceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: residence, isLoading, error } = useResidence(id || '');
  const [contactForm, setContactForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [showSendDialog, setShowSendDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!residence || error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Residencia no encontrada</h1>
            <Button onClick={() => navigate("/buscar")}>Volver a búsqueda</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSendDialog(true);
  };

  const typeLabels = {
    publica: "Pública",
    privada: "Privada",
    concertada: "Concertada",
  };

  const openGoogleMaps = () => {
    if (residence.mapsUrl) {
      window.open(residence.mapsUrl, '_blank');
    } else {
      const { lat, lng } = residence.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  const whatsappLink = residence.whatsapp 
    ? `https://wa.me/598${residence.whatsapp.replace(/\D/g, '')}`
    : null;

  const directors = residence.directors || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
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
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
              <div className="flex gap-4 items-start">
                {/* Logo */}
                <div className="flex-shrink-0">
                  {residence.logoUrl ? (
                    <img 
                      src={residence.logoUrl} 
                      alt={`Logo ${residence.name}`}
                      className="h-20 w-20 rounded-xl bg-white object-contain shadow-md p-2"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-xl bg-white shadow-md flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{getInitials(residence.name)}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                      {residence.name}
                    </h1>
                    {residence.redIntegra && (
                      <Badge variant="outline" className="gap-1 border-secondary text-secondary">
                        <CheckCircle className="h-3 w-3" />
                        Red Integra
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{residence.city}, {residence.province}</span>
                    </div>
                  </div>
                  <TransparencyStars rating={residence.transparency} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {residence.phone && (
                  <Button size="lg" className="gap-2" asChild>
                    <a href={`tel:${residence.phone}`}>
                      <Phone className="h-4 w-4" />
                      Llamar
                    </a>
                  </Button>
                )}
                {whatsappLink && (
                  <Button size="lg" variant="outline" className="gap-2 text-green-600 border-green-600 hover:bg-green-50" asChild>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                )}
                <Button size="lg" variant="secondary" className="gap-2" onClick={openGoogleMaps}>
                  <Navigation className="h-4 w-4" />
                  Cómo llegar
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
              <ResidenceGallery residenceName={residence.name} images={residence.images} />

              {/* Description */}
              <Card className="overflow-hidden border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Descripción</h2>
                  </div>
                  <ScrollArea className="max-h-48 pr-4">
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      {residence.description?.split(/(?<=[.!?])\s+/).reduce<string[][]>((acc, sentence) => {
                        const lastGroup = acc[acc.length - 1];
                        if (!lastGroup || lastGroup.length >= 3) {
                          acc.push([sentence]);
                        } else {
                          lastGroup.push(sentence);
                        }
                        return acc;
                      }, []).map((paragraph, idx) => (
                        <p key={idx} className="text-base">{paragraph.join(' ')}</p>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="overflow-hidden border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold">Servicios disponibles</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {residence.services.map((service, idx) => {
                      const ServiceIcon = getServiceIcon(service);
                      return (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                            <ServiceIcon className="h-4 w-4 text-secondary" />
                          </div>
                          <span className="font-medium self-center">{service}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card className="overflow-hidden border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Instalaciones</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {residence.facilities.map((facility, idx) => {
                      const FacilityIcon = getFacilityIcon(facility);
                      return (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <FacilityIcon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium self-center">{facility}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Activities */}
              <Card className="overflow-hidden border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold">Actividades</h2>
                  </div>
                  {residence.activities && residence.activities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {residence.activities.map((activity, idx) => {
                        const ActivityIcon = getActivityIcon(activity);
                        return (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                              <ActivityIcon className="h-4 w-4 text-yellow-500" />
                            </div>
                            <span className="font-medium self-center">{activity}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-muted/30 rounded-lg">
                      <Star className="h-10 w-10 text-yellow-500/30 mx-auto mb-2" />
                      <p className="text-muted-foreground italic">Lista de actividades pendiente</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Certifications */}
              {residence.certifications && residence.certifications.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Habilitaciones</h2>
                    <div className="flex flex-wrap gap-3">
                      {residence.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="outline" className="gap-2 py-2 px-4 text-base">
                          <Shield className="h-4 w-4 text-secondary" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Directors / Team */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Directivos / Equipo responsable</h2>
                  {directors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {directors.map((director, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                          {director.photo_url ? (
                            <img 
                              src={director.photo_url} 
                              alt={director.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <User className="h-8 w-8 text-primary" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold">{director.name}</p>
                            <p className="text-sm text-muted-foreground">{director.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Información de directivos pendiente</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Ubicación</h2>
                    <Button variant="outline" className="gap-2" onClick={openGoogleMaps}>
                      <Navigation className="h-4 w-4" />
                      Cómo llegar
                    </Button>
                  </div>
                  {residence.address && residence.coordinates ? (
                    <>
                      <p className="text-muted-foreground mb-4 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {residence.address}
                      </p>
                      <div className="h-80 rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(residence.address)}&zoom=15`}
                          allowFullScreen
                        />
                      </div>
                    </>
                  ) : (
                    <div className="h-80 rounded-lg bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Ubicación pendiente</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center pb-4 border-b border-border">
                      <p className="text-2xl font-bold text-primary">{residence.priceRange}</p>
                      <p className="text-sm text-muted-foreground">Precio mensual</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Capacidad:</span>
                        <span className="font-medium flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {residence.capacity} plazas
                        </span>
                      </div>
                      {residence.stayTypes && residence.stayTypes.length > 0 && (
                        <div>
                          <span className="text-muted-foreground text-sm">Tipos de estadía:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {residence.stayTypes.map((type, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs capitalize">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-border">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Información de contacto
                    </h3>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      {residence.phone && (
                        <a href={`tel:${residence.phone}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{residence.phone}</span>
                        </a>
                      )}
                      {residence.whatsapp && (
                        <a href={whatsappLink || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <MessageCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <span className="font-medium">{residence.whatsapp}</span>
                        </a>
                      )}
                      {residence.email && (
                        <a href={`mailto:${residence.email}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium break-all">{residence.email}</span>
                        </a>
                      )}
                      {residence.website && (
                        <a href={residence.website.startsWith('http') ? residence.website : `https://${residence.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Globe className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{residence.website}</span>
                        </a>
                      )}
                      {residence.schedule && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{residence.schedule}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Social Links */}
                    {(residence.facebook || residence.instagram) && (
                      <div className="flex gap-2 pt-3 border-t border-border">
                        {residence.facebook && (
                          <a
                            href={`https://facebook.com/${residence.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-muted hover:bg-blue-100 transition-colors"
                          >
                            <Facebook className="h-5 w-5 text-blue-600" />
                          </a>
                        )}
                        {residence.instagram && (
                          <a
                            href={`https://instagram.com/${residence.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-muted hover:bg-pink-100 transition-colors"
                          >
                            <Instagram className="h-5 w-5 text-pink-600" />
                          </a>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Solicitar información</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input 
                          id="name" 
                          required 
                          value={contactForm.nombre}
                          onChange={(e) => setContactForm(prev => ({ ...prev, nombre: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={contactForm.telefono}
                          onChange={(e) => setContactForm(prev => ({ ...prev, telefono: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea 
                          id="message" 
                          rows={3} 
                          placeholder="Cuéntanos tus necesidades..."
                          value={contactForm.mensaje}
                          onChange={(e) => setContactForm(prev => ({ ...prev, mensaje: e.target.value }))}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Enviar consulta
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

      <SendMethodDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        formData={contactForm}
        recipientEmail={residence.email || "hola@integraresidenciales.com.uy"}
        recipientWhatsApp={residence.whatsapp ? `598${residence.whatsapp.replace(/\D/g, '')}` : "59899923330"}
        subject={`Consulta sobre ${residence.name}`}
      />
    </div>
  );
};

export default ResidenceDetail;