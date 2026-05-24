import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import { maintenanceApi } from '../../services/apiClient'

interface MaintenanceFormProps {
  onClose: () => void
  onSaved: () => void
}

const DEFAULT_VEHICLE_ID = '00000000-0000-0000-0000-000000000001'

export function MaintenanceForm({ onClose, onSaved }: MaintenanceFormProps) {
  const [form, setForm] = useState({ tipo: '', kilometraje: '', fecha: '', costo: '', descripcion: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await maintenanceApi.create({
        vehicleId: DEFAULT_VEHICLE_ID,
        tipo: form.tipo,
        fecha: new Date(form.fecha).toISOString(),
        kilometraje: parseInt(form.kilometraje),
        costo: parseFloat(form.costo) || 0,
        descripcion: form.descripcion || undefined,
      })
      onSaved()
      onClose()
    } catch {
      setError('No se pudo guardar el mantenimiento. Verifica los datos e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title="Nuevo Mantenimiento" description="Registra un nuevo servicio para tu vehículo." onClose={onClose}>
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
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Tipo de Servicio</label>
          <input className="input-field" type="text" placeholder="Ej. Cambio de aceite, Frenos..." value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})} required />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Fecha</label>
            <input className="input-field" type="date" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} required />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Kilometraje</label>
            <input className="input-field" type="number" placeholder="Ej. 45000" value={form.kilometraje} onChange={e => setForm({...form, kilometraje: e.target.value})} required />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Costo ($)</label>
          <input className="input-field" type="number" step="0.01" placeholder="Ej. 150.00" value={form.costo} onChange={e => setForm({...form, costo: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Descripción (Opcional)</label>
          <input className="input-field" type="text" placeholder="Marca de aceite, taller..." value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar Mantenimiento'}</Button>
        </div>
      </form>
    </Modal>
  )
}
