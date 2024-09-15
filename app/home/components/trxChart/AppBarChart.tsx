"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ChartTrxProps } from "@/types";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";

export function AppBarChart({ trx, user, loading }: ChartTrxProps) {
  return trx && user && !loading ? (
    <ResponsiveContainer width="100%" height="100%" className="">
      <BarChart
        data={trx}
        margin={{
          top: 45,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey={(props) => format(props.date, "dd/MM/yy")} />
        <YAxis />
        <Tooltip
          content={(props) => <CustomTooltip {...props} locale={user.locale} />}
          cursor={{ fill: "white", fillOpacity: 0.1 }}
        />
        <Legend />
        <Bar type="monotone" dataKey="expense" fill="#8884d8" />
        <Bar type="monotone" dataKey="income" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <Skeleton className="h-full w-full rounded-md" />
  );
}
