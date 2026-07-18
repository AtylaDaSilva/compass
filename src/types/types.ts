export interface ITransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  value: number;
}

export interface IAddTransactionModalProps {
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