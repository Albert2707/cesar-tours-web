import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { IdiomContextProvider } from './context/idiomContext.tsx'
import { QueryClient, QueryClientProvider} from 'react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IdiomContextProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </IdiomContextProvider>
  </StrictMode>
)
