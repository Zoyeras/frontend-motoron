import { OilForecastCard } from './OilForecastCard'
import { StatCard } from './StatCard'
import type { OilChangeForecast } from '../../types'

interface KpiGridProps {
  forecast: OilChangeForecast | null
  totalFuelCost: number
  totalMaintenances: number
  avgKm: number
}

export function KpiGrid({ forecast, totalFuelCost, totalMaintenances, avgKm }: KpiGridProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
      <OilForecastCard forecast={forecast} />
      <div className="flex flex-col gap-4">
        <StatCard
          label="Combustible"
          value={`$${totalFuelCost.toLocaleString('es-ES')}`}
          subtitle="Gasto Total Histórico"
          accent
        />
        <StatCard
          label="Servicios"
          value={String(totalMaintenances)}
          subtitle="Mantenimientos registrados"
        />
        <StatCard
          label="Uso Diario"
          value={`${avgKm} km/día`}
          subtitle="Promedio dinámico"
        />
      </div>
    </section>
  )
}
