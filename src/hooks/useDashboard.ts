import { useEffect, useState, useCallback } from 'react'
import { maintenanceApi, fuelApi } from '../services/apiClient'
import type { Mantenimiento, GastoCombustible, OilChangeForecast } from '../types'

export function useDashboard() {
  const [maintenanceItems, setMaintenanceItems] = useState<Mantenimiento[] | null>(null)
  const [fuelItems, setFuelItems] = useState<GastoCombustible[] | null>(null)
  const [forecast, setForecast] = useState<OilChangeForecast | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useCallback evita que loadData se recree en cada render,
  // eliminando re-renders en cadena de componentes hijos
  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [mList, fList, fc] = await Promise.all([
        maintenanceApi.list(),
        fuelApi.list(),
        maintenanceApi.getOilChangeForecast(),
      ])
      setMaintenanceItems(mList)
      setFuelItems(fList)
      setForecast(fc)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching data'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const totalFuelCost = fuelItems?.reduce((sum, item) => sum + (Number(item.costo) || 0), 0) ?? 0
  const totalMaintenances = maintenanceItems?.length ?? 0
  const avgKm = forecast?.averageDailyKilometers ?? 0

  return {
    maintenanceItems,
    fuelItems,
    forecast,
    loading,
    error,
    loadData,
    totalFuelCost,
    totalMaintenances,
    avgKm,
  }
}
