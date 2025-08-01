import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/ui/navbar/Navbar";
import { workSans } from "@/ui/fonts";

export const metadata: Metadata = {
  title: "Jaiden Khosla",
  description: "Jaiden Khosla's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.className} antialiased flex self-center`}
        >
        <Navbar/>
        <div className="page">
          {children}
        </div>
      </body>
    </html>
  );
}
