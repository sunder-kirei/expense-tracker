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
import { twMerge } from "tailwind-merge";

export function AppAreaChart({
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
      <AreaChart
        data={data}
        margin={{
          top: 40,
          right: 30,
          left: 0,
          bottom: 0,
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
        />
        <Legend />
        <Area
          type="monotone"
          dataKey={x1}
          stroke="#8884d8"
          fill="#8884d8"
          stackId="1"
        />
        <Area
          type="monotone"
          dataKey={x2}
          stroke="#82ca9d"
          fill="#82ca9d"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  ) : (
    <Skeleton className="h-full w-full rounded-md" />
  );
}
