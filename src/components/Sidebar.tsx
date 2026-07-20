"use client";

import React from "react";
import { ReactState } from "@/state";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Target, 
  TrendingUp, 
  ShieldCheck,
  Plus
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  activeTab: ReactState<string>;
  onAddTransactionClick: () => void;
}

export default function Sidebar({ isOpen, activeTab, onAddTransactionClick }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
    { id: "goals", label: "Goals", icon: Target },
    { id: "investments", label: "Investments", icon: TrendingUp },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  return (
    <aside 
      className={`sidebar-container glass-panel h-100 d-flex flex-column justify-content-between py-4 ${isOpen ? "" : "collapsed"}`}
      style={{ 
        backgroundColor: "rgba(10, 10, 14, 0.8)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid var(--border-glass)",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div>
        {/* Profile Info */}
        <div className={`px-3 mb-4 d-flex align-items-center ${isOpen ? "gap-3" : "justify-content-center"}`} style={{ height: "60px" }}>
          <div 
            className="rounded-3 bg-glow-blue d-flex align-items-center justify-content-center text-white fw-bold fs-5"
            style={{ 
              width: "42px", 
              height: "42px", 
              minWidth: "42px",
              boxShadow: "0 0 12px rgba(0, 114, 255, 0.4)"
            }}
          >
            P
          </div>
          {isOpen && (
            <div className="d-flex flex-column" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <span className="text-white fw-semibold fs-6">Portfolio</span>
              <span className="text-muted" style={{ fontSize: "0.75rem" }}>Standard Account</span>
            </div>
          )}
        </div>

        {/* Menu Navigation */}
        <ul className="nav flex-column gap-2 px-2 mt-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab.state === item.id;
            return (
              <li key={item.id} className="nav-item">
                <button
                  onClick={() => activeTab.setState(item.id)}
                  className={`nav-link w-100 d-flex align-items-center border-0 text-start py-3 px-3 position-relative ${isOpen ? "gap-3 rounded-3" : "justify-content-center rounded-circle"}`}
                  style={{
                    backgroundColor: isActive ? "rgba(0, 114, 255, 0.08)" : "transparent",
                    color: isActive ? "var(--luminous-blue)" : "var(--text-secondary)",
                    transition: "all 0.2s ease",
                    cursor: "pointer"
                  }}
                  title={!isOpen ? item.label : undefined}
                >
                  <IconComponent 
                    size={20} 
                    style={{ 
                      color: isActive ? "var(--luminous-blue)" : "var(--text-secondary)",
                      filter: isActive ? "drop-shadow(0 0 5px rgba(0, 114, 255, 0.5))" : "none" 
                    }} 
                  />
                  {isOpen && <span className="fw-medium">{item.label}</span>}
                  
                  {/* Left border active indicator */}
                  {isActive && (
                    <span 
                      className="position-absolute" 
                      style={{ 
                        left: "0", 
                        top: "20%", 
                        bottom: "20%", 
                        width: "3px", 
                        backgroundColor: "var(--luminous-blue)",
                        borderRadius: "0 4px 4px 0",
                        boxShadow: "0 0 10px var(--luminous-blue)"
                      }}
                    ></span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Action Button at bottom */}
      <div className="px-3">
        <button
          onClick={onAddTransactionClick}
          className={`btn glass-btn-blue w-100 d-flex align-items-center justify-content-center ${isOpen ? "gap-2" : "p-0 rounded-circle"}`}
          style={{ 
            height: isOpen ? "48px" : "48px",
            width: isOpen ? "100%" : "48px",
            margin: isOpen ? "0" : "0 auto"
          }}
          title="Nova Transação"
        >
          <Plus size={20} className="text-white" />
          {isOpen && <span>Add Transaction</span>}
        </button>
      </div>
    </aside>
  );
}
