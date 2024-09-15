"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AccountExpenseSummary } from "@/types";
import { getAllInfoByISO } from "iso-country-currency";
import { Landmark, Settings2 } from "lucide-react";
import CurrencyInput from "react-currency-input-field";
import { CardTile } from "./CardTile";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

export function AccountCard({
  locale,
  setSelectedAccount,
  onDelete,
  ...account
}: AccountExpenseSummary & {
  locale: string;
  setSelectedAccount: Dispatch<
    SetStateAction<AccountExpenseSummary | undefined>
  >;
  onDelete: (id: string) => void;
}) {
  return (
    <Card className="w-full max-w-[500px] h-fit">
      <CardHeader className="flex flex-row gap-x-4 items-center">
        <Landmark size={36} />
        <div className="flex flex-col">
          <CardTitle>{account.accountName}</CardTitle>
          <CardDescription>
            {account.bankName} &#8226; {account.accountNumber?.slice(-4)}
          </CardDescription>
        </div>
        <div className="rounded-md border ml-auto px-4 py-2">
          {account.accountType}
        </div>
      </CardHeader>
      <CardContent className="flex gap-x-2 w-full">
        <CardTile {...account} locale={locale} variant="income" />
        <CardTile {...account} locale={locale} variant="expense" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="destructive"
          onClick={() => {
            onDelete(account.id);
          }}
        >
          Delete
        </Button>
        <Button
          variant="outline"
          className="flex gap-x-2 items-center"
          onClick={() => {
            setSelectedAccount(account);
          }}
        >
          <Settings2 size={16} />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
