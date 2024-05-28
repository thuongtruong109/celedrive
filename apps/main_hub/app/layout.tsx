import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./_components/ConvexClientProvider";
import Header from "./_components/fixtures/header";
import { Toaster } from "@/_components/ui/toaster";
import Footer from "./_components/fixtures/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Celedrive",
  description: "Store and share your files with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <Header />
          <main className="container min-h-[calc(100vh-6rem)]">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
