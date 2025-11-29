import { MapPin, Euro, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Residence } from "@/data/residences";
import { useNavigate } from "react-router-dom";

interface ResidenceCardProps {
  residence: Residence;
  onCompare?: (id: string) => void;
  isComparing?: boolean;
}

export const ResidenceCard = ({ residence, onCompare, isComparing }: ResidenceCardProps) => {
  const navigate = useNavigate();

  const typeLabels = {
    publica: "Pública",
    privada: "Privada",
    concertada: "Concertada",
  };

  return (
    <Card className="overflow-hidden hover:shadow-soft transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={residence.image}
          alt={residence.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {typeLabels[residence.type]}
        </Badge>
      </div>

      <CardContent className="p-5 space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">{residence.name}</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" />
            <span>{residence.city}, {residence.province}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{residence.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Users className="h-4 w-4" />
            <span>{residence.capacity} plazas</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 pt-2">
          <Euro className="h-4 w-4 text-primary" />
          <span className="text-2xl font-bold text-primary">{residence.price}</span>
          <span className="text-sm text-muted-foreground">/mes</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {residence.services.slice(0, 3).map((service, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {residence.services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{residence.services.length - 3} más
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-2">
        <Button
          className="flex-1"
          onClick={() => navigate(`/residencia/${residence.id}`)}
        >
          Ver Detalles
        </Button>
        {onCompare && (
          <Button
            variant={isComparing ? "secondary" : "outline"}
            onClick={() => onCompare(residence.id)}
          >
            {isComparing ? "Comparando" : "Comparar"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
