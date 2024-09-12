import { getAllInfoByISO } from "iso-country-currency";

export function CustomTooltip(props: any) {
  const { active, payload, label, locale } = props;

  const { symbol } = getAllInfoByISO(locale);

  if (active && payload && payload.length) {
    return (
      <div className="bg-foreground/10 rounded-md text-foreground p-4 flex flex-col gap-y-2">
        <div className="text-primary font-semibold">{label}</div>
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-1">
            <span style={{ color: payload[1].color }}>Net income:</span>
            {symbol}
            {payload[1].value}
          </div>
          <div className="flex gap-x-1">
            <span style={{ color: payload[0].color }}>Net expense:</span>
            {symbol}
            {payload[0].value}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
