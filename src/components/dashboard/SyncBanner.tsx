export function SyncBanner() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1.5rem 2rem',
        borderRadius: '1.25rem',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(34,211,238,0.06) 100%)',
        border: '1px solid rgba(139,92,246,0.22)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 32px rgba(139,92,246,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-50%',
          right: '5%',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
        {/* Pulse dot */}
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
            boxShadow: '0 0 12px rgba(168,85,247,0.8)',
            flexShrink: 0,
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
        <span className="label-text">PWA offline</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', position: 'relative' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
          Los cambios se guardan en cola cuando no hay señal.
        </h2>
        <p style={{ fontSize: '0.825rem', color: '#475569', margin: 0 }}>
          La sincronización se reintentará automáticamente cuando regreses a conexión.
        </p>
      </div>
    </section>
  )
}
