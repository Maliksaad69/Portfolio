import { MetadataRoute } from "next";
import { getProjects, getCaseStudies } from "@/lib/data/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maliksaad.dev";

  const staticRoutes = [
    "",
    "/projects",
    "/case-studies",
    "/experience",
    "/skills",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-10-24"),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projects = await getProjects({ publishedOnly: true });
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date("2026-10-24"),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const caseStudies = await getCaseStudies({ publishedOnly: true });
  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: new Date("2026-10-24"),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes, ...caseStudyRoutes];
}
