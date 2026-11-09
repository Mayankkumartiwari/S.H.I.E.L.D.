import CardSkeleton from './CardSkeleton'
export default function CommunitySkeleton() { return <div className="content skeleton-page" aria-busy="true"><CardSkeleton lines={2} /><CardSkeleton avatar lines={4} /><CardSkeleton avatar lines={4} /></div> }
