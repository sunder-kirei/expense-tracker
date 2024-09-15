"use client";

import { NoData } from "@/components/NoData";
import { RangeDatePicker } from "@/components/RangeDatePicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCategoriesSummaryQuery,
  useGetTransactionsSummaryQuery,
  useGetUserQuery,
} from "@/store/services/api";
import {
  ChartArea,
  ChartColumn,
  ChartPie,
  ChartSpline,
  Radar,
} from "lucide-react";
import { useState } from "react";
import { CardTile } from "./components/CardTile";
import { AppPieChart } from "./components/categoryChart/AppPieChart";
import { AppRadarChart } from "./components/categoryChart/AppRadarChart";
import { AppAreaChart } from "./components/trxChart/AppAreaChart";
import { AppBarChart } from "./components/trxChart/AppBarChart";
import { AppLineChart } from "./components/trxChart/AppLineChart";

const defaultFrom = new Date();
defaultFrom.setDate(1);
const defaultTo = new Date();

export default function Home() {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [trxGraph, setTrxGraph] = useState<{ type: "bar" | "line" | "area" }>({
    type: "area",
  });
  const [catGraph, setCatGraph] = useState<{ type: "pie" | "radar" }>({
    type: "pie",
  });
  const { data: trx, isFetching: trxLoading } = useGetTransactionsSummaryQuery({
    from,
    to,
  });
  const { data: user, isFetching: userLoading } = useGetUserQuery();
  const { data: category, isFetching: categoryLoading } =
    useGetCategoriesSummaryQuery({ from, to });

  const net = trx?.reduce(
    (a, t) => (a += t.income.valueOf() - t.expense.valueOf()),
    0
  );
  const income = trx?.reduce((a, t) => (a += t.income.valueOf()), 0);
  const expense = trx?.reduce((a, t) => (a += t.expense.valueOf()), 0);

  return (
    <div className="flex flex-col h-full w-full overflow-auto lg:overflow-y-hidden scrollbar-thin gap-2 px-4">
      <RangeDatePicker
        from={from}
        to={to}
        setFromDate={(val) => {
          if (val) setFrom(val);
        }}
        setToDate={(val) => {
          if (val) setTo(val);
        }}
      />

      <div className="w-full flex flex-col lg:h-52 lg:flex-row gap-2 items-center">
        <CardTile
          data={net?.toString()}
          cardDescription="Sum total of all your expenses"
          cardTitle="Net Expenses"
          locale={user?.locale}
          dataClassName="text-accent"
          loading={trxLoading || userLoading}
        />
        <CardTile
          data={income?.toString()}
          cardDescription="Sum total of all your credits"
          cardTitle="Income"
          locale={user?.locale}
          dataClassName="text-green-400"
          loading={trxLoading || userLoading}
        />
        <CardTile
          data={`${expense?.toString()}`}
          cardDescription="Sum total of all your debits"
          cardTitle="Expenses"
          locale={user?.locale}
          dataClassName="text-red-400"
          loading={trxLoading || userLoading}
        />
      </div>
      <div className="w-full h-full p-2 flex flex-col lg:flex-row gap-4">
        <div className="w-full flex flex-col items-end gap-y-1 h-full overflow-hidden">
          <Select
            defaultValue={trxGraph.type}
            onValueChange={(value) =>
              setTrxGraph({ type: value as "bar" | "line" | "area" })
            }
            disabled={trxLoading || userLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select graph type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bar">
                  <div className="select_icon">
                    <ChartColumn />
                    Bar
                  </div>
                </SelectItem>
                <SelectItem value="line">
                  <div className="select_icon">
                    <ChartSpline />
                    Line
                  </div>
                </SelectItem>
                <SelectItem value="area">
                  <div className="select_icon">
                    <ChartArea />
                    Area
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="chart w-full h-[600px] lg:h-full">
            {trxGraph.type === "area" ? (
              <AppAreaChart
                trx={trx}
                user={user}
                loading={trxLoading || userLoading}
              />
            ) : trxGraph.type === "bar" ? (
              <AppBarChart
                trx={trx}
                user={user}
                loading={trxLoading || userLoading}
              />
            ) : (
              <AppLineChart
                trx={trx}
                user={user}
                loading={trxLoading || userLoading}
              />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-end gap-y-1 h-full overflow-hidden">
          <Select
            defaultValue={catGraph.type}
            onValueChange={(value) =>
              setCatGraph({ type: value as "pie" | "radar" })
            }
            disabled={categoryLoading || userLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select graph type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pie">
                  <div className="select_icon">
                    <ChartPie />
                    Pie
                  </div>
                </SelectItem>
                <SelectItem value="radar">
                  <div className="select_icon">
                    <Radar />
                    Radar
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="chart w-full h-[600px] lg:h-[300px]">
            {category?.length === 0 ? (
              <NoData />
            ) : catGraph.type === "pie" ? (
              <AppPieChart
                categories={category}
                loading={categoryLoading || userLoading}
                user={user}
              />
            ) : (
              <AppRadarChart
                categories={category}
                loading={categoryLoading || userLoading}
                user={user}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
