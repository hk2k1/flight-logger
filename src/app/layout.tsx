import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/components/layout/providers";
import { auth } from "@/auth";

const Mont = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FlightLogger",
  description: "Assessment done by Harsha - tracks flight logs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          Mont.variable,
          Mont.className
        )}
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster position="bottom-center" reverseOrder={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
