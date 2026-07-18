import { ITransaction } from "@/types";
import dbMock from "@/data/mock/db.json";

const STORAGE_KEY = "compass_transactions";

function getLocalTransactions(): ITransaction[] {
  if (typeof window === "undefined") {
    return dbMock.transactions as ITransaction[];
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dbMock.transactions));
    return dbMock.transactions as ITransaction[];
  }
  return JSON.parse(stored);
}

function saveLocalTransactions(txs: ITransaction[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
  }
}

export async function getTransactions(): Promise<ITransaction[]> {
  // Simulate API network latency
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getLocalTransactions();
}

export async function createTransaction(newTx: Omit<ITransaction, "id">): Promise<ITransaction> {
  // Simulate API network latency
  await new Promise((resolve) => setTimeout(resolve, 300));
  const txs = getLocalTransactions();
  const tx: ITransaction = {
    id: String(Date.now()),
    ...newTx,
  };
  const updated = [tx, ...txs];
  saveLocalTransactions(updated);
  return tx;
}
