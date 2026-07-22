"use client";

import { useState, useEffect } from "react";
import { Sidebar, Dashboard, Footer } from "@/components";
import { AddTransactionModal } from "@/components/modals";
import { ArrowLeftRight } from "lucide-react";
import { ReactState } from "@/state";

// * Types/Interfaces
import { ITransaction } from "@/types";

import { getTransactions } from "@/api/transactions";
import { getDashboardConfig } from "@/api/dashboard";

export default function Home() {
  const sidebarOpen = new ReactState(useState<boolean>(true));
  const activeTab = new ReactState(useState<string>("overview"));
  const isAddModalOpen = new ReactState(useState<boolean>(false));

  const transactions = new ReactState(useState<ITransaction[]>([]));
  const [dashboardConfig, setDashboardConfig] = useState<{
    baseBalance: number;
    chartData: { name: string; value: number; active: boolean }[];
    juneBaseExpense: number;
  } | null>(null);

  useEffect(() => {
    // Fetch transactions from REST API module
    getTransactions()
      .then(data => transactions.setState(data))
      .catch(err => console.error("Error fetching transactions:", err));

    // Fetch dashboard config from REST API module
    getDashboardConfig()
      .then(data => setDashboardConfig(data))
      .catch(err => console.error("Error fetching dashboard config:", err));
  }, []);

  const toggleSidebar = () => {
    sidebarOpen.setState(!sidebarOpen.state);
  };

  // Render content based on active menu tab
  const renderContent = () => {
    switch (activeTab.state) {
      case "overview":
        return (
          <Dashboard
            transactions={transactions.state}
            baseBalance={dashboardConfig?.baseBalance ?? 14250.00}
            historicalChartData={dashboardConfig?.chartData ?? []}
            juneBaseExpense={dashboardConfig?.juneBaseExpense ?? 934.30}
            onOpenAddModal={() => isAddModalOpen.setState(true)}
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
                onClick={() => isAddModalOpen.setState(true)}
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
                  {transactions.state.map((t) => {
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
      default:
        return null;  // TODO: Create 404 Page
    }
  };

  return (
    <div className="app-container">      
      {/* Main Layout Area */}
      <div className="main-layout">
        {/* Collapsible Left Sidebar */}
        <Sidebar
          isOpen={sidebarOpen.state}
          activeTab={activeTab}
          onAddTransactionClick={() => isAddModalOpen.setState(true)}
        />

        {/* Content View Area */}
        <main className="content-container">
          {renderContent()}

          {/* Footer inside content area */}
          <Footer />
        </main>
      </div>

      {/* Modals/Dialogs */}
      <AddTransactionModal
        isAddModalOpen={isAddModalOpen}
        transactions={transactions}
      />
    </div>
  );
}
