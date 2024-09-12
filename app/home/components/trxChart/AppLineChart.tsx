"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TrxSummaryInterface } from "@/schema/api/TrxSummary.schema";
import {
  useGetTransactionsSummaryQuery,
  useGetUserQuery,
} from "@/store/services/api";
import { format } from "date-fns";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { TrxSummary, GetUser, ChartTrxProps } from "@/types";

export function AppLineChart({ trx, user, loading }: ChartTrxProps) {
  return trx && user && !loading ? (
    <ResponsiveContainer width="100%" height="100%" className="">
      <LineChart
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
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="income" stroke="##82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <Skeleton className="h-full w-full rounded-md" />
  );
}
