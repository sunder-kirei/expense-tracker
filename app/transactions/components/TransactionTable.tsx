"use client";

import { DataTable } from "@/components/table/DataTable";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { useGetTransactionsQuery } from "@/store/services/api";
import { GetTransaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

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
    cell: ({ row }) => <div>{row.original.type}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{row.original.amount}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{formatDate(row.original.date, "dd/MM/yyyy")}</div>,
  },
];

export function TransactionTable() {
  const { data } = useGetTransactionsQuery();

  return <DataTable<GetTransaction> columns={columns} data={data ?? []} />;
}
