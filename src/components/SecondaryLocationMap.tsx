import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SecondaryLocationMapProps {
  address: string;
  locationName?: string;
  city?: string;
  className?: string;
}

export function SecondaryLocationMap({
  address,
  locationName,
  city,
  className,
}: SecondaryLocationMapProps) {
  const fullAddress = city ? `${address}, ${city}, Uruguay` : `${address}, Uruguay`;
  
  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
      "_blank"
    );
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-secondary" />
            {locationName || "Sede Adicional"} - Ubicación
          </h3>
          <Button size="sm" variant="secondary" className="gap-2" onClick={openGoogleMaps}>
            <Navigation className="h-4 w-4" />
            Cómo llegar
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {address}
          {city && <span className="text-muted-foreground">- {city}</span>}
        </p>
        
        <div className="h-64 rounded-lg overflow-hidden border">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(fullAddress)}&zoom=15`}
            allowFullScreen
            title={`Mapa de ${locationName || "sede adicional"}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
