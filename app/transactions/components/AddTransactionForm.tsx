"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  PostTransactionInterface,
  PostTransactionSchema,
} from "@/schema/PostTransaction.schema";
import {
  useDeleteCategoryMutation,
  useGetAccountsQuery,
  useGetCategoriesQuery,
  usePostCategoryMutation,
  usePostTransactionMutation,
} from "@/store/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Banknote,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  CreditCard,
  LoaderCircle,
  QrCode,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddTransactionForm() {
  const { data: categories, isLoading: getCategoryLoading } =
    useGetCategoriesQuery();
  const { data: accounts, isLoading: getAccountLoading } =
    useGetAccountsQuery();
  const [postQuery, { isLoading: postCategoryLoading }] =
    usePostCategoryMutation();
  const [deleteQuery, { isLoading: deleteCategoryLoading }] =
    useDeleteCategoryMutation();
  const [postTransaction, { isLoading: postTransactionLoading }] =
    usePostTransactionMutation();

  const router = useRouter();

  const [createCategory, setCreateCategory] = useState("");

  const categoryLoading =
    getCategoryLoading || postCategoryLoading || deleteCategoryLoading;
  const accountLoading = getAccountLoading;
  const transactionLoading = postTransactionLoading;

  const form = useForm<PostTransactionInterface>({
    resolver: zodResolver(PostTransactionSchema),
    mode: "onBlur",
    shouldFocusError: true,
    reValidateMode: "onBlur",
    defaultValues: {
      type: "UPI",
      date: new Date(),
      bankAccountId: "",
      categoryId: "",
      amount: 0,
      notes: "",
      payee: "",
    },
  });

  function onSubmit({
    amount,
    bankAccountId,
    categoryId,
    date,
    payee,
    type,
    notes,
  }: PostTransactionInterface) {
    toast.promise(
      postTransaction({
        amount,
        bankAccountId,
        categoryId: categoryId === "" ? undefined : categoryId,
        date,
        payee,
        type,
        notes,
      }).unwrap(),
      {
        loading: "Creating transaction...",
        success: (data) => {
          router.push("/transactions");
          return `Transaction ${data.id} created.`;
        },
        error: (error) => {
          return error.error;
        },
      }
    );
  }

  function onTouch(name: any) {
    form.clearErrors(name);
  }

  function handleCreateCategory() {
    if (createCategory.length === 0) {
      toast("Enter new category name first...");
      return;
    }
    toast.promise(postQuery({ name: createCategory }).unwrap(), {
      loading: "Creating category...",
      success: (data) => {
        return `Category ${data.name} created.`;
      },
      error: (error) => {
        return error.error;
      },
    });
  }

  function handleDeleteCategory(id: string) {
    toast.promise(deleteQuery({ id }).unwrap(), {
      loading: "Deleting category...",
      success: (data) => {
        return `Category ${data.name} deleted.`;
      },
      error: (error) => {
        return error.error;
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="payee"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter payee..."
                  {...field}
                  onClick={() => onTouch("payee")}
                />
              </FormControl>

              <FormDescription>
                A <i>payee</i> is the other party of this transaction🤔
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-x-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter amount..."
                    onClick={() => onTouch("amount")}
                    {...field}
                    type="number"
                    className={cn(
                      field.value < 0 &&
                        "border-red-400 focus-visible:ring-red-400",
                      field.value > 0 &&
                        "border-green-400 focus-visible:ring-green-400"
                    )}
                  />
                </FormControl>

                <FormDescription>
                  Use <span className="font-bold">-</span> for <i>debit</i> and
                  no sign or <span className="font-bold">+</span> for{" "}
                  <i>credit</i>😇
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col py-1.5 gap-y-1">
                <FormLabel className="mr-4">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-start gap-x-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Mode of payment</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        field.value === "CASH" && "text-green-400",
                        field.value === "CARD" && "text-blue-400",
                        field.value === "UPI" && "text-orange-400"
                      )}
                    >
                      <SelectValue placeholder="Select the mode of payment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CASH">
                      <div className="select_icon">
                        <Banknote />
                        CASH
                      </div>
                    </SelectItem>
                    <SelectItem value="CARD">
                      <div className="select_icon">
                        <CreditCard />
                        CARD
                      </div>
                    </SelectItem>
                    <SelectItem value="UPI">
                      <div className="select_icon">
                        <QrCode />
                        UPI
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-y-1 py-1.5 items-start">
                <FormLabel>Category</FormLabel>
                {!categories || categoryLoading ? (
                  <div className="grid place-items-center p-4">
                    <LoaderCircle className="animate-spin" />
                  </div>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) => category.id === field.value
                              )?.name || "Select Category"
                            : "Select Category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search categories..."
                          onValueChange={(val) => setCreateCategory(val)}
                        />
                        <CommandList>
                          <CommandEmpty className="px-0 py-2">
                            <Button
                              variant="link"
                              className="w-full h-full text-ellipsis overflow-clip"
                              onClick={handleCreateCategory}
                            >
                              Create category {createCategory}
                            </Button>
                          </CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                value={category.name}
                                key={category.id}
                                onSelect={() => {
                                  form.setValue("categoryId", category.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    category.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.name}
                                <Trash2
                                  size={16}
                                  className="text-red-500 ml-auto cursor-pointer"
                                  onClick={() => {
                                    form.setValue("categoryId", "");
                                    handleDeleteCategory(category.id);
                                  }}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bankAccountId"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col gap-y-1 py-1.5 items-start">
              <FormLabel>Account</FormLabel>
              {!accounts || accountLoading ? (
                <div className="grid place-items-center p-4">
                  <LoaderCircle className="animate-spin" />
                </div>
              ) : (
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <Table>
                      <TableBody>
                        {accounts.map((account) => (
                          <SelectItem value={account.id}>
                            <TableRow
                              onClick={() => field.onChange(account.id)}
                            >
                              <TableCell>
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    account.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </TableCell>

                              <TableCell>{account.accountName}</TableCell>
                              <TableCell>{account.accountNumber}</TableCell>
                              <TableCell>{account.bankName}</TableCell>
                              <TableCell>{account.accountType}</TableCell>
                            </TableRow>
                          </SelectItem>
                        ))}
                      </TableBody>
                    </Table>
                  </SelectContent>
                </Select>
              )}
              <FormDescription>
                <Link
                  href="/profile/accounts/add"
                  className="underline text-primary"
                >
                  Add account
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional..."
                  {...field}
                  className="resize-none h-40"
                  onClick={() => onTouch("notes")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={
            categoryLoading ||
            accountLoading ||
            transactionLoading ||
            !categories
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
