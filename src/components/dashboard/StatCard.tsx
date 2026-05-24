interface StatCardProps {
  label: string
  value: string
  subtitle: string
  accent?: boolean
}

export function StatCard({ label, value, subtitle, accent }: StatCardProps) {
  return (
    <article
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '0.25rem',
        position: 'relative',
        overflow: 'hidden',
        background: accent
          ? 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(34,211,238,0.06) 100%)'
          : undefined,
        borderColor: accent ? 'rgba(168,85,247,0.28)' : undefined,
      }}
    >
      {/* Glow accent */}
      {accent && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-40%',
            right: '-20%',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)',
            filter: 'blur(24px)',
            pointerEvents: 'none',
          }}
        />
      )}

      <span className="label-text">{label}</span>

      <strong
        style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          lineHeight: 1.15,
          background: accent
            ? 'linear-gradient(135deg, #c084fc 0%, #22d3ee 100%)'
            : 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginTop: '0.375rem',
        }}
      >
        {value}
      </strong>

      <small style={{ color: '#475569', fontSize: '0.8rem', marginTop: '0.125rem' }}>
        {subtitle}
      </small>
    </article>
  )
}
