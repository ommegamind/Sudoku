import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SudokuPage } from './components/SudokuPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SudokuPage />
  </StrictMode>,
)
