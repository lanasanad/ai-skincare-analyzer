import type { Metadata } from "next";
import { Inter } from "next/font/google";

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glow AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/drop.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}