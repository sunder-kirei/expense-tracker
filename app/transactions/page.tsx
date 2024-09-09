import { DataTable } from "@/components/table/DataTable";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { GetTransaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { useGetTransactionsQuery } from "@/store/services/api";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { TransactionTable } from "./components/TransactionTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function TransactionsPage() {
  return (
    <>
      <TransactionTable />
      <Link href="/transactions/new">
        <Button
          variant="outline"
          className="absolute bottom-8 right-8 flex gap-x-2"
        >
          <Plus />
          <span className="hidden sm:inline">Create Transaction</span>
        </Button>
      </Link>
    </>
  );
}
