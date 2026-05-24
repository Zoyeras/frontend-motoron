import type { ReactNode } from 'react'

interface ModalProps {
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, description, onClose, children }: ModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        background: 'rgba(2,4,9,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.2s ease',
        padding: '1rem',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: 'rgba(10,13,26,0.95)',
          backdropFilter: 'blur(28px) saturate(200%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%)',
          border: '1px solid rgba(139,92,246,0.24)',
          borderRadius: '1.25rem',
          padding: '2rem',
          width: '90%',
          maxWidth: '28rem',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(139,92,246,0.08) inset, 0 0 40px rgba(139,92,246,0.08)',
          animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Modal header */}
        <div style={{ marginBottom: description ? '0.375rem' : '1.5rem' }}>
          <h3
            style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #e2e8f0 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>
        {description && (
          <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '1.5rem', marginTop: '0.25rem' }}>
            {description}
          </p>
        )}

        {/* Divider */}
        <div className="neon-divider" style={{ marginBottom: '1.5rem' }} />

        {children}
      </div>
    </div>
  )
}
