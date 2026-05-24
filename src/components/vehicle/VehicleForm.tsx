import { useState } from 'react'
import { Modal } from '../forms/Modal'
import { Button } from '../ui/Button'
import { vehicleApi } from '../../services/apiClient'
import { useVehicle } from '../../context/VehicleContext'
import type { Vehicle } from '../../types'

interface VehicleFormProps {
  vehicle?: Vehicle
  onClose: () => void
}

export function VehicleForm({ vehicle, onClose }: VehicleFormProps) {
  const { reload } = useVehicle()
  const isEdit = !!vehicle

  const [form, setForm] = useState({
    brand: vehicle?.brand ?? '',
    model: vehicle?.model ?? '',
    year: vehicle?.year?.toString() ?? '',
    currentMileage: vehicle?.currentMileage?.toString() ?? '',
    placa: vehicle?.placa ?? '',
    cilindraje: vehicle?.cilindraje?.toString() ?? '',
    color: vehicle?.color ?? '',
    numeroSerie: vehicle?.numeroSerie ?? '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = {
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: parseInt(form.year),
        currentMileage: parseInt(form.currentMileage) || 0,
        placa: form.placa.trim() || null,
        cilindraje: form.cilindraje ? parseInt(form.cilindraje) : null,
        color: form.color.trim() || null,
        numeroSerie: form.numeroSerie.trim() || null,
      }
      if (isEdit && vehicle) {
        await vehicleApi.update(vehicle.id, payload)
      } else {
        await vehicleApi.create(payload)
      }
      await reload()
      onClose()
    } catch {
      setError('No se pudo guardar el vehículo. Verifica los datos.')
    } finally {
      setLoading(false)
    }
  }

  const fields: { label: string; field: string; type?: string; placeholder: string; required?: boolean }[] = [
    { label: 'Marca', field: 'brand', placeholder: 'Ej. Honda', required: true },
    { label: 'Modelo', field: 'model', placeholder: 'Ej. CB 190R', required: true },
    { label: 'Año', field: 'year', type: 'number', placeholder: 'Ej. 2022', required: true },
    { label: 'Km actuales', field: 'currentMileage', type: 'number', placeholder: 'Ej. 12500' },
    { label: 'Placa', field: 'placa', placeholder: 'Ej. ABC123' },
    { label: 'Cilindraje (cc)', field: 'cilindraje', type: 'number', placeholder: 'Ej. 190' },
    { label: 'Color', field: 'color', placeholder: 'Ej. Rojo' },
    { label: 'Número de serie / VIN', field: 'numeroSerie', placeholder: 'Ej. 9FBBX...' },
  ]

  return (
    <Modal
      title={isEdit ? 'Editar Vehículo' : 'Registrar Vehículo'}
      description={isEdit ? 'Actualiza los datos de tu moto.' : 'Ingresa los datos de tu moto para comenzar.'}
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {fields.map(({ label, field, type, placeholder, required }) => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                {label}
              </label>
              <input
                className="input-field"
                type={type ?? 'text'}
                placeholder={placeholder}
                value={form[field as keyof typeof form]}
                onChange={set(field)}
                required={required}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Registrar'}</Button>
        </div>
      </form>
    </Modal>
  )
}
