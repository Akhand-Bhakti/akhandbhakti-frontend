import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/checkout/",
        "/cart/",
        "/login/",
        "/register/",
      ],
    },
    sitemap: "https://akhandbhakti.com/sitemap.xml",
  };
}
