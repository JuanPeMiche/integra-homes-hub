import { MapPin, Users, Star, CheckCircle, Phone, MessageCircle, Globe, Facebook, Instagram, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Residence } from "@/data/residences";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface ResidenceCardProps {
  residence: Residence;
  onCompare?: (id: string) => void;
  isComparing?: boolean;
  showFavorite?: boolean;
}

const transparencyCriteria = [
  "Servicios disponibles",
  "Fotos de instalaciones (mín. 5)",
  "Página web",
  "Habilitaciones",
  "Directivos y equipo responsable"
];

const TransparencyStars = ({ rating }: { rating: number }) => {
  if (rating === 0) {
    return (
      <span className="text-xs text-muted-foreground italic">Sin datos</span>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="font-medium mb-2">Índice de transparencia: {rating}/5</p>
          <ul className="text-xs space-y-1">
            {transparencyCriteria.map((criteria, idx) => (
              <li key={idx} className="flex items-center gap-1">
                <span className={idx < rating ? "text-yellow-400" : "text-muted-foreground"}>
                  {idx < rating ? "✓" : "○"}
                </span>
                {criteria}
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Generate initials from residence name
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
};

export const ResidenceCard = ({ residence, onCompare, isComparing, showFavorite = true }: ResidenceCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(residence.id);

  const typeLabels = {
    publica: "Pública",
    privada: "Privada",
    concertada: "Concertada",
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(residence.id);
  };

  return (
    <Card className="overflow-hidden card-hover group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <div className="relative h-48 overflow-hidden">
        <img
          src={residence.image}
          alt={residence.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {residence.redIntegra && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-soft">
            <CheckCircle className="h-4 w-4 text-secondary" />
            <span className="text-xs font-semibold text-foreground">Red Integra</span>
          </div>
        )}
        
        {/* Logo/thumbnail - bottom left corner - use cover image if no logo */}
        <div className="absolute bottom-3 left-3">
          {residence.logoUrl ? (
            <img 
              src={residence.logoUrl} 
              alt={`Logo ${residence.name}`}
              className="h-12 w-12 rounded-lg bg-white object-contain shadow-md p-1"
            />
          ) : residence.image ? (
            <img 
              src={residence.image} 
              alt={residence.name}
              className="h-12 w-12 rounded-lg bg-white object-cover shadow-md"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{getInitials(residence.name)}</span>
            </div>
          )}
        </div>

        {/* Favorite button - bottom right corner */}
        {showFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute bottom-3 right-3 p-2 rounded-full shadow-md transition-all",
              isFav 
                ? "bg-red-500 text-white" 
                : "bg-white/95 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:bg-white"
            )}
          >
            <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
          </button>
        )}
      </div>

      <CardContent className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {residence.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{residence.city}, {residence.province}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TransparencyStars rating={residence.transparency} />
            <span className="text-xs text-muted-foreground">Transparencia</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Users className="h-4 w-4" />
            <span>{residence.capacity} plazas</span>
          </div>
        </div>

        {/* Contact Icons */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          {residence.phone && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`tel:${residence.phone}`}
                    className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="h-4 w-4 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Llamar: {residence.phone}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {residence.whatsapp && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`https://wa.me/598${residence.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-green-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>WhatsApp: {residence.whatsapp}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {residence.website && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={residence.website.startsWith('http') ? residence.website : `https://${residence.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe className="h-4 w-4 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sitio web</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {residence.facebook && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`https://facebook.com/${residence.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-blue-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Facebook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {residence.instagram && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`https://instagram.com/${residence.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-pink-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram className="h-4 w-4 text-pink-600" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Instagram</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {residence.services.slice(0, 2).map((service, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="text-xs font-medium rounded-full px-2.5 py-0.5 bg-secondary/10 text-secondary border-0"
            >
              {service.length > 18 ? service.substring(0, 18) + '…' : service}
            </Badge>
          ))}
          {residence.services.length > 2 && (
            <Badge 
              variant="outline" 
              className="text-xs font-medium rounded-full px-2.5 py-0.5"
            >
              +{residence.services.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-2">
        <Button
          className="flex-1 btn-press"
          onClick={() => navigate(`/residencia/${residence.id}`)}
        >
          Ver ficha
        </Button>
        {onCompare && (
          <Button
            variant={isComparing ? "secondary" : "outline"}
            onClick={(e) => {
              e.stopPropagation();
              onCompare(residence.id);
            }}
            className="px-3"
          >
            {isComparing ? "✓" : "+"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};