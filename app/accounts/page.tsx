"use client";

import { Loader } from "@/components/layout/Loader";
import {
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

export default function AccountsPage() {
  const { data: accounts, isLoading: accountLoading } =
    useGetAccountsSummaryQuery();
  const { data: user, isLoading: userLoading } = useGetUserQuery();
  const [putAccount] = usePutAccountMutation();
  const [selectedAccount, setSelectedAccount] = useState<
    AccountExpenseSummary | undefined
  >(undefined);

  function onSubmit(value: PostAccountInterface) {
    const accountId = selectedAccount!.id;
    setSelectedAccount(undefined);
    toast.promise(putAccount({ ...value, accountId }).unwrap(), {
      loading: "Editing account...",
      success: (data) => {
        return `Edited account successfully😎`;
      },
      error: (err) => {
        console.log(err);
        return "Something went wrong🥲";
      },
    });
  }

  return (
    <>
      {accountLoading || userLoading ? (
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
        <div className="w-full h-full custom-grid overflow-y-auto scrollbar-thin">
          {accounts?.map((account) => (
            <AccountCard
              {...account}
              locale={user!.locale}
              setSelectedAccount={setSelectedAccount}
            />
          ))}
        </div>
      )}
      <Link href="/accounts/new" className="z-100">
        <Button
          variant="outline"
          className="absolute bottom-8 right-8 flex gap-x-2"
        >
          <Plus />
          <span className="hidden sm:inline">Add account</span>
        </Button>
      </Link>
    </>
  );
}
