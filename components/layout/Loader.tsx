import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="w-full h-full grid place-items-center">
      <Loader2 className="animate-spin" size={44} />
    </div>
  );
}
