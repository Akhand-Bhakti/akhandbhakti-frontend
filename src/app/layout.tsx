import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AuthProvider from "@/components/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

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
            <header className="sticky top-0 h-16 bg-transparent z-50">
              <Navbar />
            </header>
            {children}
            <Toaster richColors position="bottom-right" />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
