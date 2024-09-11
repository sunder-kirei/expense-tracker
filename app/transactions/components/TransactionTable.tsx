"use client";

import { cardVariants } from "@/app/accounts/components/CardTile";
import { Loader } from "@/components/layout/Loader";
import { DataTable } from "@/components/table/DataTable";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { cn } from "@/lib/utils";
import { useGetTransactionsQuery, useGetUserQuery } from "@/store/services/api";
import { GetTransaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { getAllInfoByISO } from "iso-country-currency";
import { Banknote, CreditCard, Loader2, QrCode } from "lucide-react";
import CurrencyInput from "react-currency-input-field";

export function TransactionTable() {
  const { data, isLoading } = useGetTransactionsQuery();
  const { data: user, isLoading: userLoading } = useGetUserQuery();

  const columns: ColumnDef<GetTransaction>[] = [
    {
      accessorKey: "payee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payee" />
      ),
      cell: ({ row }) => <div className="capitalize">{row.original.payee}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "bankAccount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account" />
      ),
      cell: ({ row }) => <div>{row.original.bankAccount.accountName}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => <div>{row.original.category.name}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "mode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mode of Payment" />
      ),

      cell: ({ row }) => {
        switch (row.original.type) {
          case "CARD":
            return (
              <div className="flex gap-x-2 text-blue-400">
                <CreditCard />; CARD
              </div>
            );
          case "CASH":
            return (
              <div className="flex gap-x-2 text-green-400">
                <Banknote />
                CASH
              </div>
            );
          default:
            return (
              <div className="flex gap-x-2 text-orange-400">
                <QrCode />
                UPI
              </div>
            );
        }
      },
      enableSorting: false,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => (
        <div className={cn("flex items-center gap-x-2 w-fit")}>
          <div className="text-xl">
            {getAllInfoByISO(user?.locale ?? "IN").symbol}
          </div>
          <CurrencyInput
            value={row.original.amount}
            disabled
            className="disabled:bg-transparent w-fit"
          />
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <div>{formatDate(row.original.date, "dd/MM/yyyy")}</div>
      ),
    },
  ];

  return isLoading || userLoading ? (
    <Loader />
  ) : (
    <DataTable<GetTransaction> columns={columns} data={data ?? []} />
  );
}
