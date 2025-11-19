export interface Cabana {
  id: number;
  slug: string;
  nombre: string;
  descripcion: string;
  capacidad_personas: number;
  habitaciones: number;
  banos: number;
  precio_base: number;
  metros_cuadrados: number;
  activa: boolean;
  amenities: Amenity[];
  imagenes: Imagen[];
}

export interface Amenity {
  id: number;
  nombre: string;
  icono: string;
}

export interface Imagen {
  id: number;
  url: string;
  alt: string;
  orden: number;
  es_principal: boolean;
}

export interface Reserva {
  codigo_reserva: string;
  cabana_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  nombre_cliente: string;
  email_cliente: string;
  telefono_cliente: string;
  cantidad_personas: number;
  precio_total: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  comentarios?: string;
}

export interface Disponibilidad {
  disponible: boolean;
  fechas_bloqueadas: string[];
  precio_por_noche: number;
}

