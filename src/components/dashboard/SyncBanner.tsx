export function SyncBanner() {
  return (
    <section className="glass-card mt-5 px-7 py-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-br from-sky-950/95 to-slate-900/90">
      <div>
        <span className="label-text">PWA offline</span>
        <h2 className="text-xl font-semibold text-slate-50 mt-2">Los cambios se guardan en cola cuando no hay señal.</h2>
      </div>
      <p className="text-muted text-sm m-0">
        La sincronización se reintentará automáticamente cuando regreses a conexión.
      </p>
    </section>
  )
}
