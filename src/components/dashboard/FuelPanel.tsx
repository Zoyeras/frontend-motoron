import { useState } from 'react'
import { Button } from '../ui/Button'
import { FuelForm } from '../forms/FuelForm'
import type { GastoCombustible } from '../../types'

interface FuelPanelProps {
  items: GastoCombustible[] | null
  loading: boolean
  onReload: () => void
}

export function FuelPanel({ items, loading, onReload }: FuelPanelProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <article className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Panel header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div>
            <span className="label-text">Combustible</span>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9', margin: '0.5rem 0 0' }}>
              Últimos registros
            </h2>
          </div>
          <Button variant="secondary" onClick={() => setShowForm(true)}>
            + Nuevo
          </Button>
        </div>

        {/* Divider */}
        <div className="neon-divider" />

        {/* Items */}
        <div style={{ display: 'grid', gap: '0.625rem' }}>
          {loading && (
            <div style={{ color: '#475569', fontSize: '0.875rem', padding: '1rem 0', textAlign: 'center' }}>
              Cargando...
            </div>
          )}
          {items && items.length === 0 && (
            <div style={{ color: '#475569', fontSize: '0.875rem', padding: '2rem 0', textAlign: 'center' }}>
              No hay registros de combustible.
            </div>
          )}
          {items?.map(item => (
            <div
              key={item.id}
              className="glass-card-inner"
              style={{ padding: '0.875rem 1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Icon dot — cyan for fuel */}
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22d3ee, #818cf8)',
                    boxShadow: '0 0 8px rgba(34,211,238,0.6)',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <strong style={{ color: '#f1f5f9', fontSize: '0.9rem', display: 'block' }}>
                    {item.fecha ? new Date(item.fecha).toLocaleDateString() : '—'}
                  </strong>
                  {item.kilometraje ? (
                    <span style={{ color: '#475569', fontSize: '0.775rem' }}>{item.kilometraje.toLocaleString()} km</span>
                  ) : null}
                </div>
              </div>

              <div style={{ display: 'grid', justifyItems: 'end', gap: '0.125rem' }}>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#22d3ee',
                    fontWeight: 600,
                  }}
                >
                  {item.litros ? `${Number(item.litros).toFixed(2)} L` : '—'}
                </span>
                <strong
                  style={{
                    fontSize: '0.9rem',
                    background: 'linear-gradient(135deg, #c084fc, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 700,
                  }}
                >
                  {item.costo ? `$${Number(item.costo).toFixed(2)}` : '—'}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </article>

      {showForm && (
        <FuelForm onClose={() => setShowForm(false)} onSaved={onReload} />
      )}
    </>
  )
}
