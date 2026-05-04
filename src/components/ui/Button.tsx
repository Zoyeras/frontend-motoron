import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text'
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    text: 'btn-text',
  }[variant]

  return <button className={`${base} ${className}`} {...props} />
}
