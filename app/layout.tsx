import AccountProvider from "@/app/context/AccountProvider";
import { AuthProvider } from "@/app/context/AuthProvider";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "Split Bill",
  description: "Help to split the bill.",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <AuthProvider>
            <AccountProvider>{children}</AccountProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
