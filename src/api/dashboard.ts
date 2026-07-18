import dbMock from "@/data/mock/db.json";

const BALANCE_KEY = "compass_base_balance";
const JUNE_EXPENSE_KEY = "compass_june_base_expense";

function getBaseBalance(): number {
  if (typeof window === "undefined") return dbMock.baseBalance;
  const stored = localStorage.getItem(BALANCE_KEY);
  if (!stored) {
    localStorage.setItem(BALANCE_KEY, String(dbMock.baseBalance));
    return dbMock.baseBalance;
  }
  return Number(stored);
}

function getJuneBaseExpense(): number {
  if (typeof window === "undefined") return dbMock.juneBaseExpense;
  const stored = localStorage.getItem(JUNE_EXPENSE_KEY);
  if (!stored) {
    localStorage.setItem(JUNE_EXPENSE_KEY, String(dbMock.juneBaseExpense));
    return dbMock.juneBaseExpense;
  }
  return Number(stored);
}

export async function getDashboardConfig() {
  // Simulate API network latency
  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    baseBalance: getBaseBalance(),
    chartData: dbMock.chartData,
    juneBaseExpense: getJuneBaseExpense(),
  };
}
