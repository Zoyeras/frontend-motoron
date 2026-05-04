import type { OilChangeForecast } from '../../types'

interface OilForecastCardProps {
  forecast: OilChangeForecast | null
}

export function OilForecastCard({ forecast }: OilForecastCardProps) {
  const percentage = forecast
    ? Math.round(
        ((forecast.oilChangeIntervalKilometers - (forecast.kilometersSinceLastOilChange ?? 0)) /
          forecast.oilChangeIntervalKilometers) *
          100
      )
    : 0

  return (
    <aside className="glass-card p-7 flex flex-col gap-5 justify-between h-full">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-muted">Próximo cambio de aceite</span>
        <strong className="text-xl text-slate-50">
          {forecast?.estimatedDate
            ? new Date(forecast.estimatedDate).toLocaleDateString()
            : 'Pendiente'}
        </strong>
      </div>

      <div
        className="w-full max-w-[240px] aspect-square mx-auto rounded-full grid place-items-center"
        style={{
          background: `radial-gradient(circle at center, rgba(15,23,42,0.35) 56%, transparent 57%), conic-gradient(#22c55e 0deg ${(percentage / 100) * 360}deg, rgba(255,255,255,0.09) ${(percentage / 100) * 360}deg 360deg)`,
          boxShadow: 'inset 0 0 0 12px rgba(255,255,255,0.03)',
        }}
        aria-hidden="true"
      >
        <div className="w-[62%] aspect-square rounded-full grid place-items-center text-2xl font-extrabold bg-slate-950/90 text-slate-50">
          {forecast ? `${percentage}%` : '—'}
        </div>
      </div>

      <ul className="list-none grid grid-cols-3 gap-3 p-0 m-0">
        <li className="glass-card-inner p-3.5 grid gap-1.5">
          <span className="text-muted text-sm">Promedio diario</span>
          <strong className="text-slate-50">
            {forecast?.averageDailyKilometers ? `${forecast.averageDailyKilometers} km` : '—'}
          </strong>
        </li>
        <li className="glass-card-inner p-3.5 grid gap-1.5">
          <span className="text-muted text-sm">Km restantes</span>
          <strong className="text-slate-50">
            {forecast?.kilometersRemaining ? `${forecast.kilometersRemaining} km` : '—'}
          </strong>
        </li>
        <li className="glass-card-inner p-3.5 grid gap-1.5">
          <span className="text-muted text-sm">Último servicio</span>
          <strong className="text-slate-50">
            {forecast?.lastOilChangeDate
              ? new Date(forecast.lastOilChangeDate).toLocaleDateString()
              : '—'}
          </strong>
        </li>
      </ul>
    </aside>
  )
}
