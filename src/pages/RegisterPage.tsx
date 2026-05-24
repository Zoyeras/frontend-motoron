import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      await register(email, password, name)
      navigate('/', { replace: true })
    } catch {
      setError('No se pudo registrar. Intenta con otro email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(34,211,238,0.07) 0%, transparent 50%), #060812',
      }}
    >
      {/* Floating orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: '15%', right: '8%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
          animation: 'float 9s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', bottom: '12%', left: '6%',
          width: '220px', height: '220px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
          animation: 'float 11s ease-in-out infinite reverse',
        }}
      />

      <div
        className="w-full max-w-md"
        style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div
          style={{
            background: 'rgba(12,15,30,0.82)',
            backdropFilter: 'blur(28px) saturate(200%)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
            border: '1px solid rgba(139,92,246,0.20)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            boxShadow: '0 8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.08) inset, 0 0 60px rgba(139,92,246,0.06)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.8))' }}>
              <defs>
                <linearGradient id="logoGradReg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#logoGradReg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="url(#logoGradReg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#logoGradReg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              className="text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MotorON
            </span>
          </div>

          <div className="neon-divider mb-7" />

          <h2 className="text-xl font-semibold text-slate-100 mb-1">Crear Cuenta</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
            Completa los datos para registrarte.
          </p>

          {error && (
            <div
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#f87171',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                marginBottom: '1rem',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { label: 'Nombre', type: 'text', placeholder: 'Tu nombre', value: name, onChange: (v: string) => setName(v) },
              { label: 'Email', type: 'email', placeholder: 'correo@ejemplo.com', value: email, onChange: (v: string) => setEmail(v) },
              { label: 'Contraseña', type: 'password', placeholder: '••••••••', value: password, onChange: (v: string) => setPassword(v), min: 6 },
              { label: 'Confirmar Contraseña', type: 'password', placeholder: '••••••••', value: confirmPassword, onChange: (v: string) => setConfirmPassword(v), min: 6 },
            ].map(({ label, type, placeholder, value, onChange, min }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                  {label}
                </label>
                <input
                  type={type}
                  className="input-field"
                  placeholder={placeholder}
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  required
                  minLength={min}
                />
              </div>
            ))}

            <button type="submit" className="btn-primary mt-3" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#64748b', marginTop: '1.5rem' }}>
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600, transition: 'color 200ms ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
              onMouseLeave={e => (e.currentTarget.style.color = '#a855f7')}
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
