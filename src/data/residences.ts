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
  image: string;
  images: string[];
  description: string;
  services: string[];
  facilities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  schedule: string;
}

export const mockResidences: Residence[] = [
  {
    id: "1",
    name: "Residencia Los Álamos",
    type: "privada",
    city: "Madrid",
    province: "Madrid",
    address: "Calle Principal 123, 28001 Madrid",
    price: 1800,
    priceRange: "desde 1.800 €/mes",
    capacity: 80,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
      "https://images.unsplash.com/photo-1559209172-8b9c41679187?w=800&q=80",
      "https://images.unsplash.com/photo-1584622781867-b0bc5362a709?w=800&q=80",
    ],
    description: "Residencia Los Álamos es un centro moderno ubicado en el corazón de Madrid, que ofrece atención personalizada a personas mayores. Nuestras instalaciones cuentan con amplios jardines, habitaciones confortables y un equipo profesional dedicado al bienestar de nuestros residentes.",
    services: [
      "Enfermería 24h",
      "Médico Propio",
      "Fisioterapia",
      "Terapia Ocupacional",
      "Podología",
      "Peluquería",
      "Transporte a citas médicas",
    ],
    facilities: [
      "Jardín",
      "Gimnasio",
      "Biblioteca",
      "Sala de televisión",
      "Comedor",
      "Accesibilidad completa",
    ],
    coordinates: { lat: 40.4168, lng: -3.7038 },
    phone: "910 123 456",
    email: "info@losalamos.com",
    schedule: "Horario de visitas: L-D de 10:00 a 20:00",
  },
  {
    id: "2",
    name: "Centro Geriátrico San José",
    type: "concertada",
    city: "Barcelona",
    province: "Barcelona",
    address: "Avinguda Diagonal 456, 08029 Barcelona",
    price: 1500,
    priceRange: "desde 1.500 €/mes",
    capacity: 120,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    ],
    description: "Centro Geriátrico San José combina tradición y modernidad en el cuidado de personas mayores. Con más de 30 años de experiencia, ofrecemos un entorno familiar y acogedor con servicios de primera calidad.",
    services: [
      "Enfermería 24h",
      "Fisioterapia",
      "Actividades Recreativas",
      "Atención Psicológica",
      "Comedor propio",
    ],
    facilities: [
      "Terraza",
      "Sala de actividades",
      "Capilla",
      "Ascensores",
    ],
    coordinates: { lat: 41.3874, lng: 2.1686 },
    phone: "932 456 789",
    email: "contacto@sanjose.com",
    schedule: "Horario de visitas: L-D de 9:00 a 21:00",
  },
  {
    id: "3",
    name: "Residencia Virgen del Carmen",
    type: "publica",
    city: "Valencia",
    province: "Valencia",
    address: "Calle de la Paz 78, 46003 Valencia",
    price: 1200,
    priceRange: "desde 1.200 €/mes",
    capacity: 100,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    ],
    description: "Residencia pública con un enfoque en el cuidado integral de las personas mayores. Ofrecemos servicios de calidad a precios accesibles, manteniendo siempre el respeto y la dignidad de nuestros residentes.",
    services: [
      "Enfermería 24h",
      "Médico Propio",
      "Rehabilitación",
      "Actividades diarias",
    ],
    facilities: [
      "Jardín interior",
      "Sala común",
      "Comedor",
    ],
    coordinates: { lat: 39.4699, lng: -0.3763 },
    phone: "963 789 012",
    email: "info@virgendelcarmen.es",
    schedule: "Horario de visitas: L-D de 10:00 a 19:00",
  },
  {
    id: "4",
    name: "Residencia El Pinar",
    type: "privada",
    city: "Sevilla",
    province: "Sevilla",
    address: "Avenida de la Innovación 25, 41020 Sevilla",
    price: 2000,
    priceRange: "desde 2.000 €/mes",
    capacity: 60,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    ],
    description: "El Pinar es una residencia boutique que ofrece atención de lujo en un entorno natural. Ubicada en una zona privilegiada de Sevilla, combinamos tecnología avanzada con cuidados personalizados.",
    services: [
      "Enfermería 24h",
      "Médico Propio",
      "Fisioterapia",
      "Terapia Ocupacional",
      "Podología",
      "Peluquería",
      "Nutricionista",
      "Actividades culturales",
    ],
    facilities: [
      "Piscina",
      "Jardín botánico",
      "Gimnasio equipado",
      "Biblioteca",
      "Sala multimedia",
      "Terraza panorámica",
    ],
    coordinates: { lat: 37.3891, lng: -5.9845 },
    phone: "954 321 654",
    email: "info@elpinar.es",
    schedule: "Horario de visitas: L-D de 9:00 a 22:00",
  },
  {
    id: "5",
    name: "Centro de Mayores La Esperanza",
    type: "concertada",
    city: "Málaga",
    province: "Málaga",
    address: "Calle Larios 89, 29015 Málaga",
    price: 1600,
    priceRange: "desde 1.600 €/mes",
    capacity: 90,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1581579438480-6f3c4d3c58c4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581579438480-6f3c4d3c58c4?w=800&q=80",
    ],
    description: "La Esperanza es un centro que combina cuidados de calidad con un ambiente mediterráneo único. Cerca del mar, ofrecemos una experiencia de vida plena para nuestros mayores.",
    services: [
      "Enfermería 24h",
      "Fisioterapia",
      "Centro de Día",
      "Actividades al aire libre",
      "Terapia con animales",
    ],
    facilities: [
      "Terraza con vistas al mar",
      "Sala de fisioterapia",
      "Zona de descanso",
      "Comedor amplio",
    ],
    coordinates: { lat: 36.7213, lng: -4.4214 },
    phone: "952 654 987",
    email: "contacto@laesperanza.com",
    schedule: "Horario de visitas: L-D de 10:00 a 20:00",
  },
];
