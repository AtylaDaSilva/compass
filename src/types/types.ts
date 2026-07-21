export type TTransactionType = "income" | "expense"

export interface ITransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: TTransactionType;
  value: number;
}

export type TNewTransaction = Omit<ITransaction, "id">