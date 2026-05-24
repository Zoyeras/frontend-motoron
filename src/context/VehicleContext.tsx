import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Vehicle } from '../types'
import { vehicleApi } from '../services/apiClient'
import { useAuth } from '../hooks/useAuth'

interface VehicleContextType {
  vehicle: Vehicle | null
  vehicleId: string | null
  loading: boolean
  reload: () => Promise<void>
  setVehicle: (v: Vehicle) => void
}

const VehicleContext = createContext<VehicleContextType | null>(null)

export function VehicleProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(false)

  const reload = useCallback(async () => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const list = await vehicleApi.list()
      setVehicle(list[0] ?? null)
    } catch {
      setVehicle(null)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    reload()
  }, [reload])

  return (
    <VehicleContext.Provider value={{
      vehicle,
      vehicleId: vehicle?.id ?? null,
      loading,
      reload,
      setVehicle,
    }}>
      {children}
    </VehicleContext.Provider>
  )
}

export function useVehicle(): VehicleContextType {
  const ctx = useContext(VehicleContext)
  if (!ctx) throw new Error('useVehicle must be used within VehicleProvider')
  return ctx
}
