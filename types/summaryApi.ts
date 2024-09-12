import { GetAccount } from "./accountApi";
import { GetCategory } from "./categoriesApi";

export interface AccountExpenseSummary extends GetAccount {
  income: Number;
  expense: Number;
  incomeCount: Number;
  expenseCount: Number;
}

export interface CategorySummary extends Partial<GetCategory> {
  count: Number;
  income: Number;
  expense: Number;
  fill: string;
}

export interface TrxSummary {
  date: Date;
  income: Number;
  expense: Number;
  count: Number;
}
