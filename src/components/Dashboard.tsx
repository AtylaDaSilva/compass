"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from "recharts";

// * Types/Interfaces
import { ITransaction } from "@/types";

interface DashboardProps {
  transactions: ITransaction[];
  onOpenAddModal: () => void;
}

export default function Dashboard({ transactions, onOpenAddModal }: DashboardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<"6m" | "1y">("6m");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compute stats based on transactions
  // Initial starting values matching the image
  const baseBalance = 14250.00;
  
  // Calculate dynamically
  const totalRevenue = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.value, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.value, 0);

  const balance = baseBalance + totalRevenue - totalExpense;

  // Chart data for "Evolução de Gastos" (JAN - JUN)
  // We'll map the current transactions into the JUN month data, 
  // and keep historical data static to match the dashboard design.
  const chartData = [
    { name: "JAN", value: 2400, active: false },
    { name: "FEV", value: 1400, active: false },
    { name: "MAR", value: 3800, active: false },
    { name: "ABR", value: 2900, active: false },
    { name: "MAI", value: 4100, active: false },
    { name: "JUN", value: 5120.40 + (transactions.filter(t => t.type === "expense" && t.date.includes("/06/")).reduce((sum, t) => sum + t.value, 0) - 4186.10), active: true },
  ];

  // If we selected 1 year, we show a wider range
  const chartDataYear = [
    ...chartData,
    { name: "JUL", value: 0, active: false },
    { name: "AGO", value: 0, active: false },
    { name: "SET", value: 0, active: false },
    { name: "OUT", value: 0, active: false },
    { name: "NOV", value: 0, active: false },
    { name: "DEZ", value: 0, active: false },
  ];

  const currentChartData = timeRange === "6m" ? chartData : chartDataYear;

  // Compute Categoria breakdown
  const categoryExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc: { [key: string]: number }, curr) => {
      const cat = curr.category.toUpperCase();
      acc[cat] = (acc[cat] || 0) + curr.value;
      return acc;
    }, {});

  const totalCategoryExpense = Object.values(categoryExpenses).reduce((sum, val) => sum + val, 0);

  const pieData = [
    { name: "Moradia", value: categoryExpenses["MORADIA"] || 0, color: "#0072ff" },
    { name: "Alimentação", value: categoryExpenses["ALIMENTAÇÃO"] || 0, color: "#ff7f50" },
    { name: "Transporte", value: categoryExpenses["TRANSPORTE"] || 0, color: "#ff5e62" },
    { name: "Lazer", value: categoryExpenses["LAZER"] || 0, color: "#9d4edd" },
  ].filter(item => item.value > 0);

  // If no category expenses, add a default slice
  if (pieData.length === 0) {
    pieData.push({ name: "Sem despesas", value: 1, color: "#5f6368" });
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Custom tooltips for Recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-2 rounded border border-light" style={{ fontSize: "0.85rem", backgroundColor: "rgba(10, 10, 15, 0.9)" }}>
          <p className="m-0 fw-semibold text-white">{payload[0].name}</p>
          <p className="m-0 text-luminous-blue fw-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Metrics Cards */}
      <div className="row g-4 mb-4">
        {/* Card 1: Saldo Total */}
        <div className="col-12 col-md-4">
          <div className="glass-card h-100 glass-card-glow-blue d-flex flex-column justify-content-between">
            <div>
              <span className="text-secondary fw-semibold text-uppercase tracking-wider" style={{ fontSize: "0.75rem" }}>
                Saldo Total
              </span>
              <h2 className="text-white fw-bold mt-2 mb-3 fs-3" style={{ letterSpacing: "-0.02em" }}>
                {formatCurrency(balance)}
              </h2>
            </div>
            <div className="d-flex align-items-center gap-1.5 text-luminous-blue" style={{ fontSize: "0.85rem" }}>
              <TrendingUp size={16} className="text-luminous-blue" />
              <span className="fw-medium text-luminous-blue">+2.4% este mês</span>
            </div>
          </div>
        </div>

        {/* Card 2: Receitas do Mês */}
        <div className="col-12 col-md-4">
          <div className="glass-card h-100 glass-card-glow-orange d-flex flex-column justify-content-between">
            <div>
              <span className="text-secondary fw-semibold text-uppercase tracking-wider" style={{ fontSize: "0.75rem" }}>
                Receitas do Mês
              </span>
              <h2 className="text-white fw-bold mt-2 mb-3 fs-3" style={{ letterSpacing: "-0.02em" }}>
                {formatCurrency(totalRevenue)}
              </h2>
            </div>
            <div>
              <div className="luminous-progress w-100 mb-1">
                <div 
                  className="luminous-progress-bar bar-orange" 
                  style={{ width: `${Math.min(100, (totalRevenue / 10000) * 100)}%` }}
                ></div>
              </div>
              <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                Meta mensal: R$ 10.000,00
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Despesas do Mês */}
        <div className="col-12 col-md-4">
          <div className="glass-card h-100 glass-card-glow-pink d-flex flex-column justify-content-between">
            <div>
              <span className="text-secondary fw-semibold text-uppercase tracking-wider" style={{ fontSize: "0.75rem" }}>
                Despesas do Mês
              </span>
              <h2 className="text-white fw-bold mt-2 mb-3 fs-3" style={{ letterSpacing: "-0.02em" }}>
                {formatCurrency(totalExpense)}
              </h2>
            </div>
            <div>
              <div className="luminous-progress w-100 mb-1">
                <div 
                  className="luminous-progress-bar bar-pink" 
                  style={{ width: `${Math.min(100, (totalExpense / 8000) * 100)}%` }}
                ></div>
              </div>
              <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                Limite estabelecido: R$ 8.000,00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        {/* Spend Evolution Bar Chart */}
        <div className="col-12 col-lg-8">
          <div className="glass-card h-100 d-flex flex-column justify-content-between" style={{ minHeight: "350px" }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="text-white fw-bold m-0" style={{ fontSize: "1.1rem" }}>
                Evolução de Gastos
              </h5>
              <div className="d-flex gap-1.5 p-1 rounded-3 bg-dark" style={{ border: "1px solid var(--border-glass)", scale: "0.9" }}>
                <button
                  onClick={() => setTimeRange("6m")}
                  className={`btn btn-sm text-xs py-1 px-3 ${timeRange === "6m" ? "glass-btn-outline-active" : "text-secondary"}`}
                  style={{ border: "none", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600" }}
                >
                  6 MESES
                </button>
                <button
                  onClick={() => setTimeRange("1y")}
                  className={`btn btn-sm text-xs py-1 px-3 ${timeRange === "1y" ? "glass-btn-outline-active" : "text-secondary"}`}
                  style={{ border: "none", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600" }}
                >
                  1 ANO
                </button>
              </div>
            </div>

            <div className="flex-grow-1 w-100" style={{ height: "240px" }}>
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: "500" }} 
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.03)" }} />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]} 
                      maxBarSize={40}
                    >
                      {currentChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.active ? "var(--luminous-blue)" : "rgba(255, 255, 255, 0.08)"}
                          style={{
                            filter: entry.active ? "drop-shadow(0 0 10px rgba(0, 114, 255, 0.6))" : "none"
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-100 w-100 d-flex align-items-center justify-content-center text-muted">
                  Carregando gráfico...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expenses by Category Donut Chart */}
        <div className="col-12 col-lg-4">
          <div className="glass-card h-100 d-flex flex-column" style={{ minHeight: "350px" }}>
            <h5 className="text-white fw-bold mb-4" style={{ fontSize: "1.1rem" }}>
              Gastos por Categoria
            </h5>

            <div className="position-relative d-flex justify-content-center align-items-center mb-3" style={{ height: "180px" }}>
              {isMounted ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            style={{
                              filter: `drop-shadow(0 0 6px ${entry.color}80)`
                            }}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="position-absolute d-flex flex-column align-items-center text-center">
                    <span className="text-white fw-bold fs-5 leading-none" style={{ letterSpacing: "-0.02em" }}>
                      R$ {(totalCategoryExpense / 1000).toFixed(1)}k
                    </span>
                    <span className="text-uppercase tracking-wider text-muted mt-1" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
                      Total
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-muted">Carregando dados...</div>
              )}
            </div>

            {/* Custom Legend */}
            <div className="d-flex flex-column gap-2 mt-auto">
              {pieData.map((item, index) => {
                const percent = totalCategoryExpense > 0 ? (item.value / totalCategoryExpense) * 100 : 0;
                return (
                  <div key={index} className="d-flex align-items-center justify-content-between" style={{ fontSize: "0.85rem" }}>
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle" style={{ width: "10px", height: "10px", backgroundColor: item.color, display: "inline-block" }}></span>
                      <span className="text-secondary">{item.name}</span>
                    </div>
                    <span className="text-white fw-semibold">{percent.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="row">
        <div className="col-12">
          <div className="glass-card">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="text-white fw-bold m-0" style={{ fontSize: "1.1rem" }}>
                Transações Recentes
              </h5>
              <button 
                onClick={onOpenAddModal}
                className="btn btn-link text-luminous-blue fw-semibold text-decoration-none p-0 d-flex align-items-center gap-1"
                style={{ fontSize: "0.85rem" }}
              >
                Ver Todas
              </button>
            </div>

            <div className="table-responsive">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>Data</th>
                    <th style={{ width: "45%" }}>Descrição</th>
                    <th style={{ width: "20%" }}>Categoria</th>
                    <th className="text-end" style={{ width: "20%" }}>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((t) => {
                    const isIncome = t.type === "income";
                    const badgeClass = `badge-category badge-${t.category.toLowerCase().replace(/á/g, 'a').replace(/ã/g, 'a')}`;
                    
                    return (
                      <tr key={t.id} className="table-row">
                        <td>{t.date}</td>
                        <td className="fw-semibold text-white">{t.description}</td>
                        <td>
                          <span className={badgeClass}>
                            {t.category.toUpperCase()}
                          </span>
                        </td>
                        <td className={`text-end fw-bold ${isIncome ? "text-luminous-green" : "text-luminous-pink"}`} style={{ fontSize: "0.95rem" }}>
                          {isIncome ? "+" : "-"} {formatCurrency(t.value)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
