import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register Service Worker for PWA offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(
    (registration) => {
      console.log('✅ Service Worker registered:', registration.scope)
    },
    (err) => {
      console.error('❌ Service Worker registration failed:', err)
    }
  )
}
