export interface Mantenimiento {
  id: string
  vehicleId: string
  tipo: string
  kilometraje: number
  fecha: string
  costo: number
  descripcion: string | null
  createdAtUtc: string
  updatedAtUtc: string
}

export interface MantenimientoCreate {
  vehicleId: string
  tipo: string
  kilometraje: number
  fecha: string
  costo: number
  descripcion?: string
}

export interface MantenimientoUpdate {
  tipo: string
  kilometraje: number
  fecha: string
  costo: number
  descripcion?: string
}

export interface GastoCombustible {
  id: string
  vehicleId: string
  fecha: string
  litros: number
  costo: number
  kilometraje: number
  precioPorLitro: number
  createdAtUtc: string
  updatedAtUtc: string
}

export interface GastoCombustibleCreate {
  vehicleId: string
  fecha: string
  litros: number
  costo: number
  kilometraje: number
}

export interface GastoCombustibleUpdate {
  fecha: string
  litros: number
  costo: number
  kilometraje: number
}

export interface OilChangeForecast {
  averageDailyKilometers: number
  kilometersSinceLastOilChange: number
  kilometersRemaining: number
  estimatedDate: string | null
  lastOilChangeDate: string | null
  oilChangeIntervalKilometers: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  expiresAt: string
}
