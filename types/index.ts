import { JSXElementConstructor, ReactElement } from "react";
import { CategorySummary, TrxSummary } from "./summaryApi";
import { GetUser } from "./userApi";

export * from "./accountApi";
export * from "./categoriesApi";
export * from "./summaryApi";
export * from "./transactionApi";
export * from "./userApi";

export interface ChartTrxProps {
  trx?: TrxSummary[];
  user?: GetUser;
  loading: boolean;
}

export interface CategoryProps {
  categories?: CategorySummary[];
  user?: GetUser;
  loading: boolean;
}
