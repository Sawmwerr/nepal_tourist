import type { MetadataRoute } from "next";
import { DESTINATION_LIST, COMMUNITY_POSTS } from "@/lib/data";

const BASE = "https://project-hlg8a.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                   lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/destinations`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/community`,    lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/mountains`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/booking`,      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = DESTINATION_LIST.map((d) => ({
    url: `${BASE}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const communityRoutes: MetadataRoute.Sitemap = COMMUNITY_POSTS.map((p) => ({
    url: `${BASE}/community/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...destinationRoutes, ...communityRoutes];
}
