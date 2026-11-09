export default function StatCard({ label, value, icon: Icon }) {
  return <div className="card stat-card"><div><span className="muted">{label}</span><strong>{value}</strong></div><Icon className="stat-icon" size={22} /></div>
}
