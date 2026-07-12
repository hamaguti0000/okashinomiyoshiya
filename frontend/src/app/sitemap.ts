import { MetadataRoute } from "next";
import { getPublishedProducts, getPublishedNews } from "@/lib/cms";
import { productCategories } from "@/lib/product-categories";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ビルド時にDBが存在しない場合は空配列で続行
  let products: Awaited<ReturnType<typeof getPublishedProducts>> = [];
  let newsItems: Awaited<ReturnType<typeof getPublishedNews>> = [];
  try {
    [products, newsItems] = await Promise.all([
      getPublishedProducts(),
      getPublishedNews(),
    ]);
  } catch {
    // DB未起動時（ビルド段階）はスキップ
  }
  const newsUrls: MetadataRoute.Sitemap = newsItems.map((item) => ({
    url: `${BASE_URL}/news/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  const categoryUrls: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${BASE_URL}/products/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/all`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/todoroki`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...newsUrls,
    ...categoryUrls,
    ...productUrls,
  ];
}
