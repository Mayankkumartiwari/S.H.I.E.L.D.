export default function PageHeader({ eyebrow, title, description, action }) {
  return <div className="content-header"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1 className="page-title">{title}</h1>{description && <p>{description}</p>}</div>{action}</div>
}
