import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TransactionTable } from "./components/TransactionTable";
import { Page } from "@/components/layout/Page";

export default function TransactionsPage() {
  return (
    <Page>
      <TransactionTable />
      <Link href="/transactions/new">
        <Button
          variant="outline"
          className="fixed bottom-8 right-8 flex gap-x-2 ring ring-primary"
        >
          <Plus />
          <span className="hidden sm:inline">Create Transaction</span>
        </Button>
      </Link>
    </Page>
  );
}
