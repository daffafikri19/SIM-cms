import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthConfigProvider from "@/providers/auth-provider";
import axios from "axios";

axios.defaults.withCredentials = true;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIM - Fun Bread Bakery",
  description: "Aplikasi Sistem Informasi Manajemen Fun Bread Bakery",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`w-full h-full ${inter.className}`}>
        <AuthConfigProvider>{children}</AuthConfigProvider>
      </body>
    </html>
  );
}
