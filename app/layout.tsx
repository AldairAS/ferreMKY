import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FerreMYK",
  description: "Sistema semi ERP para control de gestion de tiendas",
  icons: [
    {
      rel: "icon",
      url: "https://avatars.githubusercontent.com/u/83354843?s=200&v=4",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
