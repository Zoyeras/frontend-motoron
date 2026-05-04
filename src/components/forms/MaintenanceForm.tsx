import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import { maintenanceApi } from '../../services/apiClient'

interface MaintenanceFormProps {
  onClose: () => void
  onSaved: () => void
}

export function MaintenanceForm({ onClose, onSaved }: MaintenanceFormProps) {
  const [form, setForm] = useState({
    tipo: '',
    kilometraje: '',
    fecha: '',
    costo: '',
    descripcion: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await maintenanceApi.create({
        vehicleId: '00000000-0000-0000-0000-000000000000',
        tipo: form.tipo,
        fecha: new Date(form.fecha).toISOString(),
        kilometraje: parseInt(form.kilometraje),
        costo: parseFloat(form.costo) || 0,
        descripcion: form.descripcion || undefined,
      })
      onSaved()
      onClose()
    } catch {
      alert('Error al crear mantenimiento')
    }
  }

  return (
    <Modal title="Nuevo Mantenimiento" description="Registra un nuevo servicio para tu vehículo." onClose={onClose}>
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
          <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Guardar Mantenimiento</Button>
        </div>
      </form>
    </Modal>
  )
}
