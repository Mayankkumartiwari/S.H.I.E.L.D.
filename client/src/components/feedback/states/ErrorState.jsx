import Button from '../../common/Button'

export default function ErrorState({ title = 'Unable to load this page', message = 'Please try again.', onRetry }) {
  return <div className="card error-state"><h2>{title}</h2><p className="muted">{message}</p>{onRetry && <Button variant="outline" onClick={onRetry}>Try again</Button>}</div>
}
