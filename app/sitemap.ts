import type { MetadataRoute } from "next";
import { CITIES, TURKEY_DATA, slugify } from "../lib/turkey-zones";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kiraliksevgili.net";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kullanim-sartlari`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/topluluk-kurallari`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/harita`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mesajlar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/profil`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/yardim-merkezi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const cityRoutes: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${baseUrl}/${slugify(city)}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const districtRoutes: MetadataRoute.Sitemap = [];
  CITIES.forEach((city) => {
    const citySlug = slugify(city);
    const districts = TURKEY_DATA[city] || [];
    districts.forEach((district) => {
      districtRoutes.push({
        url: `${baseUrl}/${citySlug}/${slugify(district)}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.6,
      });
    });
  });

  return [...staticRoutes, ...cityRoutes, ...districtRoutes];
}
