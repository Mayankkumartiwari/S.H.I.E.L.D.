export default function AnnouncementCard({ announcement }) {
  return <article className="card list-row"><div><div className="post-meta"><span className={`badge ${announcement.urgent ? 'danger' : ''}`}>{announcement.urgent ? 'Urgent' : announcement.category}</span>{announcement.pinned && <span className="badge success">Pinned</span>}</div><h3>{announcement.title}</h3><p>{announcement.department} · {announcement.date}</p></div></article>
}
