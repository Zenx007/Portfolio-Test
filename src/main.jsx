import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GourmetBistro from './GourmetBistro.jsx'

const root = createRoot(document.getElementById('root'))
const path = window.location.pathname

if (path === '/gourmet-bistro' || path === '/gourmet-bistro/') {
  root.render(
    <StrictMode>
      <GourmetBistro />
    </StrictMode>,
  )
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
