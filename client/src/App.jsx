import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext.jsx'
import ModalProvider from './components/feedback/ModalProvider'
import ToastProvider from './components/feedback/ToastProvider'
import './styles/globals.css'

function App() {
  return (
    <BrowserRouter><AuthProvider><ToastProvider><ModalProvider><AppRoutes /></ModalProvider></ToastProvider></AuthProvider></BrowserRouter>
  )
}

export default App
