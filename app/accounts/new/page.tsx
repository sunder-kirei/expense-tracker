"use client";

import { PostAccountInterface } from "@/schema/PostAccount.schema";
import { usePostAccountMutation } from "@/store/services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AccountForm } from "../components/AccountForm";
import { Page } from "@/components/layout/Page";

export default function NewTransactionPage() {
  const router = useRouter();
  const [postAccount] = usePostAccountMutation();

  function onSubmit(value: PostAccountInterface) {
    toast.promise(postAccount({ ...value }).unwrap(), {
      loading: "Adding account...",
      success: () => {
        router.push("/accounts");
        return `Account added successfully😎`;
      },
      error: () => {
        return "Something went wrong🥲";
      },
    });
  }
  return (
    <Page>
      <AccountForm onSubmit={onSubmit} />
    </Page>
  );
}
