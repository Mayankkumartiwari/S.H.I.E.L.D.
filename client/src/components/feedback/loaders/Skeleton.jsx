export default function Skeleton({ shape = 'text', width = '100%', height, radius, className = '' }) {
  const styles = { width, ...(height ? { height } : {}), ...(radius ? { borderRadius: radius } : {}) }
  return <span className={`skeleton skeleton-${shape} ${className}`} style={styles} aria-hidden="true" />
}
