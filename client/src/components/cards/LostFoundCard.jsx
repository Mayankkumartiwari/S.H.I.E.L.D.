export default function LostFoundCard({ item, onClick }) {
  return (
    <button
      className="card list-row"
      onClick={onClick}
      style={{ textAlign: "left", color: "inherit" }}
    >
      <div>
        <span
          className={`badge ${item.status === "Found" ? "success" : "warning"}`}
        >
          {item.status}
        </span>
        <h3>{item.title}</h3>
        <p>
          {item.category} · {item.location}
        </p>
      </div>
      <span className="muted">{item.date}</span>
    </button>
  );
}
