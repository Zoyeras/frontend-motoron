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

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">MotorON PWA</span>
          <h1>Controla mantenimiento y combustible sin perder el ritmo del taller.</h1>
          <p>
            Registra mantenimientos, gastos de combustible y calcula el próximo cambio de aceite
            según tu recorrido diario.
          </p>

          <div className="hero-actions">
            <button type="button" className="primary-button">
              Instalar en celular
            </button>
            <button type="button" className="secondary-button">
              Ver historial
            </button>
          </div>
        </div>

        <aside className="hero-card">
          <div className="hero-card__top">
            <span>Próximo cambio de aceite</span>
            <strong>{forecast?.estimatedDate ? new Date(forecast.estimatedDate).toLocaleDateString() : '—'}</strong>
          </div>
          <div className="progress-ring" aria-hidden="true">
            <div className="progress-ring__value">{forecast ? `${Math.round(((forecast.oilChangeIntervalKilometers - (forecast.kilometersSinceLastOilChange ?? 0)) / forecast.oilChangeIntervalKilometers) * 100)}%` : '—'}</div>
          </div>
          <ul className="hero-card__stats">
            <li>
              <span>Promedio diario</span>
              <strong>{forecast?.averageDailyKilometers ?? '—'}</strong>
            </li>
            <li>
              <span>Km restantes</span>
              <strong>{forecast?.kilometersRemaining ?? '—'}</strong>
            </li>
            <li>
              <span>Último servicio</span>
              <strong>{forecast?.lastOilChangeDate ? new Date(forecast.lastOilChangeDate).toLocaleDateString() : '—'}</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section className="stats-grid">
        <article className="stat-card accent">
          <span>Total gastado en combustible</span>
          <strong>$139.900</strong>
          <small>Últimos 30 días</small>
        </article>
        <article className="stat-card">
          <span>Mantenimientos registrados</span>
          <strong>12</strong>
          <small>Historial completo</small>
        </article>
        <article className="stat-card">
          <span>Promedio km/día</span>
          <strong>72</strong>
          <small>Basado en carga reciente</small>
        </article>
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

      {/* Modals for forms (basic inline for now) */}
      {showMaintenanceForm && (
        <div className="modal-overlay" style={{background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100}}>
          <div className="modal-content" style={{background: 'white', padding: '20px', borderRadius: '8px', color: 'black', width: '90%', maxWidth: '400px'}}>
            <h3 style={{marginTop: 0}}>Nuevo Mantenimiento</h3>
            <form onSubmit={handleCreateMaintenance} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <input type="text" placeholder="Tipo (ej. Cambio de aceite)" value={mForm.tipo} onChange={e => setMForm({...mForm, tipo: e.target.value})} required style={{padding: '8px'}} />
              <input type="date" value={mForm.fecha} onChange={e => setMForm({...mForm, fecha: e.target.value})} required style={{padding: '8px'}} />
              <input type="number" placeholder="Kilometraje" value={mForm.kilometraje} onChange={e => setMForm({...mForm, kilometraje: e.target.value})} required style={{padding: '8px'}} />
              <input type="text" placeholder="Notas (opcional)" value={mForm.notas} onChange={e => setMForm({...mForm, notas: e.target.value})} style={{padding: '8px'}} />
              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button type="submit" className="primary-button" style={{flex: 1}}>Guardar</button>
                <button type="button" onClick={() => setShowMaintenanceForm(false)} className="secondary-button" style={{flex: 1}}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFuelForm && (
        <div className="modal-overlay" style={{background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100}}>
          <div className="modal-content" style={{background: 'white', padding: '20px', borderRadius: '8px', color: 'black', width: '90%', maxWidth: '400px'}}>
            <h3 style={{marginTop: 0}}>Nuevo Gasto de Combustible</h3>
            <form onSubmit={handleCreateFuel} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <input type="date" value={fForm.fecha} onChange={e => setFForm({...fForm, fecha: e.target.value})} required style={{padding: '8px'}} />
              <input type="number" placeholder="Kilometraje actual" value={fForm.kilometraje} onChange={e => setFForm({...fForm, kilometraje: e.target.value})} required style={{padding: '8px'}} />
              <input type="number" step="0.01" placeholder="Litros" value={fForm.litros} onChange={e => setFForm({...fForm, litros: e.target.value})} required style={{padding: '8px'}} />
              <input type="number" step="0.01" placeholder="Costo total ($)" value={fForm.costo} onChange={e => setFForm({...fForm, costo: e.target.value})} required style={{padding: '8px'}} />
              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button type="submit" className="primary-button" style={{flex: 1}}>Guardar</button>
                <button type="button" onClick={() => setShowFuelForm(false)} className="secondary-button" style={{flex: 1}}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
