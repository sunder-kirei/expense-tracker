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
import { twMerge } from "tailwind-merge";

export function AppBarChart({
  data,
  user,
  loading,
  className,
  x1,
  xAxis,
  x2,
  yAxis,
  x1Label,
  x2Label,
  ...props
}: ChartTrxProps) {
  return data && user && !loading ? (
    <ResponsiveContainer
      className={twMerge("w-full h-full aspect-square", className?.toString())}
      {...props}
    >
      <BarChart
        data={data}
        margin={{
          top: 40,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey={xAxis} />
        <YAxis dataKey={yAxis} />
        <Tooltip
          content={(props) => (
            <CustomTooltip
              {...props}
              x1Label={x1Label}
              x2Label={x2Label}
              locale={user.locale}
            />
          )}
          cursor={{ fill: "white", fillOpacity: 0.1 }}
        />
        <Legend />
        <Bar
          type="monotone"
          dataKey={x1}
          stroke="#8884d8"
          fill="#8884d8"
          stackId="1"
        />
        <Bar
          type="monotone"
          dataKey={x2}
          stroke="#82ca9d"
          fill="#82ca9d"
          stackId="1"
        />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <Skeleton className="h-full w-full rounded-md" />
  );
}
