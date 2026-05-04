import type {
  Mantenimiento,
  MantenimientoCreate,
  MantenimientoUpdate,
  GastoCombustible,
  GastoCombustibleCreate,
  GastoCombustibleUpdate,
  OilChangeForecast,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5014/api";

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("motoron_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number>;
  skipAuth?: boolean;
}

/**
 * Generic fetch wrapper for API calls
 */
async function apiCall<T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<T> {
  const { params, skipAuth, ...fetchConfig } = config;

  // Build URL with query parameters
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    ...fetchConfig,
    headers: {
      "Content-Type": "application/json",
      ...(skipAuth ? {} : getAuthHeaders()),
      ...fetchConfig.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

/**
 * Auth API endpoints
 */
export const authApi = {
  login: (data: LoginRequest) =>
    apiCall<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    }),

  register: (data: RegisterRequest) =>
    apiCall<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    }),
};

/**
 * Maintenance (Mantenimiento) API endpoints
 */
export const maintenanceApi = {
  list: () => apiCall<Mantenimiento[]>("/mantenimientos"),

  getOne: (id: string) => apiCall<Mantenimiento>(`/mantenimientos/${id}`),

  create: (data: MantenimientoCreate) =>
    apiCall<Mantenimiento>("/mantenimientos", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: MantenimientoUpdate) =>
    apiCall<void>(`/mantenimientos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall<void>(`/mantenimientos/${id}`, {
      method: "DELETE",
    }),

  getOilChangeForecast: () =>
    apiCall<OilChangeForecast>("/mantenimientos/oil-change-forecast"),
};

/**
 * Fuel Expense (GastoCombustible) API endpoints
 */
export const fuelApi = {
  list: () => apiCall<GastoCombustible[]>("/gastoscombustible"),

  getOne: (id: string) => apiCall<GastoCombustible>(`/gastoscombustible/${id}`),

  create: (data: GastoCombustibleCreate) =>
    apiCall<GastoCombustible>("/gastoscombustible", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: GastoCombustibleUpdate) =>
    apiCall<void>(`/gastoscombustible/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall<void>(`/gastoscombustible/${id}`, {
      method: "DELETE",
    }),
};

/**
 * Health check endpoint
 */
export const healthApi = {
  check: () => apiCall<{ status: string }>("/health"),
};
