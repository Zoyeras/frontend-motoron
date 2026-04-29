import './App.css'
import { useEffect, useState } from 'react'
import { maintenanceApi, fuelApi } from './services/apiClient'

function App() {
  const [maintenanceItems, setMaintenanceItems] = useState<any[] | null>(null)
  const [fuelItems, setFuelItems] = useState<any[] | null>(null)
  const [forecast, setForecast] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false)
  const [showFuelForm, setShowFuelForm] = useState(false)

  const [mForm, setMForm] = useState({ tipo: '', kilometraje: '', fecha: '', notas: '' })
  const [fForm, setFForm] = useState({ kilometraje: '', litros: '', costo: '', fecha: '' })

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [mList, fList, fc] = await Promise.all([
        maintenanceApi.list(),
        fuelApi.list(),
        maintenanceApi.getOilChangeForecast(),
      ])

      setMaintenanceItems(mList)
      setFuelItems(fList)
      setForecast(fc)
    } catch (err: any) {
      setError(err?.message ?? 'Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      loadData()
    }
    return () => {
      mounted = false
    }
  }, [])

  const handleCreateMaintenance = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await maintenanceApi.create({
        vehicleId: 1, // Default vehicle for now
        tipo: mForm.tipo,
        fecha: new Date(mForm.fecha).toISOString(),
        kilometraje: parseInt(mForm.kilometraje),
        notas: mForm.notas,
        costo: 0
      })
      setShowMaintenanceForm(false)
      loadData()
    } catch (err) {
      console.error(err)
      alert("Error al crear mantenimiento")
    }
  }

  const handleCreateFuel = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fuelApi.create({
        vehicleId: 1, // Default vehicle
        fecha: new Date(fForm.fecha).toISOString(),
        litros: parseFloat(fForm.litros),
        costo: parseFloat(fForm.costo),
        kilometraje: parseInt(fForm.kilometraje)
      })
      setShowFuelForm(false)
      loadData()
    } catch (err) {
      console.error(err)
      alert("Error al crear gasto de combustible")
    }
  }

  const totalFuelCost = fuelItems?.reduce((sum, item) => sum + (Number(item.costo) || 0), 0) || 0
  const totalMaintenances = maintenanceItems?.length || 0
  const avgKm = forecast?.averageDailyKilometers || 0

  return (
    <main className="app-shell dashboard-layout">
      <header className="dashboard-header">
        <div className="brand-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>MotorON Panel</h1>
        </div>
        <div className="header-actions">
          <button type="button" className="secondary-button" onClick={() => loadData()}>
             Recargar Datos
          </button>
        </div>
      </header>

      <section className="kpi-grid">
        <aside className="hero-card kpi-main">
          <div className="hero-card__top">
            <span>Próximo cambio de aceite</span>
            <strong>{forecast?.estimatedDate ? new Date(forecast.estimatedDate).toLocaleDateString() : 'Pendiente'}</strong>
          </div>
          <div className="progress-ring" aria-hidden="true">
            <div className="progress-ring__value">{forecast ? `${Math.round(((forecast.oilChangeIntervalKilometers - (forecast.kilometersSinceLastOilChange ?? 0)) / forecast.oilChangeIntervalKilometers) * 100)}%` : '—'}</div>
          </div>
          <ul className="hero-card__stats">
            <li>
              <span>Promedio diario</span>
              <strong>{forecast?.averageDailyKilometers ? `${forecast.averageDailyKilometers} km` : '—'}</strong>
            </li>
            <li>
              <span>Km restantes</span>
              <strong>{forecast?.kilometersRemaining ? `${forecast.kilometersRemaining} km` : '—'}</strong>
            </li>
            <li>
              <span>Último servicio</span>
              <strong>{forecast?.lastOilChangeDate ? new Date(forecast.lastOilChangeDate).toLocaleDateString() : '—'}</strong>
            </li>
          </ul>
        </aside>

        <div className="kpi-stats">
          <article className="stat-card accent">
            <div className="stat-card-icon">
              <span className="panel__label">Combustible</span>
            </div>
            <strong>${totalFuelCost.toLocaleString('es-ES')}</strong>
            <small>Gasto Total Histórico</small>
          </article>
          <article className="stat-card">
            <div className="stat-card-icon">
              <span className="panel__label">Servicios</span>
            </div>
            <strong>{totalMaintenances}</strong>
            <small>Mantenimientos registrados</small>
          </article>
          <article className="stat-card">
            <div className="stat-card-icon">
              <span className="panel__label">Uso Diario</span>
            </div>
            <strong>{avgKm} km/día</strong>
            <small>Promedio dinámico</small>
          </article>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel__header">
            <div>
              <span className="panel__label">Mantenimientos</span>
              <h2>Qué viene después</h2>
            </div>
            <button type="button" className="text-button" onClick={() => setShowMaintenanceForm(true)}>
              Nuevo
            </button>
          </div>

          <div className="maintenance-list">
            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
            {maintenanceItems && maintenanceItems.length === 0 && <div>No hay mantenimientos.</div>}
            {maintenanceItems && maintenanceItems.map((item) => (
              <div key={item.id} className={`maintenance-item`}>
                <div>
                  <strong>{item.tipo ?? 'Mantenimiento'}</strong>
                  <p>{item.kilometraje ? `${item.kilometraje} km` : ''}</p>
                </div>
                <span>{item.fecha ? new Date(item.fecha).toLocaleDateString() : ''}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <span className="panel__label">Combustible</span>
              <h2>Últimos registros</h2>
            </div>
            <button type="button" className="text-button" onClick={() => setShowFuelForm(true)}>
              Nuevo gasto
            </button>
          </div>

          <div className="fuel-list">
            {loading && <div>Loading...</div>}
            {fuelItems && fuelItems.length === 0 && <div>No hay registros de combustible.</div>}
            {fuelItems && fuelItems.map((item) => (
              <div key={item.id} className="fuel-item">
                <div>
                  <strong>{item.fecha ? new Date(item.fecha).toLocaleDateString() : ''}</strong>
                  <p>{item.kilometraje ? `${item.kilometraje} km` : ''}</p>
                </div>
                <div className="fuel-item__metrics">
                  <span>{item.litros ? `${Number(item.litros).toFixed(2)} L` : ''}</span>
                  <strong>{item.costo ? `$${Number(item.costo).toFixed(2)}` : ''}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="sync-banner">
        <div>
          <span className="panel__label">PWA offline</span>
          <h2>Los cambios se guardan en cola cuando no hay señal.</h2>
        </div>
        <p>
          La sincronización se reintentará automáticamente cuando regreses a conexión.
        </p>
      </section>

      {/* Modals for forms */}
      {showMaintenanceForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Nuevo Mantenimiento</h3>
            <p className="modal-description">Registra un nuevo servicio para tu vehículo.</p>
            <form onSubmit={handleCreateMaintenance} className="motoron-form">
              <div className="form-group">
                <label>Tipo de Servicio</label>
                <input type="text" placeholder="Ej. Cambio de aceite, Frenos..." value={mForm.tipo} onChange={e => setMForm({...mForm, tipo: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={mForm.fecha} onChange={e => setMForm({...mForm, fecha: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Kilometraje</label>
                  <input type="number" placeholder="Ej. 45000" value={mForm.kilometraje} onChange={e => setMForm({...mForm, kilometraje: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Notas (Opcional)</label>
                <input type="text" placeholder="Marca de aceite, taller..." value={mForm.notas} onChange={e => setMForm({...mForm, notas: e.target.value})} />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowMaintenanceForm(false)} className="secondary-button">Cancelar</button>
                <button type="submit" className="primary-button">Guardar Mantenimiento</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFuelForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Nuevo Gasto de Combustible</h3>
            <p className="modal-description">Registra tu última recarga para llevar el control.</p>
            <form onSubmit={handleCreateFuel} className="motoron-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={fForm.fecha} onChange={e => setFForm({...fForm, fecha: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Kilometraje Actual</label>
                  <input type="number" placeholder="Ej. 45500" value={fForm.kilometraje} onChange={e => setFForm({...fForm, kilometraje: e.target.value})} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Litros (L)</label>
                  <input type="number" step="0.01" placeholder="Ej. 40.5" value={fForm.litros} onChange={e => setFForm({...fForm, litros: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Costo Total ($)</label>
                  <input type="number" step="0.01" placeholder="Ej. 50000" value={fForm.costo} onChange={e => setFForm({...fForm, costo: e.target.value})} required />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowFuelForm(false)} className="secondary-button">Cancelar</button>
                <button type="submit" className="primary-button">Guardar Gasto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
