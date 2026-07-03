"use client";

import React, { useState } from "react";
import { X, Plus, AlertCircle } from "lucide-react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: {
    description: string;
    value: number;
    category: string;
    type: "income" | "expense";
    date: string;
  }) => void;
}

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction }: AddTransactionModalProps) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("ALIMENTAÇÃO");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`; // formatted as yyyy-mm-dd for input type=date
  });
  
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!description.trim()) {
      setError("Por favor, preencha a descrição.");
      return;
    }

    const numValue = parseFloat(value.replace(",", "."));
    if (isNaN(numValue) || numValue <= 0) {
      setError("Por favor, preencha um valor válido maior que zero.");
      return;
    }

    // Format date from yyyy-mm-dd to dd/mm/yyyy
    const dateParts = date.split("-");
    const formattedDate = dateParts.length === 3 
      ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
      : new Date().toLocaleDateString("pt-BR");

    onAddTransaction({
      description,
      value: numValue,
      type,
      category,
      date: formattedDate
    });

    // Reset fields and close
    setDescription("");
    setValue("");
    setType("expense");
    setCategory(type === "income" ? "SALÁRIO" : "ALIMENTAÇÃO");
    onClose();
  };

  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    if (newType === "income") {
      setCategory("SALÁRIO");
    } else {
      setCategory("ALIMENTAÇÃO");
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
            onClick={onClose} 
            className="btn btn-link text-secondary p-1 border-0 d-flex align-items-center justify-content-center"
            style={{ borderRadius: "50%", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-3 d-flex align-items-center gap-2" style={{ backgroundColor: "rgba(255, 94, 98, 0.1)", border: "1px solid rgba(255, 94, 98, 0.2)", color: "var(--luminous-pink)", fontSize: "0.85rem" }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Type Selector (Receita / Despesa) */}
          <div className="d-flex p-1 bg-dark rounded-3 mb-2" style={{ border: "1px solid var(--border-glass)" }}>
            <button
              type="button"
              onClick={() => handleTypeChange("expense")}
              className={`btn w-50 py-2 border-0 fw-semibold text-sm ${type === "expense" ? "glass-btn-outline-active bg-glow-pink" : "text-secondary"}`}
              style={{ fontSize: "0.85rem", transition: "all 0.2s ease" }}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("income")}
              className={`btn w-50 py-2 border-0 fw-semibold text-sm ${type === "income" ? "glass-btn-outline-active bg-glow-blue" : "text-secondary"}`}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Value */}
          <div className="d-flex flex-column gap-1.5">
            <label className="text-secondary fw-semibold" style={{ fontSize: "0.8rem" }}>Valor (R$)</label>
            <input 
              type="text" 
              className="glass-input w-100" 
              placeholder="0,00"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="d-flex flex-column gap-1.5">
            <label className="text-secondary fw-semibold" style={{ fontSize: "0.8rem" }}>Categoria</label>
            <select 
              className="glass-input w-100"
              style={{ appearance: "none", cursor: "pointer" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {type === "expense" ? (
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className={`btn glass-btn-blue w-100 mt-3 d-flex align-items-center justify-content-center gap-2`}
            style={{ 
              background: type === "expense" 
                ? "linear-gradient(135deg, var(--luminous-pink), #ff8e91)" 
                : "linear-gradient(135deg, var(--luminous-blue), var(--luminous-cyan))",
              boxShadow: type === "expense" 
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
