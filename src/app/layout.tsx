import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import QueryProvider from "../components/QueryProvider"; // Import new QueryProvider
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Series Manager App",
  description: "Track your favourite TV Series.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-black">
        <AuthProvider>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
