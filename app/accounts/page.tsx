"use client";

import { Loader } from "@/components/layout/Loader";
import {
  useDeleteAccountMutation,
  useGetAccountsSummaryQuery,
  useGetUserQuery,
  usePutAccountMutation,
} from "@/store/services/api";
import { AccountCard } from "./components/AccountCard";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  PostAccountInterface,
  PostAccountSchema,
} from "@/schema/PostAccount.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountExpenseSummary } from "@/types";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { AccountForm } from "./components/AccountForm";
import { toast } from "sonner";
import { NoData } from "@/components/NoData";
import { RangeDatePicker } from "@/components/RangeDatePicker";
import useConfirm from "@/hooks/useConfirm";

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
      success: (data) => {
        return `Edited account successfully😎`;
      },
      error: (err) => {
        return "Something went wrong🥲";
      },
    });
  }

  async function onDelete(id: string) {
    const res = await confirm();
    if (res) {
      toast.promise(deleteAccount({ id }).unwrap(), {
        loading: "Deleting account...",
        success: (data) => {
          return `Account deleted successfully😎`;
        },
        error: (err) => {
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
