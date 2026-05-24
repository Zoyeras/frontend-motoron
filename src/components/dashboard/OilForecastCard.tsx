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

  // Color del ring según % restante
  const ringColor =
    percentage > 50
      ? `conic-gradient(#a855f7 0deg ${(percentage / 100) * 360}deg, rgba(34,211,238,0.15) ${(percentage / 100) * 360}deg 360deg)`
      : percentage > 20
      ? `conic-gradient(#22d3ee 0deg ${(percentage / 100) * 360}deg, rgba(139,92,246,0.15) ${(percentage / 100) * 360}deg 360deg)`
      : `conic-gradient(#f87171 0deg ${(percentage / 100) * 360}deg, rgba(248,113,113,0.12) ${(percentage / 100) * 360}deg 360deg)`

  const glowColor =
    percentage > 50 ? 'rgba(168,85,247,0.5)' : percentage > 20 ? 'rgba(34,211,238,0.5)' : 'rgba(248,113,113,0.5)'

  return (
    <aside
      className="glass-card p-7 flex flex-col gap-6 justify-between h-full"
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="label-text">Aceite del Motor</span>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Próximo cambio estimado
          </p>
        </div>
        <strong
          style={{
            fontSize: '1rem',
            color: '#f1f5f9',
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.22)',
            padding: '0.375rem 0.875rem',
            borderRadius: '9999px',
            whiteSpace: 'nowrap',
          }}
        >
          {forecast?.estimatedDate
            ? new Date(forecast.estimatedDate).toLocaleDateString()
            : 'Pendiente'}
        </strong>
      </div>

      {/* Ring */}
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          margin: '0 auto',
          background: `radial-gradient(circle at center, rgba(6,8,18,0.90) 56%, transparent 57%), ${ringColor}`,
          boxShadow: `0 0 0 2px rgba(255,255,255,0.03) inset, 0 0 40px ${glowColor}`,
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
        }}
        aria-hidden="true"
      >
        {/* Inner circle */}
        <div
          style={{
            width: '62%',
            aspectRatio: '1',
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            background: 'radial-gradient(circle, #0a0d1a 60%, #0d1020)',
            boxShadow: `0 0 24px ${glowColor}`,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                display: 'block',
                fontSize: '1.75rem',
                fontWeight: 800,
                background: percentage > 50
                  ? 'linear-gradient(135deg, #c084fc, #22d3ee)'
                  : percentage > 20
                  ? 'linear-gradient(135deg, #22d3ee, #67e8f9)'
                  : 'linear-gradient(135deg, #f87171, #fca5a5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
              }}
            >
              {forecast ? `${percentage}%` : '—'}
            </span>
            <span style={{ fontSize: '0.6rem', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              restante
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <ul
        style={{
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '0.625rem',
          padding: 0,
          margin: 0,
        }}
      >
        {[
          { label: 'Prom. diario', value: forecast?.averageDailyKilometers ? `${forecast.averageDailyKilometers} km` : '—' },
          { label: 'Km restantes', value: forecast?.kilometersRemaining ? `${forecast.kilometersRemaining} km` : '—' },
          { label: 'Último srv.', value: forecast?.lastOilChangeDate ? new Date(forecast.lastOilChangeDate).toLocaleDateString() : '—' },
        ].map(({ label, value }) => (
          <li
            key={label}
            className="glass-card-inner"
            style={{ padding: '0.875rem', display: 'grid', gap: '0.375rem' }}
          >
            <span style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>
              {label}
            </span>
            <strong style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 700 }}>{value}</strong>
          </li>
        ))}
      </ul>
    </aside>
  )
}
