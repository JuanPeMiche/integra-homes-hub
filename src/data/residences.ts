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
    name: "Residencial María Gracia",
    type: "privada",
    city: "Cordón",
    province: "Montevideo",
    address: "Gaboto 1577, Cordón, Montevideo",
    price: 45000,
    priceRange: "desde $45.000/mes",
    capacity: 60,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
      "https://images.unsplash.com/photo-1559209172-8b9c41679187?w=800&q=80",
      "https://images.unsplash.com/photo-1584622781867-b0bc5362a709?w=800&q=80",
    ],
    description: "Residencial María Gracia ofrece atención personalizada y cuidados de excelencia en el corazón de Montevideo. Contamos con instalaciones modernas, amplios espacios comunes y un equipo profesional dedicado al bienestar integral de nuestros residentes.",
    services: [
      "Enfermería 24h",
      "Médico de cabecera",
      "Fisioterapia",
      "Terapia Ocupacional",
      "Podología",
      "Peluquería",
      "Actividades recreativas",
      "Wi-Fi",
    ],
    facilities: [
      "Jardín",
      "Sala de estar",
      "Biblioteca",
      "Comedor amplio",
      "Accesibilidad completa",
      "Habitaciones individuales y compartidas",
    ],
    coordinates: { lat: -34.9011, lng: -56.1882 },
    phone: "2908 0000",
    email: "contacto@mariagracia.com.uy",
    schedule: "Horario de visitas: L-D de 10:00 a 20:00",
  },
  {
    id: "2",
    name: "Residencial Empatía",
    type: "privada",
    city: "Prado",
    province: "Montevideo",
    address: "Millán 4321, Prado, Montevideo",
    price: 42000,
    priceRange: "desde $42.000/mes",
    capacity: 80,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    ],
    description: "Residencial Empatía combina calidez humana con profesionalismo en el cuidado de adultos mayores. Ubicado en el tranquilo barrio del Prado, ofrecemos un ambiente familiar y seguro con más de 15 años de trayectoria.",
    services: [
      "Enfermería permanente",
      "Atención médica",
      "Fisioterapia",
      "Actividades sociales",
      "Alimentación especial",
      "Atención psicológica",
    ],
    facilities: [
      "Amplios jardines",
      "Salas de estar",
      "Comedor",
      "Sala de actividades",
      "Capilla",
    ],
    coordinates: { lat: -34.8686, lng: -56.2033 },
    phone: "2336 7890",
    email: "info@empatia.com.uy",
    schedule: "Horario de visitas: L-D de 9:00 a 21:00",
  },
  {
    id: "3",
    name: "Las 2 Hermanas",
    type: "privada",
    city: "Punta Gorda",
    province: "Montevideo",
    address: "José Martí 3456, Punta Gorda, Montevideo",
    price: 50000,
    priceRange: "desde $50.000/mes",
    capacity: 45,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    ],
    description: "Residencial Las 2 Hermanas es reconocido por su atención personalizada y ambiente hogareño. Situado en el exclusivo barrio de Punta Gorda, cerca de la costa, brindamos cuidados de excelencia con un trato familiar.",
    services: [
      "Enfermería 24h",
      "Médico especialista",
      "Rehabilitación",
      "Actividades culturales",
      "Nutrición personalizada",
      "Transporte a consultas",
    ],
    facilities: [
      "Vista al mar",
      "Jardín amplio",
      "Sala de lectura",
      "Comedor gourmet",
      "Habitaciones con baño privado",
    ],
    coordinates: { lat: -34.8908, lng: -56.0783 },
    phone: "2600 1234",
    email: "contacto@las2hermanas.com.uy",
    schedule: "Horario de visitas: L-D de 10:00 a 19:00",
  },
  {
    id: "4",
    name: "Árbol de la Vida",
    type: "privada",
    city: "La Blanqueada",
    province: "Montevideo",
    address: "Blvr. Artigas 2100, La Blanqueada, Montevideo",
    price: 48000,
    priceRange: "desde $48.000/mes",
    capacity: 70,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    ],
    description: "Árbol de la Vida ofrece atención integral en un entorno verde y tranquilo. Con instalaciones modernas y un equipo multidisciplinario, nos enfocamos en la calidad de vida y el bienestar emocional de cada residente.",
    services: [
      "Enfermería 24h",
      "Médico geriatra",
      "Fisioterapia",
      "Terapia ocupacional",
      "Podología",
      "Peluquería",
      "Musicoterapia",
      "Actividades recreativas",
    ],
    facilities: [
      "Parque arbolado",
      "Gimnasio adaptado",
      "Biblioteca",
      "Sala multimedia",
      "Comedor principal",
      "Cafetería",
    ],
    coordinates: { lat: -34.8897, lng: -56.1514 },
    phone: "2480 5678",
    email: "info@arboldelavida.com.uy",
    schedule: "Horario de visitas: L-D de 9:00 a 22:00",
  },
  {
    id: "5",
    name: "Hostería Uruguay",
    type: "privada",
    city: "Ciudad de la Costa",
    province: "Canelones",
    address: "Av. Giannattasio Km 21, Ciudad de la Costa, Canelones",
    price: 38000,
    priceRange: "desde $38.000/mes",
    capacity: 55,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1581579438480-6f3c4d3c58c4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581579438480-6f3c4d3c58c4?w=800&q=80",
    ],
    description: "Hostería Uruguay combina cuidados de calidad con un entorno costero privilegiado. Nuestras instalaciones permiten disfrutar de la proximidad al mar mientras reciben atención profesional y personalizada.",
    services: [
      "Enfermería permanente",
      "Fisioterapia",
      "Actividades al aire libre",
      "Alimentación balanceada",
      "Atención médica",
    ],
    facilities: [
      "Cercanía a la playa",
      "Jardines amplios",
      "Sala de estar",
      "Comedor",
      "Zona de descanso",
    ],
    coordinates: { lat: -34.8214, lng: -55.9482 },
    phone: "2682 3456",
    email: "contacto@hosteriauruguay.com.uy",
    schedule: "Horario de visitas: L-D de 10:00 a 20:00",
  },
  {
    id: "6",
    name: "Residencial Santa Rosa",
    type: "privada",
    city: "Colonia del Sacramento",
    province: "Colonia",
    address: "General Flores 234, Colonia del Sacramento",
    price: 35000,
    priceRange: "desde $35.000/mes",
    capacity: 40,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
    ],
    description: "Residencial Santa Rosa ofrece un ambiente tranquilo y acogedor en la histórica ciudad de Colonia. Con atención personalizada y un equipo comprometido, garantizamos el bienestar de nuestros residentes.",
    services: [
      "Enfermería 24h",
      "Médico de cabecera",
      "Fisioterapia",
      "Actividades recreativas",
      "Wi-Fi",
    ],
    facilities: [
      "Patio interno",
      "Sala de estar",
      "Comedor",
      "Zona verde",
    ],
    coordinates: { lat: -34.4628, lng: -57.8394 },
    phone: "4522 1234",
    email: "info@santarosa.com.uy",
    schedule: "Horario de visitas: L-D de 10:00 a 19:00",
  },
];
