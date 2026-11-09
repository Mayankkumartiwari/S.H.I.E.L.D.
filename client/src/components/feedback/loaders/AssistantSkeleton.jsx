import CardSkeleton from './CardSkeleton'
export default function AssistantSkeleton() { return <div className="content skeleton-page" aria-busy="true"><CardSkeleton lines={2} /><CardSkeleton lines={5} /></div> }
