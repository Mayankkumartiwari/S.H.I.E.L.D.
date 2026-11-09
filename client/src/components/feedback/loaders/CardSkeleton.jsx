import Skeleton from './Skeleton'

export default function CardSkeleton({ lines = 3, avatar = false }) {
  return <div className="card skeleton-card" aria-hidden="true">{avatar && <Skeleton shape="circle" width={34} height={34} />}<Skeleton width="48%" height={16} />{Array.from({ length: lines }, (_, index) => <Skeleton key={index} width={index === lines - 1 ? '72%' : '100%'} height={12} />)}</div>
}
