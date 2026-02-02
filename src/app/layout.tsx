import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AuthProvider from "@/components/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import Script from "next/script";
import ScrollToTop from "@/components/ScroolToTop";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import BackToTop from "@/components/BackToTop";
import { Yatra_One, Noto_Serif_Devanagari } from "next/font/google";

const yatra = Yatra_One({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-yatra",
});
const noto = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: {
    default:
      "Akhand Bhakti® – Official Website | Authentic Rudraksha & Spiritual Products",
    template: "%s | Akhand Bhakti",
  },
  description:
    "Akhand Bhakti offers authentic Rudraksha malas, beads, chandan, and sacred spiritual products. Blessed items for divine protection, peace, and spiritual growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${yatra.variable} ${noto.variable}`} lang="en">
      <head>
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://akhandbhakti.com/#organization",
              name: "Akhand Bhakti",
              url: "https://akhandbhakti.com",
              logo: "https://akhandbhakti.com/logo.png",
              image: "https://akhandbhakti.com/logo.png",
              description:
                "Akhand Bhakti is an authentic spiritual ecommerce platform offering Rudraksha, malas, puja essentials, and devotional products.",
              foundingCountry: "IN",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "akhandbhaktiofficial@gmail.com",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: [
                "https://www.instagram.com/akhandbhaktiofficial",
                "https://www.youtube.com/@akhandbhaktiofficial",
                "https://www.facebook.com/akhandbhaktiofficial",
              ],
            }),
          }}
        />

        {/* WebSite Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://akhandbhakti.com",
              name: "Akhand Bhakti",
              publisher: {
                "@id": "https://akhandbhakti.com/#organization",
              },
            }),
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <header className="relative z-50">
              <Navbar />
            </header>
            <ScrollToTop />
            <main className="pt-16 sm:pt-16 lg:pt-16">{children}</main>
            <BackToTop />
            <Analytics />
            <SpeedInsights />
            <Toaster richColors position="bottom-right" />
            {/* Razorpay Checkout Script */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js" async />
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
