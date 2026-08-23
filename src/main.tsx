import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeI18nProvider } from './i18n/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeI18nProvider>
      <App />
    </ThemeI18nProvider>
  </StrictMode>,
)
