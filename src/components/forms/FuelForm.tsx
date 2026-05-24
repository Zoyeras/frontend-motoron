import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import { fuelApi } from '../../services/apiClient'

interface FuelFormProps {
  onClose: () => void
  onSaved: () => void
}

const DEFAULT_VEHICLE_ID = '00000000-0000-0000-0000-000000000001'

// Precio galón por defecto Colombia (~$10.500 COP/gal aprox)
const DEFAULT_PRECIO_GALON = ''

export function FuelForm({ onClose, onSaved }: FuelFormProps) {
  const [form, setForm] = useState({
    fecha: '',
    kilometraje: '',
    precioGalon: DEFAULT_PRECIO_GALON,
    costo: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Litros calculados en tiempo real
  const litrosCalculados =
    form.costo && form.precioGalon && parseFloat(form.precioGalon) > 0
      ? (parseFloat(form.costo) / parseFloat(form.precioGalon)).toFixed(2)
      : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const precioGalon = parseFloat(form.precioGalon)
    const costo = parseFloat(form.costo)

    if (!precioGalon || precioGalon <= 0) {
      setError('El precio del galón debe ser mayor a 0.')
      return
    }
    if (!costo || costo <= 0) {
      setError('El costo debe ser mayor a 0.')
      return
    }

    const litros = costo / precioGalon

    setLoading(true)
    try {
      await fuelApi.create({
        vehicleId: DEFAULT_VEHICLE_ID,
        fecha: new Date(form.fecha).toISOString(),
        litros,
        costo,
        kilometraje: form.kilometraje ? parseInt(form.kilometraje) : null,
      })
      onSaved()
      onClose()
    } catch {
      setError('No se pudo guardar el gasto. Verifica los datos e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Nuevo Gasto de Combustible"
      description="Ingresa cuánto gastaste y el precio del galón."
      onClose={onClose}
    >
      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
          color: '#f87171', padding: '0.625rem 0.875rem', borderRadius: '0.625rem',
          fontSize: '0.825rem', marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Fecha */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Fecha</label>
          <input
            className="input-field"
            type="date"
            value={form.fecha}
            onChange={e => setForm({ ...form, fecha: e.target.value })}
            required
          />
        </div>

        {/* Precio galón + Costo total */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">
              Precio por Galón ($)
            </label>
            <input
              className="input-field"
              type="number"
              step="0.01"
              placeholder="Ej. 10500"
              value={form.precioGalon}
              onChange={e => setForm({ ...form, precioGalon: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">
              Costo Total ($)
            </label>
            <input
              className="input-field"
              type="number"
              step="0.01"
              placeholder="Ej. 50000"
              value={form.costo}
              onChange={e => setForm({ ...form, costo: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Preview litros calculados */}
        {litrosCalculados && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.625rem 0.875rem',
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.20)',
            borderRadius: '0.625rem',
            fontSize: '0.825rem',
          }}>
            <span style={{ color: '#64748b' }}>Litros calculados:</span>
            <strong style={{
              background: 'linear-gradient(135deg, #c084fc, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {litrosCalculados} L
            </strong>
          </div>
        )}

        {/* Kilometraje — opcional */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">
            Kilometraje Actual{' '}
            <span style={{ color: '#475569', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>
              (opcional)
            </span>
          </label>
          <input
            className="input-field"
            type="number"
            placeholder="Ej. 45500"
            value={form.kilometraje}
            onChange={e => setForm({ ...form, kilometraje: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Gasto'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
