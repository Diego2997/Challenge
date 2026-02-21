import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChallengeProvider } from './providers/ChallengeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChallengeProvider>
      <App />
    </ChallengeProvider>
  </StrictMode>,
)
