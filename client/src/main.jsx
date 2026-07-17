import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SudokuPage } from './components/SudokuPage.jsx'
import { SudokuNine } from './components/SudokuNine.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SudokuNine />
  </StrictMode>,
)
