"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CategoryProps } from "@/types";
import {
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";

export function AppRadarChart({ categories, loading, user }: CategoryProps) {
  return categories && user && !loading ? (
    <ResponsiveContainer height="100%">
      <RadarChart
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        data={categories}
      >
        <PolarGrid color="#fff00" />
        <PolarAngleAxis dataKey="name" />
        {/* <PolarRadiusAxis /> */}
        <Tooltip
          content={(props) => <CustomTooltip {...props} locale={user.locale} />}
        />
        <Radar type="monotone" dataKey="expense" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  ) : (
    <Skeleton className="h-full w-full rounded-md" />
  );
}
