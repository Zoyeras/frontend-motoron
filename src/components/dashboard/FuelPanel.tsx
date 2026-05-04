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
      <article className="glass-card p-6">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <span className="label-text">Combustible</span>
            <h2 className="text-xl font-semibold text-slate-50 mt-2">Últimos registros</h2>
          </div>
          <Button variant="text" onClick={() => setShowForm(true)}>Nuevo gasto</Button>
        </div>

        <div className="grid gap-3">
          {loading && <div className="text-muted">Loading...</div>}
          {items && items.length === 0 && <div className="text-muted">No hay registros de combustible.</div>}
          {items?.map(item => (
            <div key={item.id} className="glass-card-inner p-4 flex items-center justify-between gap-4">
              <div>
                <strong className="text-slate-50">
                  {item.fecha ? new Date(item.fecha).toLocaleDateString() : ''}
                </strong>
                <p className="text-muted text-sm m-0">{item.kilometraje ? `${item.kilometraje} km` : ''}</p>
              </div>
              <div className="grid justify-items-end">
                <span className="text-slate-200 font-semibold text-sm">
                  {item.litros ? `${Number(item.litros).toFixed(2)} L` : ''}
                </span>
                <strong className="text-slate-50">
                  {item.costo ? `$${Number(item.costo).toFixed(2)}` : ''}
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
