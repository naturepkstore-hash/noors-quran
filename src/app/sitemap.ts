import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://noorsquran.vercel.app");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/quran`, lastModified: new Date() },
    { url: `${baseUrl}/quran/surah`, lastModified: new Date() },
    { url: `${baseUrl}/quran/para`, lastModified: new Date() },
    { url: `${baseUrl}/quran/pdf`, lastModified: new Date() },
    { url: `${baseUrl}/listen`, lastModified: new Date() },
    { url: `${baseUrl}/search`, lastModified: new Date() },
    { url: `${baseUrl}/duas`, lastModified: new Date() },
    { url: `${baseUrl}/names-of-allah`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];
}
