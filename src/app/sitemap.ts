import { MetadataRoute } from "next";
import { DataStore } from "@/lib/db/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ylcc.edu.in";

  const [courses, projects, events] = await Promise.all([
    DataStore.getCourses(false),
    DataStore.getProjects(false),
    DataStore.getEvents(false),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/business`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/faculty`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/achievements`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/testimonials`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/apply`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(e.updatedAt),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...courseRoutes, ...projectRoutes, ...eventRoutes];
}
