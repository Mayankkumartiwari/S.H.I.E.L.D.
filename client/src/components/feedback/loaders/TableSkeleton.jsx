import Skeleton from './Skeleton'

export default function TableSkeleton({ rows = 5, columns = 4 }) {
  return <div className="card table-wrap skeleton-table" aria-hidden="true">{Array.from({ length: rows }, (_, row) => <div className="skeleton-table-row" key={row}>{Array.from({ length: columns }, (_, column) => <Skeleton key={column} width={column === 0 ? '32%' : '18%'} height={13} />)}</div>)}</div>
}
