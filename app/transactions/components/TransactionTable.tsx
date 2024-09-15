"use client";

import { Loader } from "@/components/layout/Loader";
import { DataTable } from "@/components/table/DataTable";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  useDeleteTransactionsMutation,
  useGetTransactionsQuery,
  useGetUserQuery,
} from "@/store/services/api";
import { GetTransaction } from "@/types";
import { ColumnDef, RowModel } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { getAllInfoByISO } from "iso-country-currency";
import { Banknote, CreditCard, QrCode } from "lucide-react";
import CurrencyInput from "react-currency-input-field";
import { toast } from "sonner";

export function TransactionTable() {
  const { data, isLoading } = useGetTransactionsQuery();
  const { data: user, isLoading: userLoading } = useGetUserQuery();
  const [deleteQuery, { isLoading: deleteLoading }] =
    useDeleteTransactionsMutation();

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
      cell: ({ row }) => (
        <div>{row.original.category?.name ?? "Uncategorized"}</div>
      ),
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
        <div className={cn("flex items-center gap-x-2 w-20")}>
          <div className="text-xl">
            {getAllInfoByISO(user?.locale ?? "IN").symbol}
          </div>
          <CurrencyInput
            value={row.original.amount}
            disabled
            className="disabled:bg-transparent"
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

  function handleDelete(rows: RowModel<GetTransaction>) {
    const ids = rows.rows.map((row) => row.original.id);
    toast.promise(deleteQuery({ ids }).unwrap(), {
      loading: "Deleting transactions...",
      success: () => "Deleted transactions😎",
      error: () => "Something went wrong🥲",
    });
  }

  return isLoading || userLoading || deleteLoading ? (
    <div className="w-full flex flex-col items-end gap-y-4">
      <div className="flex gap-x-4 items-center">
        <Skeleton className="w-24 h-10 " />
        <Skeleton className="w-24 h-10 " />
      </div>
      <Skeleton className="w-full h-64" />
    </div>
  ) : (
    <DataTable<GetTransaction>
      columns={columns}
      data={data ?? []}
      handleDelete={handleDelete}
    />
  );
}
