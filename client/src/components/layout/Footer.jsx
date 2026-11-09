import BrandLogo from "../common/BrandLogo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <BrandLogo showTagline />{" "}
        <span>© 2026 S.H.I.E.L.D. · Built for better campus communities.</span>
      </div>
    </footer>
  );
}
