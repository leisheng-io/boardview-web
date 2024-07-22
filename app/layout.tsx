import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Montserrat, Poppins, Roboto, Ubuntu } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  weight: "400", subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Lei Sheng | BoardView",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' dark'}>{children}</body>
    </html>
  );
}
