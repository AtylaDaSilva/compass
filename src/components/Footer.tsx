export function Footer() {
    return (
        <footer className="pt-4 border-top border-dark d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-muted" style={{ fontSize: "0.8rem", borderColor: "var(--border-glass) !important" }}>
            <div className="d-flex align-items-center gap-1">
              <span className="fw-semibold text-secondary">Carbon Finance</span>{/*//! HARDCODED DATA */}
              <span>© 2026 Carbon Finance Enterprise</span> {/*//! HARDCODED DATA */}
            </div>
            <div className="d-flex gap-3">
              <a href="#" className="hover-link text-decoration-none text-muted">Privacy Policy</a>
              <a href="#" className="hover-link text-decoration-none text-muted">Terms of Service</a>
              <a href="#" className="hover-link text-decoration-none text-muted">Help Center</a>
              <a href="#" className="hover-link text-decoration-none text-muted">API Documentation</a>
            </div>
          </footer>
    )
}