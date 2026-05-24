import { useState } from 'react'
import { useVehicle } from '../../context/VehicleContext'
import { VehicleForm } from './VehicleForm'

export function VehicleCard() {
  const { vehicle, loading } = useVehicle()
  const [showForm, setShowForm] = useState(false)

  if (loading) return null

  // Sin vehículo — CTA para registrar
  if (!vehicle) {
    return (
      <>
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '1rem', padding: '1.25rem 1.75rem',
            background: 'rgba(139,92,246,0.06)',
            border: '1px dashed rgba(139,92,246,0.30)',
            borderRadius: '1.25rem',
            cursor: 'pointer',
            transition: 'border-color 200ms ease, background 200ms ease',
          }}
          onClick={() => setShowForm(true)}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,92,246,0.55)'
            ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(139,92,246,0.10)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,92,246,0.30)'
            ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(139,92,246,0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🏍️</span>
            <div>
              <p style={{ color: '#a855f7', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                Registra tu moto
              </p>
              <p style={{ color: '#475569', fontSize: '0.775rem', margin: '0.125rem 0 0' }}>
                Agrega los datos de tu vehículo para comenzar el seguimiento
              </p>
            </div>
          </div>
          <span style={{ color: '#a855f7', fontSize: '1.25rem', opacity: 0.7 }}>+</span>
        </div>
        {showForm && <VehicleForm onClose={() => setShowForm(false)} />}
      </>
    )
  }

  // Con vehículo — mostrar datos
  return (
    <>
      <div
        className="glass-card"
        style={{ padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.75rem', filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.5))' }}>🏍️</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
              <strong style={{
                fontSize: '1.1rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #e2e8f0, #c084fc)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {vehicle.brand} {vehicle.model}
              </strong>
              <span style={{ color: '#475569', fontSize: '0.825rem' }}>{vehicle.year}</span>
              {vehicle.cilindraje && (
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600, color: '#a855f7',
                  background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.22)',
                  padding: '0.15rem 0.5rem', borderRadius: '9999px',
                }}>
                  {vehicle.cilindraje}cc
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
              {vehicle.placa && (
                <span style={{ color: '#64748b', fontSize: '0.775rem' }}>
                  🪪 <strong style={{ color: '#94a3b8' }}>{vehicle.placa}</strong>
                </span>
              )}
              <span style={{ color: '#64748b', fontSize: '0.775rem' }}>
                📍 <strong style={{ color: '#94a3b8' }}>{vehicle.currentMileage.toLocaleString('es-CO')} km</strong>
              </span>
              {vehicle.color && (
                <span style={{ color: '#64748b', fontSize: '0.775rem' }}>🎨 {vehicle.color}</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={{
            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.22)',
            color: '#a855f7', padding: '0.4rem 0.875rem', borderRadius: '9999px',
            fontSize: '0.775rem', fontWeight: 600, cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(139,92,246,0.18)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,92,246,0.45)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(139,92,246,0.08)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,92,246,0.22)'
          }}
        >
          Editar
        </button>
      </div>

      {showForm && <VehicleForm vehicle={vehicle} onClose={() => setShowForm(false)} />}
    </>
  )
}
