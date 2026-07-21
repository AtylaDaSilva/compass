"use client";

import React, { useState } from "react";
import { X, Plus, AlertCircle } from "lucide-react";
import { ReactState } from "@/state";

import { createTransaction } from "@/api/transactions";

import { ITransaction, TTransactionType, TNewTransaction } from "@/types";

interface IAddTransactionModalProps {
  isAddModalOpen: ReactState<boolean>;
  transactions: ReactState<ITransaction[]>
}

export default function AddTransactionModal({ isAddModalOpen, transactions }: IAddTransactionModalProps) {
  if (!isAddModalOpen.state) return <></>;

  const description = new ReactState(useState<string>(""));
  const value = new ReactState(useState<string>(""));
  const type = new ReactState(useState<TTransactionType>("expense"));
  const category = new ReactState(useState<string>("ALIMENTAÇÃO"));
  const date = new ReactState(
    useState<string>(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`; // formatted as yyyy-mm-dd for input type=date
  }));
  
  const error = new ReactState(useState<string>(""));

  // Handle adding a new transaction via REST API module
    const handleAddTransaction = (newTx: TNewTransaction) => {
      createTransaction(newTx)
        .then(tx => {
          // Prepend to transaction list
          transactions.setState(prev => [tx, ...prev]);
        })
        .catch(err => console.error("Error adding transaction:", err));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    error.setState("");

    if (!description.state.trim()) {
      error.setState("Por favor, preencha a descrição.");
      return;
    }

    const numValue = parseFloat(value.state.replace(",", "."));
    if (isNaN(numValue) || numValue <= 0) {
      error.setState("Por favor, preencha um valor válido maior que zero.");
      return;
    }

    // Format date from yyyy-mm-dd to dd/mm/yyyy
    const dateParts = date.state.split("-");
    const formattedDate = dateParts.length === 3 
      ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
      : new Date().toLocaleDateString("pt-BR");

    handleAddTransaction({
      description: description.state,
      value: numValue,
      type: type.state,
      category: category.state,
      date: formattedDate
    });

    // Reset fields and close
    description.setState("");
    value.setState("");
    type.setState("expense");
    category.setState(type.state === "income" ? "SALÁRIO" : "ALIMENTAÇÃO");
    isAddModalOpen.setState(false)
  };

  const handleTypeChange = (newType: "income" | "expense") => {
    type.setState(newType);
    if (newType === "income") {
      category.setState("SALÁRIO");
    } else {
      category.setState("ALIMENTAÇÃO");
    }
  };

  return (
    <div className="glass-modal-overlay">
      <div className="glass-modal p-4 position-relative">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="text-white fw-bold m-0 fs-5 d-flex align-items-center gap-2">
            <Plus size={20} className="text-luminous-blue" />
            Nova Transação
          </h5>
          <button 
            onClick={() => isAddModalOpen.setState(false)}
            className="btn btn-link text-secondary p-1 border-0 d-flex align-items-center justify-content-center"
            style={{ borderRadius: "50%", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {/* //*  Error Message */}
          {error.state && (
            <div className="p-3 rounded-3 d-flex align-items-center gap-2" style={{ backgroundColor: "rgba(255, 94, 98, 0.1)", border: "1px solid rgba(255, 94, 98, 0.2)", color: "var(--luminous-pink)", fontSize: "0.85rem" }}>
              <AlertCircle size={16} />
              <span>{error.state}</span>
            </div>
          )}

          {/* Type Selector (Receita / Despesa) */}
          <div className="d-flex p-1 bg-dark rounded-3 mb-2" style={{ border: "1px solid var(--border-glass)" }}>
            <button
              type="button"
              onClick={() => handleTypeChange("expense")}
              className={`btn w-50 py-2 border-0 fw-semibold text-sm ${type.state === "expense" ? "glass-btn-outline-active bg-glow-pink" : "text-secondary"}`}
              style={{ fontSize: "0.85rem", transition: "all 0.2s ease" }}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("income")}
              className={`btn w-50 py-2 border-0 fw-semibold text-sm ${type.state === "income" ? "glass-btn-outline-active bg-glow-blue" : "text-secondary"}`}
              style={{ fontSize: "0.85rem", transition: "all 0.2s ease" }}
            >
              Receita
            </button>
          </div>

          {/* Description */}
          <div className="d-flex flex-column gap-1.5">
            <label className="text-secondary fw-semibold" style={{ fontSize: "0.8rem" }}>Descrição</label>
            <input 
              type="text" 
              className="glass-input w-100" 
              placeholder="Ex: Supermercado, Salário PJ, etc."
              value={description.state}
              onChange={(e) => description.setState(e.target.value)}
            />
          </div>

          {/* Value */}
          <div className="d-flex flex-column gap-1.5">
            <label className="text-secondary fw-semibold" style={{ fontSize: "0.8rem" }}>Valor (R$)</label>
            <input 
              type="text" 
              className="glass-input w-100" 
              placeholder="0,00"
              value={value.state}
              onChange={(e) => value.setState(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="d-flex flex-column gap-1.5">
            <label className="text-secondary fw-semibold" style={{ fontSize: "0.8rem" }}>Categoria</label>
            <select 
              className="glass-input w-100"
              style={{ appearance: "none", cursor: "pointer" }}
              value={category.state}
              onChange={(e) => category.setState(e.target.value)}
            >
              {type.state === "expense" ? (
                <>
                  <option value="ALIMENTAÇÃO" style={{ backgroundColor: "#0e0e12", color: "#fff" }}>Alimentação</option>
                  <option value="MORADIA" style={{ backgroundColor: "#0e0e12", color: "#fff" }}>Moradia</option>
                  <option value="TRANSPORTE" style={{ backgroundColor: "#0e0e12", color: "#fff" }}>Transporte</option>
                  <option value="LAZER" style={{ backgroundColor: "#0e0e12", color: "#fff" }}>Lazer</option>
                </>
              ) : (
                <>
                  <option value="SALÁRIO" style={{ backgroundColor: "#0e0e12", color: "#fff" }}>Salário / PJ</option>
                  <option value="RENDIMENTOS" style={{ backgroundColor: "#0e0e12", color: "#fff" }}>Rendimentos</option>
                  <option value="OUTROS" style={{ backgroundColor: "#0e0e12", color: "#fff" }}>Outros</option>
                </>
              )}
            </select>
          </div>

          {/* Date */}
          <div className="d-flex flex-column gap-1.5 mb-2">
            <label className="text-secondary fw-semibold" style={{ fontSize: "0.8rem" }}>Data</label>
            <input 
              type="date" 
              className="glass-input w-100" 
              value={date.state}
              onChange={(e) => date.setState(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className={`btn glass-btn-blue w-100 mt-3 d-flex align-items-center justify-content-center gap-2`}
            style={{ 
              background: type.state === "expense" 
                ? "linear-gradient(135deg, var(--luminous-pink), #ff8e91)" 
                : "linear-gradient(135deg, var(--luminous-blue), var(--luminous-cyan))",
              boxShadow: type.state === "expense" 
                ? "0 4px 15px rgba(255, 94, 98, 0.3)" 
                : "0 4px 15px rgba(0, 114, 255, 0.3)"
            }}
          >
            Adicionar Transação
          </button>
        </form>
      </div>
    </div>
  );
}
