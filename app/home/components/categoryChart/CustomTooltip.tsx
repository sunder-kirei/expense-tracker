import { getAllInfoByISO } from "iso-country-currency";

export function CustomTooltip(props: any) {
  const { active, payload, locale } = props;

  const { symbol } = getAllInfoByISO(locale);

  if (active && payload && payload.length) {
    return (
      <div className="bg-foreground/30 rounded-md text-foreground p-4 flex flex-col gap-y-2">
        <div className="text-primary font-semibold">
          {payload[0].payload.name ?? "Uncategorized"}
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-1">
            <span>Expenditure:</span>
            {symbol}
            {payload[0].payload.expense}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
