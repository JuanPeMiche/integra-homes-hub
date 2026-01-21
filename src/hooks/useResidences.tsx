import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Director {
  id: string;
  name: string;
  role: string;
  photo_url?: string;
}

export interface Residence {
  id: string;
  name: string;
  type: "publica" | "privada" | "concertada";
  city: string;
  province: string;
  address: string;
  price: number;
  priceRange: string;
  capacity: number;
  rating: number;
  transparency: number;
  image: string;
  images: string[];
  description: string;
  services: string[];
  facilities: string[];
  activities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  emails: string[];
  schedule: string;
  redIntegra: boolean;
  website?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  stayTypes?: string[];
  admissions?: string[];
  certifications?: string[];
  logoUrl?: string;
  mapsUrl?: string;
  directors?: Director[];
  videoUrls?: string[];
  secondaryName?: string;
  additionalPhones?: string[];
  additionalWhatsapps?: string[];
  additionalAddresses?: string[];
  additionalCities?: string[];
  fireCertification?: string;
  isHidden?: boolean;
}

// Calculate transparency rating based on criteria:
// ⭐ Servicios disponibles
// ⭐⭐ Fotos de instalaciones (min 5)
// ⭐⭐⭐ Página web
// ⭐⭐⭐⭐ Habilitaciones/certifications
// ⭐⭐⭐⭐⭐ Directivos y equipo responsable
const calculateTransparency = (row: any, directors: any[] = []): number => {
  let stars = 0;
  
  // ⭐ Servicios disponibles
  if (row.services && row.services.length > 0) {
    stars += 1;
  }
  
  // ⭐⭐ Fotos de instalaciones en buena calidad (min.5)
  if (row.images && row.images.length >= 5) {
    stars += 1;
  }
  
  // ⭐⭐⭐ Página web
  if (row.website && row.website.trim() !== '') {
    stars += 1;
  }
  
  // ⭐⭐⭐⭐ Habilitaciones/Certificaciones
  if (row.certifications && row.certifications.length > 0) {
    stars += 1;
  }
  
  // ⭐⭐⭐⭐⭐ Directivos y equipo responsable
  if (directors && directors.length > 0) {
    stars += 1;
  }
  
  return stars;
};

// Transform database row to frontend format
const transformResidence = (row: any, directors: any[] = []): Residence => {
  const transparency = calculateTransparency(row, directors);
  
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    city: row.city,
    province: row.province,
    address: row.address,
    price: row.price || 0,
    priceRange: row.price_range || 'Consultar',
    capacity: row.capacity || 0,
    rating: parseFloat(row.rating) || 0,
    transparency,
  image: row.image || '',
  images: row.images || [],
  description: row.description || '',
  services: row.services || [],
  facilities: row.facilities || [],
  activities: row.activities || [],
  coordinates: {
    lat: parseFloat(row.coordinates_lat) || 0,
    lng: parseFloat(row.coordinates_lng) || 0,
  },
  phone: row.phone || '',
  email: row.email || '',
  emails: row.emails || [],
  schedule: row.schedule || '',
  redIntegra: row.red_integra || false,
  website: row.website,
  facebook: row.facebook,
  instagram: row.instagram,
  whatsapp: row.whatsapp,
  stayTypes: row.stay_types || [],
  admissions: row.admissions || [],
  certifications: row.certifications || [],
    logoUrl: row.logo_url,
    mapsUrl: row.maps_url,
    directors: directors.map(d => ({
      id: d.id,
      name: d.name,
      role: d.role,
      photo_url: d.photo_url,
    })),
    videoUrls: row.video_urls || [],
    secondaryName: row.secondary_name,
    additionalPhones: row.phones || [],
    additionalWhatsapps: row.whatsapps || [],
    additionalAddresses: row.addresses || [],
    additionalCities: row.cities || [],
    fireCertification: row.fire_certification,
    isHidden: row.is_hidden || false,
  };
};

export const useResidences = () => {
  return useQuery({
    queryKey: ['residences'],
    queryFn: async (): Promise<Residence[]> => {
      // Fetch residences
      const { data: residences, error: resError } = await supabase
        .from('residences')
        .select('*')
        .order('name');

      if (resError) throw resError;

      // Fetch all directors
      const { data: directors, error: dirError } = await supabase
        .from('residence_directors')
        .select('*')
        .order('display_order');

      if (dirError) throw dirError;

      // Group directors by residence_id
      const directorsByResidence: Record<string, any[]> = {};
      directors?.forEach(d => {
        if (!directorsByResidence[d.residence_id]) {
          directorsByResidence[d.residence_id] = [];
        }
        directorsByResidence[d.residence_id].push(d);
      });

      // Transform and return, filtering out hidden residences
      return (residences || [])
        .filter(r => !r.is_hidden)
        .map(r => transformResidence(r, directorsByResidence[r.id] || []));
    },
  });
};

export const useResidence = (id: string) => {
  return useQuery({
    queryKey: ['residence', id],
    queryFn: async (): Promise<Residence | null> => {
      const { data: residence, error: resError } = await supabase
        .from('residences')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (resError) throw resError;
      if (!residence) return null;

      const { data: directors, error: dirError } = await supabase
        .from('residence_directors')
        .select('*')
        .eq('residence_id', id)
        .order('display_order');

      if (dirError) throw dirError;

      return transformResidence(residence, directors || []);
    },
    enabled: !!id,
  });
};

// Helper hooks for filters
export const useProvinces = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from('residences')
        .select('province')
        .order('province');

      if (error) throw error;

      const unique = [...new Set(data?.map(r => r.province) || [])];
      return unique.sort();
    },
  });
};

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from('residences')
        .select('city')
        .order('city');

      if (error) throw error;

      const unique = [...new Set(data?.map(r => r.city) || [])];
      return unique.sort();
    },
  });
};