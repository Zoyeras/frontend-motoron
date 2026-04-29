import './App.css'

const maintenanceItems = [
  {
    title: 'Cambio de aceite',
    km: '4,350 km',
    due: 'En 650 km',
    tone: 'soon',
  },
  {
    title: 'Rotación de neumáticos',
    km: '18,200 km',
    due: 'En 2,800 km',
    tone: 'future',
  },
  {
    title: 'Filtro de aire',
    km: '12,100 km',
    due: 'Pendiente de revisión',
    tone: 'neutral',
  },
]

const fuelItems = [
  {
    date: '28 Abr',
    liters: '38.5 L',
    cost: '$46.800',
    mileage: '18,240 km',
  },
  {
    date: '25 Abr',
    liters: '41.2 L',
    cost: '$49.100',
    mileage: '18,090 km',
  },
  {
    date: '21 Abr',
    liters: '36.8 L',
    cost: '$44.000',
    mileage: '17,820 km',
  },
]

function App() {
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
            <strong>En 9 días</strong>
          </div>
          <div className="progress-ring" aria-hidden="true">
            <div className="progress-ring__value">86%</div>
          </div>
          <ul className="hero-card__stats">
            <li>
              <span>Promedio diario</span>
              <strong>72 km</strong>
            </li>
            <li>
              <span>Km restantes</span>
              <strong>650 km</strong>
            </li>
            <li>
              <span>Último servicio</span>
              <strong>12 Abr 2026</strong>
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
            <button type="button" className="text-button">
              Ver todos
            </button>
          </div>

          <div className="maintenance-list">
            {maintenanceItems.map((item) => (
              <div key={item.title} className={`maintenance-item ${item.tone}`}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.km}</p>
                </div>
                <span>{item.due}</span>
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
            <button type="button" className="text-button">
              Nuevo gasto
            </button>
          </div>

          <div className="fuel-list">
            {fuelItems.map((item) => (
              <div key={`${item.date}-${item.mileage}`} className="fuel-item">
                <div>
                  <strong>{item.date}</strong>
                  <p>{item.mileage}</p>
                </div>
                <div className="fuel-item__metrics">
                  <span>{item.liters}</span>
                  <strong>{item.cost}</strong>
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
    </main>
  )
}

export default App
