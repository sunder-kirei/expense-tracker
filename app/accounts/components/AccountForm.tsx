"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  PostAccountInterface,
  PostAccountSchema,
} from "@/schema/PostAccount.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { AccountExpenseSummary } from "@/types";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (values: PostAccountInterface) => void;
  account?: AccountExpenseSummary;
}

export function AccountForm({ account, onSubmit }: Props) {
  const form = useForm<PostAccountInterface>({
    resolver: zodResolver(PostAccountSchema),
    defaultValues: {
      accountName: account?.accountName,
      accountNumber: account?.accountNumber ?? undefined,
      accountType: account?.accountType ?? "DEBIT",
      bankName: account?.bankName,
      isPrimary: account?.isPrimary ?? false,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter account name..." {...field} />
              </FormControl>
              <FormDescription>
                Any short name for your own convienence
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Bank name..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Optional but recommended..." {...field} />
              </FormControl>
              <FormDescription>
                Adding account number will make it easier for you to identify
                accounts
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DEBIT">DEBIT</SelectItem>
                  <SelectItem value="CREDIT">CREDIT</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPrimary"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-2 leading-none">
                <FormLabel>
                  Set as <i>primary</i>
                </FormLabel>
                <FormDescription>
                  <i>Primary</i> account is the default when adding
                  transactions.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
