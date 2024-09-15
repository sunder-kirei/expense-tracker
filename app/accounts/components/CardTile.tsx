import { CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AccountExpenseSummary } from "@/types";
import { cva, VariantProps } from "class-variance-authority";
import { getAllInfoByISO } from "iso-country-currency";
import CurrencyInput from "react-currency-input-field";

export const cardVariants = cva(
  "flex items-center space-x-4 rounded-md ring-1 p-4 w-full",
  {
    variants: {
      variant: {
        income: "text-green-500 ring-green-500",
        expense: "text-red-500 ring-red-500",
      },
    },
    defaultVariants: {
      variant: "income",
    },
  }
);

interface Props
  extends VariantProps<typeof cardVariants>,
    AccountExpenseSummary {
  locale: string;
}

export function CardTile({ locale, variant, ...account }: Props) {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <CardTitle className="capitalize">{variant}</CardTitle>
      <div className={cn(cardVariants({ variant }))}>
        <div className="text-xl">{getAllInfoByISO(locale).symbol}</div>
        <CurrencyInput
          value={account[variant ?? "income"].valueOf()}
          disabled
          className="disabled:bg-transparent w-full"
        />
      </div>
    </div>
  );
}
