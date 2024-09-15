import { HorizontalNav } from "@/components/layout/nav/HorizontalNav";
import { VerticalNav } from "@/components/layout/nav/VerticalNav";
import { Page } from "@/components/layout/Page";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ProviderLayout from "@/components/layout/ProviderLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "expense tracker",
  description: "Manage personal expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg" />
      </head>
      <ProviderLayout>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden w-full flex flex-col`}
        >
          <HorizontalNav />
          <Separator className="h-[1px] bg-foreground/30" />
          <main className="flex h-full w-full p-4 gap-x-4 overflow-hidden">
            <VerticalNav />
            <Page>{children}</Page>
          </main>
          <Toaster richColors closeButton />
        </body>
      </ProviderLayout>
    </html>
  );
}
