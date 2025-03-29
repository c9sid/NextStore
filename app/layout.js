import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shopping App",
  description: "Developed by Siddharth kumar",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl={process.env.NEXT_PUBLIC_URL}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable}`}
        >
          <Navbar />
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
