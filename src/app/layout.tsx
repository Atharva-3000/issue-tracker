import "@radix-ui/themes/styles.css";
import './theme-config.css'
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./NavBar";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Inter } from 'next/font/google';
import { Toaster } from "react-hot-toast";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.variable}
      >
        <Theme accentColor="crimson" grayColor="gray">
          <Toaster position="bottom-right"/>
          <NavBar />
          <main className="p-5">
            {children}
          </main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html >
  );
}
