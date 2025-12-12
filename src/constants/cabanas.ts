export type Cabana = {
  id: string;
  nombre: string;
  slug?: string;
  descripcion: string;
  precio_base: number;
  images: string[];
  features?: string[];
};

export const cabanas: Cabana[] = [
  {
    id: '1',
    nombre: 'Cabaña Escapada',
    slug: 'cabana-escapada',
    descripcion:
      'Confort esencial para una escapada relajante.\nHabitación cómoda con cama Queen.\nAire acondicionado, Wi‑Fi y TV.\nVista al jardín y acceso rápido a senderos.',
    precio_base: 85000,
    images: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1600',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600',
    ],
    features: ['Cama Queen', 'Aire acondicionado', 'Wi‑Fi', 'Vista al jardín'],
  },
  {
    id: '2',
    nombre: 'Cabaña Panorama',
    slug: 'cabana-panorama',
    descripcion:
      'Diseño amplio y luminoso para parejas.\nCama King y living con chimenea.\nCocina equipada y deck privado.\nIdeal para fotos al atardecer.',
    precio_base: 110000,
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600',
      'https://images.unsplash.com/photo-1505995399120-8a2f2b4f5f9d?w=1600',
    ],
    features: ['Cama King', 'Chimenea', 'Cocina equipada', 'Deck privado'],
  },
  {
    id: '3',
    nombre: 'Cabaña Romántica',
    slug: 'cabana-romantica',
    descripcion:
      'Pequeña y acogedora, perfecta para escapadas románticas.\nJacuzzi opcional y kit romántico disponible.\nDesayuno incluido en la tarifa.',
    precio_base: 98000,
    images: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600',
    ],
    features: ['Jacuzzi (opcional)', 'Desayuno incluido', 'Decoración romántica'],
  },
  {
    id: '4',
    nombre: 'Cabaña Familiar',
    slug: 'cabana-familiar',
    descripcion:
      'Amplia para familias, con dos dormitorios y living comedor.\nFogón exterior y cocina completa.\nEspacio para hasta 6 personas.',
    precio_base: 135000,
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600',
    ],
    features: ['2 Dormitorios', 'Fogón exterior', 'Cocina completa'],
  },
];

export const getCabanaById = (id: string) => cabanas.find((c) => c.id === id);


