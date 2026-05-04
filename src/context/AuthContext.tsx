import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { AuthResponse } from '../types'
import { authApi } from '../services/apiClient'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const TOKEN_KEY = 'motoron_token'
const REFRESH_KEY = 'motoron_refresh'

function saveTokens(auth: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, auth.token)
  localStorage.setItem(REFRESH_KEY, auth.refreshToken)
}

function clearTokens() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: localStorage.getItem(TOKEN_KEY),
    isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  })

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      setState({ token, isAuthenticated: true })
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password })
    saveTokens(response)
    setState({ token: response.token, isAuthenticated: true })
  }

  const register = async (email: string, password: string, name: string) => {
    const response = await authApi.register({ email, password, name })
    saveTokens(response)
    setState({ token: response.token, isAuthenticated: true })
  }

  const logout = () => {
    clearTokens()
    setState({ token: null, isAuthenticated: false })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
