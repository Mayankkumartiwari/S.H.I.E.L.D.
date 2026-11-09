import { ShieldCheck } from "lucide-react";

export default function BrandLogo({
  compact = false,
  showTagline = false,
  showFullForm = false,
}) {
  return (
    <span className={`brand-lockup ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark">
        <ShieldCheck size={18} />
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>S.H.I.E.L.D.</strong>
          {showFullForm && (
            <small>
              Smart Hub for Interaction, Engagement, Learning &amp; Discovery
            </small>
          )}
          {showTagline && (
            <small>One Campus. One Network. Infinite Connections.</small>
          )}
        </span>
      )}
    </span>
  );
}
