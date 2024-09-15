import { HTMLAttributes, JSXElementConstructor, ReactElement } from "react";
import { CategorySummary, TrxSummary } from "./summaryApi";
import { GetUser } from "./userApi";
import { ResponsiveContainerProps } from "recharts";
import { DataKey } from "recharts/types/util/types";

export * from "./accountApi";
export * from "./categoriesApi";
export * from "./summaryApi";
export * from "./transactionApi";
export * from "./userApi";

export interface ChartTrxProps
  extends Omit<ResponsiveContainerProps, "children"> {
  data?: any[];
  user?: GetUser;
  loading: boolean;
  x1: DataKey<any>;
  x2: DataKey<any>;
  x1Label: string;
  x2Label: string;
  xAxis?: DataKey<any>;
  yAxis?: DataKey<any>;
}

export interface CategoryProps {
  categories?: CategorySummary[];
  user?: GetUser;
  loading: boolean;
}
