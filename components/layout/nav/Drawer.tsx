"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { VerticalNav } from "./VerticalNav";
import { useState } from "react";

export function Drawer() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-fit h-full">
        <VerticalNav
          className="flex h-full"
          onClick={() => setOpen((prev) => !prev)}
        />
      </SheetContent>
    </Sheet>
  );
}
