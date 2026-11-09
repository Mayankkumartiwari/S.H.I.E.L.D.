import Skeleton from './Skeleton'
export default function MapSkeleton() { return <div className="content skeleton-page" aria-busy="true"><Skeleton width="48%" height={32} /><div className="grid-2"><Skeleton shape="rectangular" height={420} /><Skeleton shape="rectangular" height={420} /></div></div> }
