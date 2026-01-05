import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AuthProvider from "@/components/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";

export const metadata: Metadata = {
  title: "Akhand Bhakti",
  description:
    "Sacred Spiritual Products. Blessed items for divine protection, peace, and spiritual growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
