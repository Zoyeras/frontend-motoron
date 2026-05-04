import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'

interface HeaderProps {
  onReload: () => void
}

export function Header({ onReload }: HeaderProps) {
  const { logout } = useAuth()

  return (
    <header className="flex justify-between items-center pb-6 border-b border-white/5">
      <div className="flex items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-3xl font-bold text-slate-50 m-0 tracking-tight">MotorON Panel</h1>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onReload}>Recargar Datos</Button>
        <Button variant="text" onClick={logout}>Cerrar Sesión</Button>
      </div>
    </header>
  )
}
