import { useState } from 'react'
import { Button } from '../ui/Button'
import { MaintenanceForm } from '../forms/MaintenanceForm'
import type { Mantenimiento } from '../../types'

interface MaintenancePanelProps {
  items: Mantenimiento[] | null
  loading: boolean
  error: string | null
  onReload: () => void
}

export function MaintenancePanel({ items, loading, error, onReload }: MaintenancePanelProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <article className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Panel header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div>
            <span className="label-text">Mantenimientos</span>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9', margin: '0.5rem 0 0' }}>
              Qué viene después
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
          {error && (
            <div style={{ color: '#f87171', fontSize: '0.875rem', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '0.75rem' }}>
              {error}
            </div>
          )}
          {items && items.length === 0 && (
            <div style={{ color: '#475569', fontSize: '0.875rem', padding: '2rem 0', textAlign: 'center' }}>
              No hay mantenimientos registrados.
            </div>
          )}
          {items?.map(item => (
            <div
              key={item.id}
              className="glass-card-inner"
              style={{ padding: '0.875rem 1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Icon dot */}
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                    boxShadow: '0 0 8px rgba(168,85,247,0.6)',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <strong style={{ color: '#f1f5f9', fontSize: '0.9rem', display: 'block' }}>
                    {item.tipo ?? 'Mantenimiento'}
                  </strong>
                  {item.kilometraje ? (
                    <span style={{ color: '#475569', fontSize: '0.775rem' }}>{item.kilometraje.toLocaleString()} km</span>
                  ) : null}
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#a855f7',
                  background: 'rgba(168,85,247,0.10)',
                  border: '1px solid rgba(168,85,247,0.20)',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.fecha ? new Date(item.fecha).toLocaleDateString() : '—'}
              </span>
            </div>
          ))}
        </div>
      </article>

      {showForm && (
        <MaintenanceForm onClose={() => setShowForm(false)} onSaved={onReload} />
      )}
    </>
  )
}
