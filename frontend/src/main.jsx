import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import App from './App.jsx'
import './styles/app.css'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Theme
        appearance="light"
        accentColor="green"
        grayColor="sage"
        radius="large"
        scaling="100%"
      >
        <App />
      </Theme>
    </AuthProvider>
  </StrictMode>,
)
