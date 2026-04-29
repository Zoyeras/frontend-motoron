const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number>
}

/**
 * Generic fetch wrapper for API calls
 */
async function apiCall<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { params, ...fetchConfig } = config

  // Build URL with query parameters
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  const response = await fetch(url.toString(), {
    ...fetchConfig,
    headers: {
      'Content-Type': 'application/json',
      ...fetchConfig.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Maintenance (Mantenimiento) API endpoints
 */
export const maintenanceApi = {
  list: () => apiCall<any[]>('/mantenimientos'),

  getOne: (id: string) => apiCall<any>(`/mantenimientos/${id}`),

  create: (data: any) =>
    apiCall<any>('/mantenimientos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiCall<any>(`/mantenimientos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall<any>(`/mantenimientos/${id}`, {
      method: 'DELETE',
    }),

  getOilChangeForecast: () =>
    apiCall<any>('/mantenimientos/oil-change-forecast'),
}

/**
 * Fuel Expense (GastoCombustible) API endpoints
 */
export const fuelApi = {
  list: () => apiCall<any[]>('/gastoscombustible'),

  getOne: (id: string) => apiCall<any>(`/gastoscombustible/${id}`),

  create: (data: any) =>
    apiCall<any>('/gastoscombustible', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiCall<any>(`/gastoscombustible/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall<any>(`/gastoscombustible/${id}`, {
      method: 'DELETE',
    }),
}

/**
 * Health check endpoint
 */
export const healthApi = {
  check: () => apiCall<any>('/health'),
}
