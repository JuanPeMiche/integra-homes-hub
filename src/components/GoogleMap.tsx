import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Residence } from '@/data/residences';
import { MapPin } from 'lucide-react';

interface GoogleMapComponentProps {
  residences: Residence[];
  onMarkerClick?: (residence: Residence) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -34.8833,
  lng: -56.1667
};

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  }
];

export const GoogleMapComponent = ({ residences, onMarkerClick }: GoogleMapComponentProps) => {
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    if (residences.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      residences.forEach(residence => {
        bounds.extend({
          lat: residence.coordinates.lat,
          lng: residence.coordinates.lng
        });
      });
      map.fitBounds(bounds);
    }
  }, [residences]);

  const handleMarkerClick = (residence: Residence) => {
    setSelectedResidence(residence);
    onMarkerClick?.(residence);
  };

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <div className="text-center space-y-2 p-4">
          <MapPin className="h-12 w-12 mx-auto text-destructive" />
          <p className="text-sm text-muted-foreground">Error al cargar el mapa</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <div className="text-center space-y-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-sm text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      options={{
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      }}
    >
      {residences.map((residence) => (
        <Marker
          key={residence.id}
          position={{
            lat: residence.coordinates.lat,
            lng: residence.coordinates.lng
          }}
          onClick={() => handleMarkerClick(residence)}
          icon={{
            url: 'data:image/svg+xml,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#0891b2" stroke="white" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3" fill="white"></circle>
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40),
          }}
        />
      ))}

      {selectedResidence && (
        <InfoWindow
          position={{
            lat: selectedResidence.coordinates.lat,
            lng: selectedResidence.coordinates.lng
          }}
          onCloseClick={() => setSelectedResidence(null)}
        >
          <div className="p-2 min-w-[200px]">
            <div className="flex gap-3">
              <img 
                src={selectedResidence.image} 
                alt={selectedResidence.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold text-sm text-gray-900">{selectedResidence.name}</h4>
                <p className="text-xs text-gray-600">{selectedResidence.city}, {selectedResidence.province}</p>
                <p className="text-xs font-medium text-cyan-600 mt-1">{selectedResidence.priceRange}</p>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
