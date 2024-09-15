"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ChartTrxProps } from "@/types";
import { format } from "date-fns";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";

export function AppAreaChart({ trx, user, loading }: ChartTrxProps) {
  return trx && user && !loading ? (
    <ResponsiveContainer className="w-full h-full">
      <AreaChart
        data={trx}
        margin={{
          top: 45,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id={`color#8884d8`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`color#82ca9d`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>{" "}
        </defs>
        <XAxis dataKey={(props) => format(props.date, "dd/MM/yy")} />
        <YAxis />
        <Tooltip
          content={(props) => <CustomTooltip {...props} locale={user.locale} />}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#8884d8"
          fill="#8884d8"
          stackId="1"
          label="Expense"
        />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#82ca9d"
          fill="#82ca9d"
          stackId="1"
          label="Income"
        />
      </AreaChart>
    </ResponsiveContainer>
  ) : (
    <Skeleton className="h-full w-full rounded-md" />
  );
}
