import { GetAccount } from "./accountApi";

export interface AccountExpenseSummary extends GetAccount {
  income: string;
  expense: string;
  incomeCount: string;
  expenseCount: string;
}
