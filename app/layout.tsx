import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/ui/navbar/Navbar";
import { workSans } from "@/ui/fonts";
import Fade from "@/ui/fadeIn/Fade";
export const metadata: Metadata = {
  title: "Jaiden Khosla",
  description: "Jaiden Khosla's Portfolio",
  icons: {
    icon: "icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.className} antialiased flex self-center flex-col md:flex-row`}
        >
        <Navbar/>
        <div className="page">
          {children}
        </div>
      </body>
    </html>
  );
}
