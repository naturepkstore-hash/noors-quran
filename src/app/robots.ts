import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://noorsquran.vercel.app");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/quran/", "/listen/", "/search", "/duas", "/names-of-allah", "/about"],
      disallow: ["/private/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
