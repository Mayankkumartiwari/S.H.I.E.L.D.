import Toast from "./Toast";
export default function ToastContainer({ items, onDismiss }) {
  return (
    <div className="toast-container" aria-label="Notifications">
      {items.map((item) => (
        <Toast key={item.id} item={item} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
