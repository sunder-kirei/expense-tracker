import { HorizontalNav } from "@/components/layout/nav/HorizontalNav";
import { VerticalNav } from "@/components/layout/nav/VerticalNav";
import ProviderLayout from "@/components/layout/ProviderLayout";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full max-w-screen-2xl mx-auto`}
        >
          <VerticalNav className="fixed h-full sm:pt-20 pb-4 pl-2 w-48 bg-background" />
          <HorizontalNav className="sm:fixed border-b h-16 bg-background" />
          {children}
          <Toaster richColors closeButton />
        </body>
      </ProviderLayout>
    </html>
  );
}
