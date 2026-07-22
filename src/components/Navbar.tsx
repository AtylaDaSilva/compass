import { Bell, Settings, CreditCard} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="glass-panel py-3 px-4 d-flex align-items-center justify-content-between position-sticky top-0 w-100" style={{ zIndex: 1010, height: "70px" }}>
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-glow-blue rounded-3 p-1.5 d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
            <CreditCard size={18} className="text-white" />
          </div>
          <span className="fs-5 fw-bold text-white tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
            Carbon<span className="text-luminous-blue">Finance</span>
          </span>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Notifications Icon */}
        <button className="btn btn-link text-secondary p-2 position-relative d-flex align-items-center justify-content-center" style={{ borderRadius: "50%" }}>
          <Bell size={20} className="text-secondary" />
          <span 
            className="position-absolute top-1 right-1 translate-middle p-1 bg-glow-pink border border-light rounded-circle"
            style={{ width: "8px", height: "8px", transform: "translate(4px, -4px)" }}
          ></span>
        </button>

        {/* Settings Icon */}
        <button className="btn btn-link text-secondary p-2 d-flex align-items-center justify-content-center" style={{ borderRadius: "50%" }}>
          <Settings size={20} className="text-secondary" />
        </button>

        {/* User Profile Avatar */}
        <div className="d-flex align-items-center gap-2 ms-2">
          <div className="position-relative" style={{ width: "36px", height: "36px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Avatar do Usuário" 
              className="rounded-circle border border-secondary"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <span 
              className="position-absolute bottom-0 right-0 bg-success rounded-circle border border-dark"
              style={{ width: "10px", height: "10px", right: "0px", bottom: "0px", position: "absolute" }}
            ></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
