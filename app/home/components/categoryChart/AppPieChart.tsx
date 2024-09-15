"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CategoryProps } from "@/types";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CustomTooltip } from "./CustomTooltip";

export function AppPieChart({ categories, loading, user }: CategoryProps) {
  return categories && user && !loading ? (
    <ResponsiveContainer height="100%">
      <PieChart
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip
          content={(props) => <CustomTooltip {...props} locale={user.locale} />}
        />
        <Pie
          type="monotone"
          dataKey={(value) => value.expense.valueOf()}
          data={categories}
          stroke="#fffff"
        />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <Skeleton className="h-full w-full rounded-md" />
  );
}
