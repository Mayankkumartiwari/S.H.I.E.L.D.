import { useEffect, useRef } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  X,
} from "lucide-react";
import Button from "../common/Button";

const variants = {
  default: { icon: Info, button: "primary" },
  danger: { icon: ShieldAlert, button: "danger" },
  warning: { icon: AlertTriangle, button: "primary" },
  success: { icon: CheckCircle2, button: "primary" },
};

export default function ConfirmModal({
  request,
  loading,
  onConfirm,
  onCancel,
}) {
  const confirmButton = useRef(null);
  const previousFocus = useRef(null);
  useEffect(() => {
    if (!request) return undefined;
    previousFocus.current = document.activeElement;
    confirmButton.current?.focus();
    return () => previousFocus.current?.focus?.();
  }, [request]);
  if (!request) return null;
  const config = variants[request.variant] || variants.default;
  const Icon = config.icon;
  return (
    <div
      className="modal-backdrop feedback-backdrop"
      role="presentation"
      onMouseDown={(event) =>
        event.target === event.currentTarget && !loading && onCancel()
      }
    >
      <section
        className="card modal confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-description"
      >
        <button
          className="icon-button modal-close"
          onClick={onCancel}
          disabled={loading}
          aria-label="Close confirmation"
        >
          <X size={18} />
        </button>
        <div className={`confirm-icon ${request.variant || "default"}`}>
          <Icon size={22} />
        </div>
        <h2 id="confirm-title">{request.title}</h2>
        <p id="confirm-description" className="muted">
          {request.description}
        </p>
        <div className="confirm-actions">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {request.cancelText || "Cancel"}
          </Button>
          <Button
            ref={confirmButton}
            variant={config.button}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Working..." : request.confirmText || "Confirm"}
          </Button>
        </div>
      </section>
    </div>
  );
}
