import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NoorsQuran",
    short_name: "NoorsQuran",
    description: "A peaceful Quran reading and listening experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/quran.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
