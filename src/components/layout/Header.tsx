import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'

interface HeaderProps {
  onReload: () => void
}

export function Header({ onReload }: HeaderProps) {
  const { logout } = useAuth()

  return (
    <header
      className="flex justify-between items-center py-5 px-6 rounded-2xl"
      style={{
        background: 'rgba(12, 15, 30, 0.72)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(139, 92, 246, 0.14)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.06) inset',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Logo icon — gradient morado→cyan */}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.7))' }}>
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <div>
          <h1
            className="text-2xl font-bold m-0 leading-none tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MotorON
          </h1>
          <span style={{ fontSize: '0.65rem', color: '#4b5563', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
            Panel de Control
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={onReload}>Recargar</Button>
        <Button variant="text" onClick={logout}>Cerrar Sesión</Button>
      </div>
    </header>
  )
}
