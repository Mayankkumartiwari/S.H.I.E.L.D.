import { forwardRef } from "react";
import ButtonLoader from "../feedback/loaders/ButtonLoader";

const Button = forwardRef(function Button(
  { children, variant = "primary", className = "", loading = false, loadingText = "Loading...", disabled = false, ...props },
  ref,
) {
  return (
    <button ref={ref} className={`btn btn-${variant} ${className}`} {...props} disabled={loading || disabled}>
      {loading ? <ButtonLoader>{loadingText}</ButtonLoader> : children}
    </button>
  );
});

export default Button;
