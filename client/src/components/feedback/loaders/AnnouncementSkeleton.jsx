import CardSkeleton from './CardSkeleton'
export default function AnnouncementSkeleton() { return <div className="content skeleton-page" aria-busy="true"><CardSkeleton lines={2} /><CardSkeleton lines={4} /><CardSkeleton lines={4} /></div> }
