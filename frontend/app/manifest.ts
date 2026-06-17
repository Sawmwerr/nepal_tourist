import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nepal — Discover the Roof of the World",
    short_name: "Nepal",
    description:
      "Experience the Himalayas, ancient culture, sacred traditions, and raw adventure.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070d",
    theme_color: "#d4a843",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "256x256",
        type: "image/x-icon",
      },
    ],
  };
}
