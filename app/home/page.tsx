"use client";

import { Page } from "@/components/layout/Page";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCategoriesSummaryQuery,
  useGetTransactionsSummaryQuery,
  useGetUserQuery,
} from "@/store/services/api";
import { format } from "date-fns";
import { ChartArea, ChartColumn, ChartSpline } from "lucide-react";
import { useState } from "react";
import { CardTile } from "./components/CardTile";
import { AppAreaChart } from "./components/charts/AppAreaChart";
import { AppBarChart } from "./components/charts/AppBarChart";
import { AppLineChart } from "./components/charts/AppLineChart";

const defaultFrom = new Date();
defaultFrom.setDate(1);
const defaultTo = new Date();

export default function Home() {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [trxGraph, setTrxGraph] = useState<{ type: "bar" | "line" | "area" }>({
    type: "area",
  });
  const [catGraph, setCatGraph] = useState<{ type: "bar" | "line" | "area" }>({
    type: "bar",
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
    <Page className="gap-4">
      <RangeDatePicker
        from={from}
        to={to}
        setFromDate={(val) => {
          if (val) setFrom(val);
        }}
        setToDate={(val) => {
          if (val) setTo(val);
        }}
        className="mb-2 -mt-4"
        disabled={categoryLoading || trxLoading || userLoading}
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
      <div className="w-full h-full flex flex-col lg:flex-row gap-4">
        <div className="w-full flex flex-col items-end gap-2 h-full overflow-hidden">
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
          {trxGraph.type === "area" ? (
            <AppAreaChart
              data={trx}
              user={user}
              loading={trxLoading || userLoading}
              x2="income"
              x1="expense"
              x2Label="Net income:"
              x1Label="Net expense:"
              xAxis={(props) => format(props.date, "dd/MM/yy")}
            />
          ) : trxGraph.type === "bar" ? (
            <AppBarChart
              data={trx}
              user={user}
              loading={trxLoading || userLoading}
              x2="income"
              x1="expense"
              x2Label="Net income:"
              x1Label="Net expense:"
              xAxis={(props) => format(props.date, "dd/MM/yy")}
            />
          ) : (
            <AppLineChart
              data={trx}
              user={user}
              loading={trxLoading || userLoading}
              x2="income"
              x1="expense"
              x2Label="Net income:"
              x1Label="Net expense:"
              xAxis={(props) => format(props.date, "dd/MM/yy")}
            />
          )}

          {(trxLoading || userLoading) && (
            <Skeleton className="w-full h-full aspect-square" />
          )}
        </div>
        <div className="w-full flex flex-col items-end gap-2 h-full overflow-hidden">
          <Select
            defaultValue={catGraph.type}
            onValueChange={(value) =>
              setCatGraph({ type: value as "bar" | "line" | "area" })
            }
            disabled={categoryLoading || userLoading}
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
          {category?.length === 0 ? (
            <NoData />
          ) : catGraph.type === "area" ? (
            <AppAreaChart
              data={category}
              user={user}
              loading={categoryLoading || userLoading}
              x2="income"
              x1="expense"
              x2Label="Net income:"
              x1Label="Net expense:"
              xAxis="name"
            />
          ) : catGraph.type === "bar" ? (
            <AppBarChart
              data={category}
              user={user}
              loading={categoryLoading || userLoading}
              x2="income"
              x1="expense"
              x2Label="Net income:"
              x1Label="Net expense:"
              xAxis="name"
            />
          ) : (
            <AppLineChart
              data={category}
              user={user}
              loading={categoryLoading || userLoading}
              x2="income"
              x1="expense"
              x2Label="Net income:"
              x1Label="Net expense:"
              xAxis="name"
            />
          )}
          {(categoryLoading || userLoading) && (
            <Skeleton className="w-full h-full aspect-square" />
          )}
        </div>
      </div>
    </Page>
  );
}
