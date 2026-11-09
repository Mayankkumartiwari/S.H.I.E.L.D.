import CardSkeleton from './CardSkeleton'
import Skeleton from './Skeleton'

export default function DashboardSkeleton() {
  return <div className="content skeleton-page" aria-busy="true"><Skeleton width="42%" height={32} /><div className="grid-4">{Array.from({ length: 4 }, (_, index) => <CardSkeleton key={index} lines={1} />)}</div><div className="grid-2"><CardSkeleton lines={5} /><CardSkeleton lines={5} /></div></div>
}
