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
} from "lucide-react";
import { mockResidences, Director } from "@/data/residences";

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
  const residence = mockResidences.find((r) => r.id === id);
  const [contactForm, setContactForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [showSendDialog, setShowSendDialog] = useState(false);

  if (!residence) {
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

  // Build directors list from legacy or new format
  const getDirectors = (): Director[] => {
    if (residence.directors && residence.directors.length > 0) {
      return residence.directors;
    }
    if (residence.director) {
      return [{
        name: residence.director,
        role: residence.directorTitle || "Director/a",
        photoUrl: undefined
      }];
    }
    return [];
  };

  const directors = getDirectors();

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
                    <Badge className="bg-primary text-primary-foreground">
                      {typeLabels[residence.type]}
                    </Badge>
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
                  <h2 className="text-2xl font-bold mb-4">Servicios disponibles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {residence.services.map((service, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
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
                      <div key={idx} className="flex items-start gap-2">
                        <Building className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
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
                          {director.photoUrl ? (
                            <img 
                              src={director.photoUrl} 
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
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Información de contacto</h3>
                    <div className="space-y-3 text-sm">
                      {residence.phone && (
                        <a href={`tel:${residence.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                          <Phone className="h-4 w-4 text-primary" />
                          <span>{residence.phone}</span>
                        </a>
                      )}
                      {residence.whatsapp && (
                        <a href={whatsappLink || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-600 transition-colors">
                          <MessageCircle className="h-4 w-4 text-green-600" />
                          <span>{residence.whatsapp}</span>
                        </a>
                      )}
                      {residence.email && (
                        <a href={`mailto:${residence.email}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="truncate">{residence.email}</span>
                        </a>
                      )}
                      {residence.website && (
                        <a 
                          href={residence.website.startsWith('http') ? residence.website : `https://${residence.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-3 hover:text-primary transition-colors"
                        >
                          <Globe className="h-4 w-4 text-primary" />
                          <span className="truncate">{residence.website}</span>
                        </a>
                      )}
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{residence.schedule}</span>
                      </div>
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