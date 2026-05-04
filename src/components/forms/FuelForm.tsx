import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import { fuelApi } from '../../services/apiClient'

interface FuelFormProps {
  onClose: () => void
  onSaved: () => void
}

export function FuelForm({ onClose, onSaved }: FuelFormProps) {
  const [form, setForm] = useState({
    fecha: '',
    kilometraje: '',
    litros: '',
    costo: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fuelApi.create({
        vehicleId: '00000000-0000-0000-0000-000000000000',
        fecha: new Date(form.fecha).toISOString(),
        litros: parseFloat(form.litros),
        costo: parseFloat(form.costo),
        kilometraje: parseInt(form.kilometraje),
      })
      onSaved()
      onClose()
    } catch {
      alert('Error al crear gasto de combustible')
    }
  }

  return (
    <Modal title="Nuevo Gasto de Combustible" description="Registra tu última recarga para llevar el control." onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Fecha</label>
            <input className="input-field" type="date" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} required />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Kilometraje Actual</label>
            <input className="input-field" type="number" placeholder="Ej. 45500" value={form.kilometraje} onChange={e => setForm({...form, kilometraje: e.target.value})} required />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Litros (L)</label>
            <input className="input-field" type="number" step="0.01" placeholder="Ej. 40.5" value={form.litros} onChange={e => setForm({...form, litros: e.target.value})} required />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-slate-300 font-medium uppercase tracking-wide">Costo Total ($)</label>
            <input className="input-field" type="number" step="0.01" placeholder="Ej. 50000" value={form.costo} onChange={e => setForm({...form, costo: e.target.value})} required />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Guardar Gasto</Button>
        </div>
      </form>
    </Modal>
  )
}
