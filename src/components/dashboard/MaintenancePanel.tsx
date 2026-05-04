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
      <article className="glass-card p-6">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <span className="label-text">Mantenimientos</span>
            <h2 className="text-xl font-semibold text-slate-50 mt-2">Qué viene después</h2>
          </div>
          <Button variant="text" onClick={() => setShowForm(true)}>Nuevo</Button>
        </div>

        <div className="grid gap-3">
          {loading && <div className="text-muted">Loading...</div>}
          {error && <div className="text-red-400">{error}</div>}
          {items && items.length === 0 && <div className="text-muted">No hay mantenimientos.</div>}
          {items?.map(item => (
            <div key={item.id} className="glass-card-inner p-4 flex items-center justify-between gap-4">
              <div>
                <strong className="text-slate-50">{item.tipo ?? 'Mantenimiento'}</strong>
                <p className="text-muted text-sm m-0">{item.kilometraje ? `${item.kilometraje} km` : ''}</p>
              </div>
              <span className="text-slate-200 font-semibold text-sm">
                {item.fecha ? new Date(item.fecha).toLocaleDateString() : ''}
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
