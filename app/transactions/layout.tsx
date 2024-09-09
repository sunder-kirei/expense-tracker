"use client";

import { store } from "@/store/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

export default function TransactionLayout({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
