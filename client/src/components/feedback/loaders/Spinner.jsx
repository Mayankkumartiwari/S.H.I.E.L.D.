export default function Spinner({ size = 'sm', label = 'Loading' }) {
  return <span className={`spinner spinner-${size}`} role="status" aria-label={label} />
}
