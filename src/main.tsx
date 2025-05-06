import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from "./app/index";
import './index.css'
import "./App.css"
import { FirebaseContextProvider } from './lib/firebase/context/firebsae-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseContextProvider>
      <App />
    </FirebaseContextProvider>
  </StrictMode>,
)
