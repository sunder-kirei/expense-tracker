import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TransactionTable } from "./components/TransactionTable";

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
