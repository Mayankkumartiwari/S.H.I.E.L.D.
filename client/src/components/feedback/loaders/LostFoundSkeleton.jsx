import CardSkeleton from './CardSkeleton'
export default function LostFoundSkeleton() { return <div className="content skeleton-page" aria-busy="true"><CardSkeleton lines={2} /><div className="grid-3"><CardSkeleton lines={4} /><CardSkeleton lines={4} /><CardSkeleton lines={4} /></div></div> }
