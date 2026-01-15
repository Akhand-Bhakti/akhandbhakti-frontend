import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AuthProvider from "@/components/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import Script from "next/script";
import ScrollToTop from "@/components/ScroolToTop";

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
            <ScrollToTop />
            {children}
            <Toaster richColors position="bottom-right" />
            <Script
              id="tawk-to"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/696750d0521ecd197e490559/1jetp7c3d';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `,
              }}
            />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
