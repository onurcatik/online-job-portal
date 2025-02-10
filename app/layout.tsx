// layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {ClerkProvider, SignInButton, SignedIn, SignedOut,UserButton} from "@clerk/nextjs"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Online Job Portal",
  description: "Find your dream job with ease. The best job portal online.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en">
     <body className={poppins.className}>{children}</body>
 
    </html>
    </ClerkProvider>
  );
}
