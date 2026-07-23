"use client";

import { useState, useEffect } from "react";
import { Sidebar, Dashboard, MainContent } from "@/components";
import { AddTransactionModal } from "@/components/modals";
import { ReactState } from "@/state";

// * Types/Interfaces
import { ITransaction } from "@/types";

import { getTransactions } from "@/api/transactions";

export default function Home() {
  
  const activeTab = new ReactState(useState<string>("overview"));
  const isAddModalOpen = new ReactState(useState<boolean>(false));
  const transactions = new ReactState(useState<ITransaction[]>([]));

  useEffect(() => {
    // Fetch transactions from REST API module
    getTransactions()
      .then(data => transactions.setState(data))
      .catch(err => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="main-layout">
      <main className="content-container">
        <Sidebar
          activeTab={activeTab}
          onAddTransactionClick={() => isAddModalOpen.setState(true)}
          />
        <MainContent
          activeTab={activeTab}
          transactions={transactions}
          isAddModalOpen={isAddModalOpen}
        />
      </main>

      {/* Modals/Dialogs */}
      <AddTransactionModal
        isAddModalOpen={isAddModalOpen}
        transactions={transactions}
      />
    </div>
  );
}
