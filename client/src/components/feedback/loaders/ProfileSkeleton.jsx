import CardSkeleton from './CardSkeleton'
export default function ProfileSkeleton() { return <div className="content skeleton-page" aria-busy="true"><div className="grid-2"><CardSkeleton avatar lines={3} /><CardSkeleton lines={3} /></div></div> }
