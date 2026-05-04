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
      className="fixed inset-0 flex justify-center items-center z-50 bg-slate-950/85 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-slate-900 border border-slate-400/15 p-8 rounded-2xl w-[90%] max-w-md shadow-2xl animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        <h3 className="text-xl font-semibold text-slate-50 mb-2">{title}</h3>
        {description && <p className="text-sm text-muted mb-6">{description}</p>}
        {children}
      </div>
    </div>
  )
}
