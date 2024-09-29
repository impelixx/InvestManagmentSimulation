import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './style.css'
import { HelloPage } from './pages/Hello/HelloPage.tsx'
// import axios from 'axios';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelloPage />
  </StrictMode>
)
