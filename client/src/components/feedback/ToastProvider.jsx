import { useCallback, useMemo, useRef, useState } from 'react'
import ToastContext from '../../context/ToastContext'
import ToastContainer from './ToastContainer'

export default function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const sequence = useRef(0)
  const dismiss = useCallback((id) => setItems((current) => current.filter((item) => item.id !== id)), [])
  const show = useCallback((type, message, options = {}) => {
    const id = options.id || `toast-${++sequence.current}`
    const item = { id, type, title: options.title || message, description: options.title ? message : options.description, action: options.action }
    setItems((current) => [...current.filter((toast) => toast.id !== id), item])
    if (options.duration !== 0 && type !== 'loading') window.setTimeout(() => dismiss(id), options.duration || 4000)
    return id
  }, [dismiss])
  const update = useCallback((id, changes) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...changes } : item)), [])
  const toast = useMemo(() => ({
    success: (message, options) => show('success', message, options),
    error: (message, options) => show('error', message, options),
    warning: (message, options) => show('warning', message, options),
    info: (message, options) => show('info', message, options),
    loading: (message, options) => show('loading', message, { ...options, duration: 0 }),
    update,
    dismiss,
  }), [dismiss, show, update])
  return <ToastContext.Provider value={toast}><>{children}<ToastContainer items={items} onDismiss={dismiss} /></></ToastContext.Provider>
}
