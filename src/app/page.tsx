"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import AddTransactionModal from "@/components/AddTransactionModal";
import { FolderHeart, Sparkles, ShieldCheck, Target, ArrowLeftRight } from "lucide-react";

// * Types/Interfaces
import { ITransaction } from "@/types";

import { getTransactions, createTransaction } from "@/api/transactions";
import { getDashboardConfig } from "@/api/dashboard";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [dashboardConfig, setDashboardConfig] = useState<{
    baseBalance: number;
    chartData: { name: string; value: number; active: boolean }[];
    juneBaseExpense: number;
  } | null>(null);

  useEffect(() => {
    // Fetch transactions from REST API module
    getTransactions()
      .then(data => setTransactions(data))
      .catch(err => console.error("Error fetching transactions:", err));

    // Fetch dashboard config from REST API module
    getDashboardConfig()
      .then(data => setDashboardConfig(data))
      .catch(err => console.error("Error fetching dashboard config:", err));
  }, []);

  // Handle adding a new transaction via REST API module
  const handleAddTransaction = (newTx: {
    description: string;
    value: number;
    category: string;
    type: "income" | "expense";
    date: string;
  }) => {
    createTransaction(newTx)
      .then(tx => {
        // Prepend to transaction list
        setTransactions(prev => [tx, ...prev]);
      })
      .catch(err => console.error("Error adding transaction:", err));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Render content based on active menu tab
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <Dashboard
            transactions={transactions}
            baseBalance={dashboardConfig?.baseBalance ?? 14250.00}
            historicalChartData={dashboardConfig?.chartData ?? []}
            juneBaseExpense={dashboardConfig?.juneBaseExpense ?? 934.30}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        );
      case "transactions":
        return (
          <div className="glass-card w-100">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="text-white fw-bold m-0 d-flex align-items-center gap-2">
                <ArrowLeftRight size={22} className="text-luminous-blue" />
                Histórico Completo de Transações
              </h4>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn glass-btn-blue btn-sm"
              >
                Nova Transação
              </button>
            </div>

            <div className="table-responsive">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th className="text-end">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => {
                    const isIncome = t.type === "income";
                    const badgeClass = `badge-category badge-${t.category.toLowerCase().replace(/á/g, 'a').replace(/ã/g, 'a')}`;
                    return (
                      <tr key={t.id} className="table-row">
                        <td>{t.date}</td>
                        <td className="fw-semibold text-white">{t.description}</td>
                        <td>
                          <span className={badgeClass}>
                            {t.category}
                          </span>
                        </td>
                        <td className={`text-end fw-bold ${isIncome ? "text-luminous-green" : "text-luminous-pink"}`}>
                          {isIncome ? "+" : "-"} R$ {t.value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "goals":
        return (
          <div className="glass-card text-center py-5">
            <Target size={48} className="text-luminous-orange mb-3" />
            <h4 className="text-white fw-bold">Metas Financeiras</h4>
            <p className="text-secondary mx-auto" style={{ maxWidth: "450px" }}>
              Planeje seus sonhos e acompanhe seu progresso de poupança com metas financeiras interativas. Esta seção está sendo preparada para o seu perfil.
            </p>
            <div className="mt-4">
              <span className="badge bg-dark border border-secondary text-secondary p-2">Em Desenvolvimento</span>
            </div>
          </div>
        );
      case "investments":
        return (
          <div className="glass-card text-center py-5">
            <Sparkles size={48} className="text-luminous-cyan mb-3" />
            <h4 className="text-white fw-bold">Investimentos</h4>
            <p className="text-secondary mx-auto" style={{ maxWidth: "450px" }}>
              Monitore sua carteira de investimentos e analise rendimentos históricos integrados ao seu saldo total de forma automatizada.
            </p>
            <div className="mt-4">
              <span className="badge bg-dark border border-secondary text-secondary p-2">Em Desenvolvimento</span>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="glass-card text-center py-5">
            <ShieldCheck size={48} className="text-luminous-blue mb-3" />
            <h4 className="text-white fw-bold">Segurança e Logs</h4>
            <p className="text-secondary mx-auto" style={{ maxWidth: "450px" }}>
              Suas credenciais e dados financeiros contam com criptografia ponta a ponta de nível militar. Verifique aqui sessões ativas e histórico de segurança.
            </p>
            <div className="mt-4">
              <span className="badge bg-dark border border-secondary text-secondary p-2">Em Desenvolvimento</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Layout Area */}
      <div className="main-layout">
        {/* Collapsible Left Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onAddTransactionClick={() => setIsAddModalOpen(true)}
        />

        {/* Content View Area */}
        <main className="content-container">
          {renderContent()}

          {/* Footer inside content area */}
          <footer className="mt-5 pt-4 border-top border-dark d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-muted" style={{ fontSize: "0.8rem", borderColor: "var(--border-glass) !important" }}>
            <div className="d-flex align-items-center gap-1">
              <span className="fw-semibold text-secondary">Carbon Finance</span>
              <span>© 2026 Carbon Finance Enterprise</span>
            </div>
            <div className="d-flex gap-3">
              <a href="#" className="hover-link text-decoration-none text-muted">Privacy Policy</a>
              <a href="#" className="hover-link text-decoration-none text-muted">Terms of Service</a>
              <a href="#" className="hover-link text-decoration-none text-muted">Help Center</a>
              <a href="#" className="hover-link text-decoration-none text-muted">API Documentation</a>
            </div>
          </footer>
        </main>
      </div>

      {/* Add Transaction Dialog */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
