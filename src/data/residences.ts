export interface Director {
  name: string;
  role: string;
  photoUrl?: string;
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
  transparency: number; // 0-5 stars
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
  emails?: string[];
  schedule: string;
  redIntegra: boolean;
  website?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  stayTypes?: string[]; // permanente, temporal, diurna
  admissions?: string[]; // encamados, demencia, silla de ruedas
  certifications?: string[]; // MSP, MIDES, Bomberos
  director?: string;
  directorTitle?: string;
  // New fields
  logoUrl?: string;
  directors?: Director[];
  mapsUrl?: string;
  staffRatio?: {
    ratio: string;
    description: string;
    categories: string[];
  };
}

// Helper to get all unique barrios
export const getAllBarrios = (): string[] => {
  const barrios = new Set(mockResidences.map(r => r.city));
  return Array.from(barrios).sort();
};

// Helper to get all unique provinces
export const getAllProvinces = (): string[] => {
  const provinces = new Set(mockResidences.map(r => r.province));
  return Array.from(provinces).sort();
};

export const mockResidences: Residence[] = [
  {
    id: "1",
    name: "Abuela Lalá",
    type: "privada",
    city: "Parque Rodó",
    province: "Montevideo",
    address: "Juan Manuel Blanes 1125, Parque Rodó, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.8,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80"
    ],
    description: "Un hogar lleno de amor para el adulto mayor. Casa de época remodelada con encanto arquitectónico: entrada señorial con vitrales, claraboyas, hogar a leña y patio español con aljibe y parra.",
    services: [
      "Estadías diurnas, temporales y permanentes",
      "Enfermería 24/7",
      "Administración de medicamentos",
      "Médico de referencia",
      "Menú diario balanceado",
      "Diarios y revistas",
      "Biblioteca variada",
      "Ludoteca con películas clásicas",
      "Visitas libres",
      "Llamadas sin costo",
      "Servicio al cuarto",
      "WiFi",
      "Asesoramiento legal",
      "Pedicura y manicura",
      "Peluquería"
    ],
    facilities: [
      "Casa de época con vitrales",
      "Claraboyas luminosas",
      "Hogar a leña",
      "Patio español con aljibe",
      "Parra y árboles frutales",
      "Parrillero"
    ],
    coordinates: { lat: -34.9108, lng: -56.1683 },
    phone: "24113599",
    email: "info@residencialabuelalala.com",
    schedule: "Visitas libres",
    redIntegra: true,
    whatsapp: "099667218",
    website: "residencialabuelalala.com",
    stayTypes: ["permanente", "temporal", "diurna"],
    certifications: ["MSP"],
    directors: [
      { name: "María Elena Fernández", role: "Directora General" },
      { name: "Dr. Carlos Suárez", role: "Médico de Referencia" }
    ]
  },
  {
    id: "2",
    name: "Aguas de Reposo",
    type: "privada",
    city: "Carrasco",
    province: "Montevideo",
    address: "Av. Italia 6527, Carrasco, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.7,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-60ef4310dd9f?w=800&q=80",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80"
    ],
    description: "Ubicado en una gran casa en Carrasco, rodeada de verde, con amplias comodidades. Gestionado por un equipo sólido y atento, con el objetivo de brindar paz y un buen vivir. Estilo cálido y colorido que transmite calma y alegría.",
    services: [
      "Cocinera propia con platos caseros",
      "4 comidas diarias + colaciones",
      "Menús adaptados y sin sal",
      "Peluquería",
      "Fisioterapia",
      "Odontología",
      "Podología",
      "Talleres de plástica y música",
      "Gimnasia",
      "Fiestas temáticas"
    ],
    facilities: [
      "Jardines verdes",
      "Habitaciones individuales y compartidas",
      "Baños adaptados para sillas de ruedas",
      "Iluminación natural abundante",
      "Ambientes climatizados",
      "Gran patio trasero"
    ],
    coordinates: { lat: -34.8708, lng: -56.0583 },
    phone: "26040203",
    email: "info@aguasdereposo.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "099689336",
    facebook: "aguasdereposo",
    stayTypes: ["permanente", "temporal"],
    admissions: ["silla de ruedas"],
    directors: [
      { name: "Lic. Laura Martínez", role: "Directora Técnica" },
      { name: "Enf. Patricia Gómez", role: "Jefa de Enfermería" }
    ]
  },
  {
    id: "3",
    name: "Alborada",
    type: "privada",
    city: "Goes",
    province: "Montevideo",
    address: "Martin C. Martinez 2593, Goes, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.5,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    ],
    description: "Residencial con equipo dedicado, instalaciones cómodas, actividades recreativas y culturales, dieta equilibrada. Prioridad en salud y seguridad 24 horas. Misión: brindar un hogar con amor y atención, calidad de vida, seguridad y bienestar.",
    services: [
      "Atención 24 horas",
      "Alimentación equilibrada",
      "Actividades recreativas",
      "Actividades culturales",
      "Seguridad permanente"
    ],
    facilities: [
      "Instalaciones cómodas",
      "Espacios comunes",
      "Áreas de actividades"
    ],
    coordinates: { lat: -34.8797, lng: -56.1914 },
    phone: "094381658",
    email: "info@alborada.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "094381658",
    director: "Sra. Ana María García",
    directorTitle: "Directora",
    stayTypes: ["permanente"],
    directors: [
      { name: "Sra. Ana María García", role: "Directora" }
    ]
  },
  {
    id: "4",
    name: "Altos del Parque",
    type: "privada",
    city: "Parque Batlle",
    province: "Montevideo",
    address: "Av. Dr. Américo Ricaldoni 1748 esquina Cataluña, Parque Batlle, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 35,
    rating: 4.8,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80"
    ],
    description: "Ubicado en el corazón de Parque Batlle, ideal para estadías permanentes, temporales y de rehabilitación. Más de 18 años de experiencia. El concepto de familia es lo que los caracteriza.",
    services: [
      "Peluquería mensual (corte, brushing, color)",
      "Podología y manicura",
      "Lavandería completa",
      "Cadetería",
      "Cafetería",
      "Menú por nutricionistas",
      "Cuidado personal 24h",
      "Fisioterapia (2x semana)",
      "Talleres psicosociales",
      "Jardinería y huerta",
      "Taller literario",
      "Musicoterapia",
      "Gimnasia grupal",
      "Paseos dirigidos"
    ],
    facilities: [
      "Living y comedor acondicionados",
      "TV cable, WiFi, calefacción y A/C",
      "Gran jardín con espacios verdes",
      "Dormitorios amplios y luminosos",
      "Baños adaptados"
    ],
    coordinates: { lat: -34.8908, lng: -56.1583 },
    phone: "",
    email: "info@residencialaltosdelparque.com",
    schedule: "Atención 24 horas",
    redIntegra: true,
    website: "residencialaltosdelparque.com",
    stayTypes: ["permanente", "temporal"],
    certifications: ["MSP", "MIDES"]
  },
  {
    id: "5",
    name: "Casa Nostra",
    type: "privada",
    city: "Lagomar",
    province: "Canelones",
    address: "Rambla Costanera, Manzana 1 Solar 26, Lagomar",
    price: 0,
    priceRange: "Consultar",
    capacity: 25,
    rating: 4.8,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-60ef4310dd9f?w=800&q=80"
    ],
    description: "Residencial de excelencia frente al mar, ofrece estancias permanentes y temporales. Equipo interdisciplinario altamente calificado y comprometido con brindar atención segura y de calidad.",
    services: [
      "Estadías permanentes, temporarias y diurnas",
      "Habitaciones dobles o individuales con vista al mar",
      "Aire acondicionado en todas las habitaciones",
      "Valoración geriátrica integral",
      "Enfermería",
      "Fisioterapia",
      "Podología",
      "Control odontológico",
      "WiFi",
      "Peluquería y maquillaje",
      "Lavandería"
    ],
    facilities: [
      "Grandes ventanales con vista al mar",
      "Habitaciones en planta baja",
      "Áreas de recreación"
    ],
    coordinates: { lat: -34.8314, lng: -55.9182 },
    phone: "26812838",
    email: "info@casanostraresidencial.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "098473580",
    website: "casanostraresidencial.uy",
    stayTypes: ["permanente", "temporal", "diurna"]
  },
  {
    id: "6",
    name: "Dolce Primavera",
    type: "privada",
    city: "Punta Gorda",
    province: "Montevideo",
    address: "Calle Belastiquí 1517, Punta Gorda, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.8,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    ],
    description: "Si nos visitas, nos elegís. Enfoque holístico en el bienestar integral del adulto mayor. Casa en una sola planta sin escalones, con ambientes amplios y luminosos, hermoso jardín exterior.",
    services: [
      "Alojamiento permanente y temporal",
      "Evaluación geriátrica y psicológica",
      "4 comidas diarias + colaciones",
      "Frigobar y TV/Netflix en habitaciones",
      "A/C y calefacción",
      "Lavandería",
      "Barbacoa para eventos",
      "Hidrogimnasia (dic-mar)",
      "Talleres cognitivos y musicoterapia",
      "Taller literario y manualidades",
      "Jardinería y cocina básica",
      "Gimnasia adaptada"
    ],
    facilities: [
      "Casa de una planta sin desniveles",
      "Jardín exterior",
      "Habitaciones con frigobar",
      "Piscina climatizada"
    ],
    coordinates: { lat: -34.8958, lng: -56.0683 },
    phone: "26036626",
    email: "residencialdolceprimavera@gmail.com",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "096126001",
    facebook: "dolceprimavera",
    stayTypes: ["permanente", "temporal"],
    certifications: ["MSP"]
  },
  {
    id: "7",
    name: "El Ibirapitá",
    type: "privada",
    city: "Atlántida",
    province: "Canelones",
    address: "Calle 16 esquina Av. Pinares, Atlántida, Canelones",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.7,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80"
    ],
    description: "Trato de persona a persona, fomentando expresividad y salud integral a través de música, poesía, movimiento y charla. Entorno aireado, soleado y natural con todos los protocolos de cuidados.",
    services: [
      "Centro diurno",
      "Estadía transitoria",
      "Estadía permanente",
      "Equipo interdisciplinario",
      "Talleres de yoga y gimnasia",
      "Música y expresión"
    ],
    facilities: [
      "Entorno natural",
      "Vehículo adaptado",
      "Áreas de terapia"
    ],
    coordinates: { lat: -34.7714, lng: -55.7582 },
    phone: "098171413",
    email: "elibirapita@residencial.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "097305769",
    stayTypes: ["permanente", "temporal", "diurna"]
  },
  {
    id: "8",
    name: "Hogar Italiano",
    type: "privada",
    city: "Tres Cruces",
    province: "Montevideo",
    address: "Paysandú 1935 esquina Arenal Grande, Tres Cruces, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 35,
    rating: 4.8,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    ],
    description: "Asociación civil sin fines de lucro. Creado sobre tres pilares: AMOR – DEDICACIÓN – PROFESIONALISMO. Especialistas en cuidado de pacientes con Alzheimer. El Presidente integra la comisión directiva de AUDAS.",
    services: [
      "TV cable y vídeo",
      "Lavandería",
      "Higiene personal permanente",
      "Circuito cerrado de cámaras",
      "Visitas sin horario",
      "Aire acondicionado",
      "Peluquería y podología",
      "Lectura y entretenimientos",
      "Paseos por la ciudad",
      "Festejos de cumpleaños"
    ],
    facilities: [
      "Casona adaptada",
      "Ambientes climatizados",
      "Áreas de recreación"
    ],
    coordinates: { lat: -34.8941, lng: -56.1772 },
    phone: "24018609",
    email: "info@hogaritaliano.com",
    schedule: "Visitas libres",
    redIntegra: true,
    whatsapp: "095071563",
    website: "hogaritaliano.com",
    admissions: ["demencia"],
    stayTypes: ["permanente"]
  },
  {
    id: "9",
    name: "Las 2 Hermanas",
    type: "privada",
    city: "Unión",
    province: "Montevideo",
    address: "Pernas 2565 y 2571, Unión, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 30,
    rating: 4.9,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80"
    ],
    description: "Proyecto familiar con más de 20 años de trayectoria. La energía de una vida feliz. No conocen límites en generar experiencias únicas que llenan de vitalidad a los abuelos.",
    services: [
      "Paseos en camioneta adaptada",
      "Actividades diarias de creatividad",
      "Coro de abuelos",
      "Talleres de cerámica y música",
      "Espectáculos de baile",
      "Gimnasia y yoga",
      "Celebraciones de cumpleaños",
      "9 cuidadoras",
      "Médico geriatra",
      "Enfermería y nutrición"
    ],
    facilities: [
      "Dos casas conectadas",
      "Espacios para actividades",
      "Áreas de recreación"
    ],
    coordinates: { lat: -34.8661, lng: -56.1472 },
    phone: "25087300",
    email: "las2hermanas@mail.com",
    schedule: "Puertas siempre abiertas a familiares",
    redIntegra: true,
    whatsapp: "094704059",
    facebook: "las2hermanasuy",
    stayTypes: ["permanente"]
  },
  {
    id: "10",
    name: "Las Calas - Carrasco",
    type: "privada",
    city: "Carrasco",
    province: "Montevideo",
    address: "Mariano Uriarte 6586, Carrasco, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 15,
    rating: 4.6,
    transparency: 3,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80"
    ],
    description: "Sucursal Carrasco de Las Calas. Residencia de alto nivel en amplia casa de una planta rodeada de jardines. Tranquilidad e independencia asistida respetando la autonomía personal.",
    services: [
      "Habitaciones individuales con baño en suite",
      "Habitaciones compartidas con vista al jardín",
      "Climatización central",
      "Rutinas personalizadas",
      "Comidas equilibradas",
      "Administración de medicación",
      "Peluquería y podología",
      "Fisioterapia opcional"
    ],
    facilities: [
      "Casa de una planta",
      "Amplios jardines",
      "Vista al jardín en todas las habitaciones",
      "Climatización central"
    ],
    coordinates: { lat: -34.8658, lng: -56.0483 },
    phone: "094173108",
    email: "lascalasresidencial@gmail.com",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "094173108",
    instagram: "lascalasresidencial",
    stayTypes: ["permanente"]
  },
  {
    id: "11",
    name: "Las Calas - Punta Gorda",
    type: "privada",
    city: "Punta Gorda",
    province: "Montevideo",
    address: "Coimbra 5854, Punta Gorda, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.7,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80"
    ],
    description: "Compromiso de florecer cada día con soluciones dignas, eficaces y confiables. Casa de una planta en esquina con amplios ventanales y vistas a la Rambla de Punta Gorda. Ambiente muy luminoso.",
    services: [
      "Habitaciones amplias con A/C",
      "Estimulación psico-motriz",
      "Yoga, tango, música y coro",
      "Celebración de cumpleaños",
      "Alimentación balanceada",
      "Postres y hora del té"
    ],
    facilities: [
      "Casa en esquina con ventanales",
      "Vistas privilegiadas",
      "Ambiente luminoso"
    ],
    coordinates: { lat: -34.8908, lng: -56.0783 },
    phone: "094173108",
    email: "lascalasresidencial@gmail.com",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "094173108",
    stayTypes: ["permanente"]
  },
  {
    id: "12",
    name: "Las Huellas",
    type: "privada",
    city: "Cordón",
    province: "Montevideo",
    address: "Constituyente 1845, Cordón, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.5,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80"
    ],
    description: "La edad es tan solo la huella de los caminos que hemos recorrido. Servicio de alta calidad humana y profesional con trato personalizado. Casona adaptada con pisos antideslizantes y barandas.",
    services: [
      "Talleres de estimulación cognitiva",
      "Alimentación supervisada por nutricionista",
      "Menús semanales publicados",
      "Peluquería y podología",
      "Fisioterapia",
      "TV cable y WiFi",
      "Circuito cerrado de cámaras",
      "Musicoterapia",
      "Bingo y cartas",
      "Noches de cine",
      "Gimnasia y yoga"
    ],
    facilities: [
      "Casona adaptada",
      "Pisos antideslizantes",
      "Áreas climatizadas",
      "Barandas en pasillos"
    ],
    coordinates: { lat: -34.9011, lng: -56.1782 },
    phone: "095690556",
    email: "lashuellasuruguay@gmail.com",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "099664202",
    facebook: "lashuellasuruguay",
    stayTypes: ["permanente"]
  },
  {
    id: "13",
    name: "Las Huellas II",
    type: "privada",
    city: "Parque Batlle",
    province: "Montevideo",
    address: "Calle Palmar 2378, Parque Batlle, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 25,
    rating: 4.7,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    ],
    description: "Segunda casa de Las Huellas en Parque Batlle. Casa amplia totalmente reciclada con espacios luminosos, pisos antideslizantes, espacios verdes y barandas. Énfasis en rehabilitación física y estimulación cognitiva.",
    services: [
      "Fisioterapia (rehabilitación ACV y fracturas)",
      "Musicoterapia",
      "Noches de cine",
      "Gimnasia tercera edad",
      "Laborterapia",
      "Talleres de convivencia y creatividad",
      "Taller literario",
      "Juegos de salón",
      "Festejos de cumpleaños",
      "Lavandería",
      "WiFi y TV cable",
      "Llamadas sin costo",
      "Visitas libres"
    ],
    facilities: [
      "Casa totalmente reciclada",
      "Espacios amplios y luminosos",
      "Pisos antideslizantes",
      "Espacios verdes y jardines",
      "Sillones a altura adecuada",
      "Barandas en pasillos",
      "Enfermería equipada",
      "CCTV"
    ],
    coordinates: { lat: -34.8888, lng: -56.1583 },
    phone: "095690556",
    email: "lashuellasuruguay@gmail.com",
    schedule: "Visitas libres",
    redIntegra: true,
    whatsapp: "099664202",
    facebook: "lashuellasuruguay",
    stayTypes: ["permanente"],
    admissions: ["encamados"]
  },
  {
    id: "14",
    name: "Las Marias",
    type: "privada",
    city: "Paso Molino",
    province: "Montevideo",
    address: "Pilar Costa 36, Paso Molino, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 15,
    rating: 4.5,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80"
    ],
    description: "Residencial familiar con ambiente cálido y confortable. Recreación para estimulación física y mental.",
    services: [
      "Talleres de música",
      "Manualidades",
      "Jardinería",
      "Juegos de cartas",
      "Seguimiento médico mensual",
      "Atención personalizada"
    ],
    facilities: [
      "Ambiente familiar",
      "Espacios cómodos"
    ],
    coordinates: { lat: -34.8686, lng: -56.2133 },
    phone: "094009416",
    email: "info@lasmarias.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "094009416",
    facebook: "lasmariasresidencial",
    director: "Liliana Mazzei",
    directorTitle: "Directora Técnica (20+ años)",
    stayTypes: ["permanente"],
    directors: [
      { name: "Liliana Mazzei", role: "Directora Técnica (20+ años de experiencia)" }
    ]
  },
  {
    id: "15",
    name: "María Violeta Residencial & Hotel Asistido",
    type: "privada",
    city: "Reducto",
    province: "Montevideo",
    address: "Av. Burgues 2907, Reducto, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 25,
    rating: 4.6,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80"
    ],
    description: "Casa de época remodelada en una sola planta, a metros del Prado. Apunta a ser una gran familia donde se generen espacios de diversión y socialización constantemente.",
    services: [
      "Habitaciones individuales y compartidas",
      "TV cable individual",
      "WiFi y A/C",
      "Visitas sin horario",
      "Fútbol uruguayo en espacios comunes",
      "Parrillero para eventos familiares",
      "Lavandería incluida",
      "Yogaterapia y arte plástica",
      "Fisioterapia",
      "Hidrogimnasia (dic-mar)"
    ],
    facilities: [
      "Casa de época en una planta",
      "Dos livings y comedor",
      "Barbacoa",
      "Patio con reposeras",
      "Áreas verdes"
    ],
    coordinates: { lat: -34.8786, lng: -56.1933 },
    phone: "22099801",
    email: "mariavioleta@residencial.com.uy",
    schedule: "Visitas libres",
    redIntegra: true,
    whatsapp: "098072907",
    facebook: "mariavioletaresidencial",
    instagram: "mariavioletaresidencial",
    stayTypes: ["permanente", "temporal"]
  },
  {
    id: "16",
    name: "Nuevo Amanecer",
    type: "privada",
    city: "Malvín Norte",
    province: "Montevideo",
    address: "Gurmendez 2360, Malvín Norte, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.6,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
    ],
    description: "Casa nueva de una planta, amplia y luminosa con aire acondicionado y jardín. Ambiente familiar con profesionales 24 horas. Habilitada por Bomberos, MIDES y MSP. Cercana a sanatorios y locomoción.",
    services: [
      "Habitaciones individuales, matrimoniales y compartidas",
      "Estadía diurna, nocturna, temporal y permanente",
      "Postoperatorio",
      "Alimentación completa",
      "Biblioteca y música",
      "Ludoteca y manualidades",
      "Peluquería y podología",
      "Lavandería",
      "Circuito cerrado de cámaras",
      "Festejos y recreación grupal",
      "Estimulación con asistente social"
    ],
    facilities: [
      "Casa nueva de una planta",
      "Jardín amplio",
      "Aire acondicionado",
      "Espacios luminosos"
    ],
    coordinates: { lat: -34.8761, lng: -56.1272 },
    phone: "25056297",
    email: "info@nuevoamanecer.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "094344234",
    stayTypes: ["permanente", "temporal", "diurna"],
    certifications: ["MSP", "MIDES", "Bomberos"]
  },
  {
    id: "17",
    name: "Residencia María Mercedes",
    type: "privada",
    city: "Prado",
    province: "Montevideo",
    address: "Prado, Montevideo (cerca de Paso Molino)",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.5,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
    ],
    description: "Organización llevada adelante por la familia Rodríguez Ochoa con espíritu de trabajo en equipo. Ambiente familiar con trato cálido y personalizado en el corazón del Prado.",
    services: [
      "4 comidas diarias + extras",
      "Atención médica y social",
      "Fisioterapia",
      "Yoga y gimnasia",
      "Taller literario",
      "Espacios musicales",
      "Emergencia móvil",
      "Podología y peluquería"
    ],
    facilities: [
      "Dormitorios individuales o compartidos",
      "Ventanas a espacios verdes",
      "A/C y calefacción",
      "WiFi y TV cable",
      "Cocheras",
      "Espacio para mascotas",
      "Extensas áreas verdes"
    ],
    coordinates: { lat: -34.8686, lng: -56.2033 },
    phone: "094730983",
    email: "mariamercedes@residencial.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "094982560",
    stayTypes: ["permanente"]
  },
  {
    id: "18",
    name: "Residencial Árbol de la Vida",
    type: "privada",
    city: "Juan Lacaze",
    province: "Colonia",
    address: "Juana C. de Campomar 131, Juan Lacaze, Colonia",
    price: 0,
    priceRange: "Consultar",
    capacity: 30,
    rating: 4.6,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80"
    ],
    description: "Residencial mixto habilitado por MSP, especialmente diseñado para el cuidado de personas mayores. La casa cuenta con adaptaciones como agarraderas, rampas, ambientes calefaccionados y salidas de emergencia señalizadas.",
    services: [
      "Habitaciones individuales y compartidas",
      "Ropa de cama y artículos de higiene incluidos",
      "TV y WiFi",
      "Clases de música y gimnasia",
      "Atención médica con Dra. Mariana González",
      "Nutricionista mensual"
    ],
    facilities: [
      "4 salas de estar",
      "3 comedores",
      "Áreas al aire libre",
      "Jardín con césped y flores"
    ],
    coordinates: { lat: -34.4267, lng: -57.4517 },
    phone: "45865153",
    email: "info@arboldelavida.com.uy",
    schedule: "Visitas: L-V 9:00-18:00, Turnos 10:00-11:30 y 13:00-16:00",
    redIntegra: true,
    certifications: ["MSP"],
    stayTypes: ["permanente"]
  },
  {
    id: "19",
    name: "Residencial Bellos Años",
    type: "privada",
    city: "La Blanqueada",
    province: "Montevideo",
    address: "Luis Alberto de Herrera 3159, La Blanqueada, Montevideo",
    price: 0,
    priceRange: "A convenir",
    capacity: 20,
    rating: 4.7,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80"
    ],
    description: "Residencial con más de 4 años de experiencia en cuidado del adulto mayor. Ofrece un ambiente cálido y familiar, con servicio completo al residente. Cuenta con habilitación de Bomberos y Salud Pública.",
    services: [
      "Atención 24 horas",
      "Alimentación casera diaria",
      "Servicio de lavandería",
      "Peluquería y geriatría",
      "Enfermería y médico de cabecera",
      "Calefacción",
      "TV cable y WiFi",
      "Talleres de música y recreación"
    ],
    facilities: [
      "Jardín",
      "Parrillero techado",
      "Amplios cuartos",
      "Espacios comunes",
      "Habitaciones compartidas"
    ],
    coordinates: { lat: -34.8897, lng: -56.1514 },
    phone: "24814886",
    email: "info@bellosanos.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "095456385",
    certifications: ["MSP", "Bomberos"],
    stayTypes: ["permanente"]
  },
  {
    id: "20",
    name: "Residencial Empatía I",
    type: "privada",
    city: "Prado",
    province: "Montevideo",
    address: "Hipólito Yrigoyen 1482, Prado, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.6,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80"
    ],
    description: "Residencial con enfoque en la estimulación integral del adulto mayor. Propuesta incluye fisioterapia, actividades recreativas, terapia motivacional con psicólogos especializados y ejercicios físicos adaptados.",
    services: [
      "Fisioterapia",
      "Actividades recreativas",
      "Juegos de salón y paseos",
      "Terapia motivacional",
      "Dinámicas teatrales",
      "Ejercicios de motricidad"
    ],
    facilities: [
      "Casa adaptada",
      "Espacios comunes",
      "Área de actividades"
    ],
    coordinates: { lat: -34.8686, lng: -56.2033 },
    phone: "099413398",
    email: "empatia@residencial.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "099413398",
    stayTypes: ["permanente"]
  },
  {
    id: "21",
    name: "Residencial Empatía II",
    type: "privada",
    city: "Prado",
    province: "Montevideo",
    address: "Valiente 4839, Prado, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 19,
    rating: 4.6,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
    ],
    description: "Segunda sede de Residencial Empatía. Mantiene el enfoque en estimulación integral con fisioterapia, actividades recreativas y terapia motivacional.",
    services: [
      "Fisioterapia",
      "Actividades recreativas",
      "Juegos de salón",
      "Terapia motivacional",
      "Ejercicios adaptados"
    ],
    facilities: [
      "Casa adaptada",
      "Espacios comunes"
    ],
    coordinates: { lat: -34.8656, lng: -56.2063 },
    phone: "099413398",
    email: "empatia@residencial.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "099413398",
    stayTypes: ["permanente"]
  },
  {
    id: "22",
    name: "Residencial Empatía III",
    type: "privada",
    city: "Prado",
    province: "Montevideo",
    address: "Amazonas 1700, Prado, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.6,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80"
    ],
    description: "Tercera sede de Residencial Empatía. Continúa con la filosofía de estimulación integral y atención personalizada al adulto mayor.",
    services: [
      "Fisioterapia",
      "Actividades recreativas",
      "Juegos de salón",
      "Terapia motivacional",
      "Ejercicios adaptados"
    ],
    facilities: [
      "Casa adaptada",
      "Espacios comunes"
    ],
    coordinates: { lat: -34.8616, lng: -56.2003 },
    phone: "099413398",
    email: "empatia@residencial.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "099413398",
    stayTypes: ["permanente"]
  },
  {
    id: "23",
    name: "Residencial Hostería Uruguay",
    type: "privada",
    city: "Piriápolis",
    province: "Maldonado",
    address: "Calle Uruguay 1026, Piriápolis, Maldonado",
    price: 0,
    priceRange: "Consultar",
    capacity: 30,
    rating: 4.5,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80"
    ],
    description: "Casa del adulto mayor habilitada por MSP y MIDES. A 400m de la rambla de Piriápolis. Cuidado con respeto moral y ético, conjugando atención profesional con un entorno agradable.",
    services: [
      "4 comidas diarias + extras",
      "Atención médica, psicológica y social",
      "Enfermería",
      "Fisioterapia",
      "Yoga y gimnasia",
      "Taller literario",
      "Emergencia móvil",
      "Podología y peluquería",
      "Paseos de octubre a abril"
    ],
    facilities: [
      "Dormitorios individuales o compartidos",
      "Vistas a espacios verdes",
      "Baños privados",
      "Patios abiertos y cerrados",
      "Cocheras",
      "Parrilleros",
      "Espacio para mascotas"
    ],
    coordinates: { lat: -34.8628, lng: -55.2756 },
    phone: "092286799",
    email: "hosteriauruguay@gmail.com",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "092286799",
    certifications: ["MSP", "MIDES"],
    stayTypes: ["permanente"]
  },
  {
    id: "24",
    name: "Residencial Irigoitia",
    type: "privada",
    city: "Prado",
    province: "Montevideo",
    address: "Juan Carlos Blanco 3485, Prado, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 30,
    rating: 4.6,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80"
    ],
    description: "Desarrollado en una sola planta con cómodos ambientes luminosos rodeados de espacios verdes. Todas las instalaciones con abundante luz natural y aire acondicionado.",
    services: [
      "Asistencia 24 horas",
      "Alojamiento integral",
      "Comidas completas",
      "Lavandería",
      "Piscina",
      "WiFi y TV cable",
      "Equipo técnico completo"
    ],
    facilities: [
      "Una sola planta",
      "Amplios jardines",
      "Piscina",
      "Espacios luminosos",
      "Aire acondicionado"
    ],
    coordinates: { lat: -34.8656, lng: -56.2063 },
    phone: "23364530",
    email: "info@irigoitia.com",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "098445697",
    website: "www.irigoitia.com",
    facebook: "irigoitia",
    instagram: "irigoitia",
    stayTypes: ["permanente"]
  },
  {
    id: "25",
    name: "Residencial La Estancia",
    type: "privada",
    city: "Ciudad de Canelones",
    province: "Canelones",
    address: "María Stagnero de Munar s/n, Ciudad de Canelones",
    price: 0,
    priceRange: "Consultar",
    capacity: 40,
    rating: 4.9,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
      "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?w=800&q=80"
    ],
    description: "Residencial orientado al Modelo de Atención Centrado en la Persona (ACP), con un enfoque humanizado y de alta calidad humana. Se ubica en una amplia propiedad con espacios verdes, ofreciendo un entorno saludable y contacto con la naturaleza.",
    services: [
      "Habitaciones individuales con baño privado",
      "Habitaciones compartidas",
      "Baños accesibles para sillas de ruedas",
      "Aire acondicionado",
      "Peluquería y podología",
      "Fisioterapia opcional",
      "Chef propio con menús personalizados",
      "4 comidas diarias",
      "Yoga, música, manualidades, bingo"
    ],
    facilities: [
      "Amplios espacios verdes",
      "Huerta orgánica",
      "Áreas de recreación",
      "Senderos para caminar"
    ],
    coordinates: { lat: -34.5289, lng: -56.2839 },
    phone: "097774000",
    email: "info@laestanciaresidencial.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "097774000",
    website: "laestanciaresidencial.com.uy",
    instagram: "la_estanciaresidencial",
    facebook: "laestanciahotelresidencial",
    stayTypes: ["permanente", "temporal"],
    admissions: ["silla de ruedas"]
  },
  {
    id: "26",
    name: "Residencial María Gracia",
    type: "privada",
    city: "Cordón",
    province: "Montevideo",
    address: "Gaboto 1577, Cordón, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 16,
    rating: 4.7,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80"
    ],
    description: "Empresa familiar que nace de la necesidad de encontrar un lugar de calidad para seres queridos mayores. Casa de una sola planta restaurada a nuevo, con ambiente cálido y valores de responsabilidad y seriedad.",
    services: [
      "4 comidas diarias",
      "Lavandería propia",
      "Control médico semanal",
      "Atención 24 horas",
      "Administración de medicación",
      "Talleres de manualidades",
      "Música en vivo con guitarrista",
      "TV cable en habitaciones",
      "WiFi",
      "Llamadas telefónicas libres"
    ],
    facilities: [
      "Casa de una sola planta",
      "8 dormitorios con pisos de parquet",
      "Baños con barandas y pisos antideslizantes",
      "Living con TV 42''",
      "Comedor espacioso"
    ],
    coordinates: { lat: -34.9011, lng: -56.1882 },
    phone: "24007488",
    email: "mg.residencial@hotmail.com",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "097991577",
    instagram: "mariagracia.residencial",
    facebook: "mariagraciaresidencial",
    stayTypes: ["permanente"]
  },
  {
    id: "27",
    name: "Residencial Moiru",
    type: "privada",
    city: "Prado",
    province: "Montevideo",
    address: "Juan Carlos Blanco 3362, Prado, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 22,
    rating: 4.7,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    ],
    description: "Calidad de Vida y Bienestar. Casa de 2 plantas con terrazas y patios, habitaciones individuales con baño en suite, dobles y triples. Luz natural abundante. 22 plazas + servicio diurno.",
    services: [
      "Residencia permanente, temporal y diurna",
      "Enfermería y urgencias 24h",
      "Lavandería",
      "WiFi y TV cable",
      "Calefacción y agua caliente central",
      "Podología, peluquería y manicura",
      "Fisioterapia",
      "Masajista",
      "Médico",
      "Terapeuta ocupacional",
      "Psicólogo"
    ],
    facilities: [
      "Casa de 2 plantas",
      "Terrazas y patios",
      "Habitaciones con baño en suite",
      "Luz natural abundante"
    ],
    coordinates: { lat: -34.8666, lng: -56.2043 },
    phone: "23563421",
    email: "info@moiru.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "099876084",
    instagram: "residencialmoiru",
    stayTypes: ["permanente", "temporal", "diurna"]
  },
  {
    id: "28",
    name: "Residencial Ricaldoni",
    type: "privada",
    city: "Parque Batlle",
    province: "Montevideo",
    address: "Av Dr. Américo Ricaldoni 1802, Parque Batlle, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 20,
    rating: 4.5,
    transparency: 4,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80"
    ],
    description: "Habitaciones amplias y luminosas con exteriores. Individuales o compartidas. Ambiente familiar en Parque Batlle.",
    services: [
      "Alojamiento permanente y transitorio",
      "WiFi",
      "Lavandería",
      "4 comidas diarias + colaciones",
      "Climatización",
      "Acompañamiento terapéutico",
      "Orientación familiar",
      "Estimulación cognitiva",
      "Musicoterapia",
      "Gimnasia",
      "Juegos de salón",
      "Eventos y cumpleaños"
    ],
    facilities: [
      "Habitaciones amplias y luminosas",
      "Espacios exteriores",
      "Áreas comunes climatizadas"
    ],
    coordinates: { lat: -34.8918, lng: -56.1593 },
    phone: "",
    email: "info@ricaldoni.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "094486741",
    stayTypes: ["permanente", "temporal"]
  },
  {
    id: "29",
    name: "Tata Luis y Doña Lola - Cordón",
    type: "privada",
    city: "Cordón",
    province: "Montevideo",
    address: "Mercedes 1572, Cordón, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 25,
    rating: 4.8,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80"
    ],
    description: "Emprendimiento familiar dedicado a la atención humanizada y centrada en la persona, especializado en Alzheimer. Su misión es marcar la diferencia en la atención a personas mayores con dedicación, amor y respeto.",
    services: [
      "Comidas caseras (4 diarias + colaciones)",
      "Limpieza diaria en 3 turnos",
      "Baños diarios",
      "Tango-terapia",
      "Gimnasia pasiva",
      "Manualidades",
      "Musicoterapia",
      "Visitas libres"
    ],
    facilities: [
      "Espacios al aire libre",
      "Habitaciones individuales y compartidas",
      "Ambiente familiar"
    ],
    coordinates: { lat: -34.9058, lng: -56.1857 },
    phone: "24097422",
    email: "info@tataluisydonalola.com.uy",
    schedule: "Visitas libres",
    redIntegra: true,
    whatsapp: "094330198",
    admissions: ["demencia"],
    stayTypes: ["permanente"]
  },
  {
    id: "30",
    name: "Tata Luis y Doña Lola - Parque Batlle",
    type: "privada",
    city: "Parque Batlle",
    province: "Montevideo",
    address: "Ayacucho 3409 esquina LAH, Parque Batlle, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 25,
    rating: 4.8,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    ],
    description: "Segunda sede del emprendimiento familiar Tata Luis y Doña Lola. Dedicado a la atención humanizada, especializado en Alzheimer. Su visión es ser un centro de referencia por la calidad de servicios, dignidad y derechos.",
    services: [
      "Comidas caseras (4 diarias + colaciones)",
      "Limpieza diaria en 3 turnos",
      "Tango-terapia",
      "Gimnasia pasiva",
      "Manualidades",
      "Musicoterapia",
      "Visitas libres"
    ],
    facilities: [
      "Espacios al aire libre amplios",
      "Habitaciones individuales y compartidas",
      "Ambiente familiar"
    ],
    coordinates: { lat: -34.8908, lng: -56.1583 },
    phone: "24830699",
    email: "info@tataluisydonalola.com.uy",
    schedule: "Visitas libres",
    redIntegra: true,
    whatsapp: "094330198",
    admissions: ["demencia"],
    stayTypes: ["permanente"]
  },
  {
    id: "31",
    name: "Vivir Mejor",
    type: "privada",
    city: "Tres Cruces",
    province: "Montevideo",
    address: "Presidente Giró 2466, Tres Cruces, Montevideo",
    price: 0,
    priceRange: "Consultar",
    capacity: 19,
    rating: 4.9,
    transparency: 5,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80"
    ],
    description: "Una casa de compañía y cariño. Atendido por sus propios dueños, prioriza el lado humano para lograr un ambiente próspero y cálido. La dueña, Ivana, posee más de 40 años de experiencia en el rubro.",
    services: [
      "19 habitaciones (11 baños privados)",
      "Ascensor",
      "Cámaras de seguridad",
      "Desfibrilador",
      "Peluquería y podología",
      "Fisioterapia",
      "Talleres de música y plástica",
      "Bingo y cartas",
      "Fiestas temáticas",
      "Paseos y salidas",
      "TV cable y WiFi",
      "Tai Chi"
    ],
    facilities: [
      "Casona de dos pisos luminosos",
      "Entrada con rampa",
      "3 zonas comunes",
      "Jardín con árboles",
      "Habitaciones con vista exterior"
    ],
    coordinates: { lat: -34.8961, lng: -56.1672 },
    phone: "24871813",
    email: "info@residencialvivirmejor.com.uy",
    schedule: "Atención 24 horas",
    redIntegra: true,
    whatsapp: "099210076",
    facebook: "vivirmejorresidencial",
    stayTypes: ["permanente"]
  }
];
