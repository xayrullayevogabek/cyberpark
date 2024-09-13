import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ReduxProvider from "@/components/ReduxProvider";
import { HydrationProvider, Client } from "react-hydration-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cyberpark Next App",
  description: "Created by Xayrullayev Og'abek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <HydrationProvider>
          <Client>
            <Toaster theme="dark" position="top-right" richColors />
            <ReduxProvider>{children}</ReduxProvider>
          </Client>
        </HydrationProvider>
      </body>
    </html>
  );
}
