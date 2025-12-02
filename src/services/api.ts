import axios, { AxiosInstance, AxiosError } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Configuración base de Axios
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir tenant_id y auth token
api.interceptors.request.use(
  (config) => {
    // TODO: Obtener del store de autenticación
    const tenantId = "1"; // Por ahora fijo para MVP
    const token = localStorage.getItem("auth_token");

    if (tenantId) {
      config.headers["X-Tenant-ID"] = tenantId;
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO: Redirigir a login o refrescar token
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      console.error("Acceso denegado");
    }

    if (error.response?.status === 500) {
      console.error("Error del servidor");
    }

    return Promise.reject(error);
  }
);

// Tipos de respuesta genéricos
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Helper para construir query params
export const buildQueryParams = (params: Record<string, any>): string => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => query.append(key, String(v)));
      } else {
        query.append(key, String(value));
      }
    }
  });

  return query.toString();
};
