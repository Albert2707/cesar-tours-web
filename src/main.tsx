import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { IdiomContextProvider } from '@/context/idiomContext.tsx'
import { QueryClient, QueryClientProvider} from 'react-query'
import AuthContextProvider from '@/context/authContext.tsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
    <IdiomContextProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </IdiomContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
