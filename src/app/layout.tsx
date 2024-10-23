import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Navbar } from "@/components/navbar";



export const metadata: Metadata = {
  title: "Car Rental",
  description: "Rent Car From Now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <MantineProvider>
        <Navbar />
        {children}
        </MantineProvider>
      </body>
    </html>
  );
}
