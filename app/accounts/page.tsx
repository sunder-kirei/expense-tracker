"use client";

import { Loader } from "@/components/layout/Loader";
import { NoData } from "@/components/NoData";
import { RangeDatePicker } from "@/components/RangeDatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useConfirm from "@/hooks/useConfirm";
import { PostAccountInterface } from "@/schema/PostAccount.schema";
import {
  useDeleteAccountMutation,
  useGetAccountsSummaryQuery,
  useGetUserQuery,
  usePutAccountMutation,
} from "@/store/services/api";
import { AccountExpenseSummary } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AccountCard } from "./components/AccountCard";
import { AccountForm } from "./components/AccountForm";

const defaultFrom = new Date();
defaultFrom.setDate(1);
const defaultTo = new Date();

export default function AccountsPage() {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const { data: accounts, isLoading: accountLoading } =
    useGetAccountsSummaryQuery({ from, to });
  const { data: user, isLoading: userLoading } = useGetUserQuery();
  const [putAccount] = usePutAccountMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const [selectedAccount, setSelectedAccount] = useState<
    AccountExpenseSummary | undefined
  >(undefined);

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "This action cannot be undone!",
  });

  function onSubmit(value: PostAccountInterface) {
    const accountId = selectedAccount!.id;
    setSelectedAccount(undefined);
    toast.promise(putAccount({ ...value, accountId }).unwrap(), {
      loading: "Editing account...",
      success: () => {
        return `Edited account successfully😎`;
      },
      error: () => {
        return "Something went wrong🥲";
      },
    });
  }

  async function onDelete(id: string) {
    const res = await confirm();
    if (res) {
      toast.promise(deleteAccount({ id }).unwrap(), {
        loading: "Deleting account...",
        success: () => {
          return `Account deleted successfully😎`;
        },
        error: () => {
          return "Something went wrong🥲";
        },
      });
    }
  }

  return accountLoading || userLoading ? (
    <Loader />
  ) : selectedAccount !== undefined ? (
    <Dialog
      open={selectedAccount !== undefined}
      onOpenChange={(value) => {
        if (!value) setSelectedAccount(undefined);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>
        <AccountForm onSubmit={onSubmit} account={selectedAccount} />
      </DialogContent>
    </Dialog>
  ) : (
    <>
      <ConfirmDialog />
      <div className="flex flex-col h-full w-full overflow-auto lg:overflow-y-hidden scrollbar-thin gap-4">
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
        <div className="w-full h-full overflow-y-auto scrollbar-thin flex flex-col lg:flex-row gap-2">
          {accounts?.length === 0 && <NoData className="max-w-[500px] h-56" />}
          {accounts?.map((account) => (
            <AccountCard
              key={account.id}
              {...account}
              locale={user!.locale}
              setSelectedAccount={setSelectedAccount}
              onDelete={onDelete}
            />
          ))}
          <Link
            href="/accounts/new"
            className="z-100 absolute bottom-8 right-8"
          >
            <Button variant="outline" className="flex gap-x-2">
              <Plus />
              <span className="hidden sm:inline">Add account</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
