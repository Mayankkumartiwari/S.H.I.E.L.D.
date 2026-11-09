import { AlertTriangle, CheckCircle2, Info, LoaderCircle, X, XCircle } from 'lucide-react'

const icons = { success: CheckCircle2, error: XCircle, warning: AlertTriangle, info: Info, loading: LoaderCircle }
export default function Toast({ item, onDismiss }) {
  const Icon = icons[item.type] || Info
  return <div className={`toast toast-${item.type}`} role={item.type === 'error' ? 'alert' : 'status'} aria-live={item.type === 'error' ? 'assertive' : 'polite'}>
    <Icon className={item.type === 'loading' ? 'spin' : ''} size={19} /><div className="toast-body"><strong>{item.title}</strong>{item.description && <span>{item.description}</span>}{item.action && <button className="toast-action" onClick={item.action.onClick}>{item.action.label}</button>}</div><button className="toast-dismiss" onClick={() => onDismiss(item.id)} aria-label="Dismiss notification"><X size={16} /></button>
  </div>
}
