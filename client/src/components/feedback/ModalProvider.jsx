import { useCallback, useEffect, useRef, useState } from 'react'
import ModalContext from '../../context/ModalContext'
import ConfirmModal from './ConfirmModal'

export default function ModalProvider({ children }) {
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(false)
  const resolver = useRef(null)

  const settle = useCallback((result) => {
    resolver.current?.(result)
    resolver.current = null
    setRequest(null)
    setLoading(false)
  }, [])
  const confirm = useCallback((options) => new Promise((resolve) => {
    if (resolver.current) { resolve(false); return }
    resolver.current = resolve
    setRequest(options)
  }), [])
  const cancel = useCallback(() => settle(false), [settle])
  const approve = useCallback(async () => {
    if (!request || loading) return
    if (!request.onConfirm) { settle(true); return }
    setLoading(true)
    try { await request.onConfirm(); settle(true) } catch { setLoading(false) }
  }, [loading, request, settle])

  useEffect(() => {
    if (!request) return undefined
    const handleKeyDown = (event) => { if (event.key === 'Escape' && !loading) cancel() }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [cancel, loading, request])

  return <ModalContext.Provider value={{ confirm }}><>{children}<ConfirmModal request={request} loading={loading} onConfirm={approve} onCancel={cancel} /></></ModalContext.Provider>
}
