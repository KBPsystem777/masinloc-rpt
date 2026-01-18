import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { PrototypeBanner } from "@/components/prototype-banner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masinloc LGU - Real Property Tax Management System",
  description: "Real Property Tax Management System for LGU Masinloc, Zambales",
  keywords: [
    "LGU",
    "Masinloc",
    "Real Property Tax",
    "RPT",
    "PIN",
    "Property Management",
    "Zambales",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrototypeBanner />
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
