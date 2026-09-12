import { MetadataRoute } from "next";
import ideasData from "@/data/ideas.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ideaverse1000.app";

  const staticRoutes = [
    "",
    "/explore",
    "/saved",
    "/submit",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const ideaRoutes = (ideasData as Array<{ id: string }>).map((idea) => ({
    url: `${baseUrl}/idea/${idea.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...ideaRoutes];
}
