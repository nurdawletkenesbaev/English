import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if (import.meta.env.DEV) {
  const forcedVersion = 1 // <-- o'zgartirsangiz reset bo'ladi
  const key = '1'
  if (localStorage.getItem(key) !== String(forcedVersion)) {
    localStorage.removeItem('words')
    localStorage.setItem(key, forcedVersion)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
