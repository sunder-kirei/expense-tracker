import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getAllInfoByISO } from "iso-country-currency";
import { HTMLAttributes } from "react";

interface Props {
  locale?: string;
  data?: string;
  cardTitle: string;
  cardDescription: string;
  dataClassName?: string;
  loading: boolean;
}

export function CardTile({
  locale,
  data,
  cardDescription,
  cardTitle,
  className,
  dataClassName,
  loading,
  ...props
}: Props & HTMLAttributes<HTMLElement>) {
  return locale && data && !loading ? (
    <Card
      className={cn("w-full max-w-96 flex flex-col justify-between", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-primary">{cardTitle}</CardTitle>
        <CardDescription className="italic">{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent className={cn("flex items-end gap-x-1", dataClassName)}>
        <span className="text-xl">{getAllInfoByISO(locale).symbol}</span>
        <span className="text-6xl">{data}</span>
      </CardContent>
    </Card>
  ) : (
    <Skeleton className="rounded-md h-full w-full min-h-52" />
  );
}
