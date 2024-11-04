import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { IdiomContextProvider } from './context/idiomContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IdiomContextProvider>
    <App />
    </IdiomContextProvider>
  </StrictMode>,
)
