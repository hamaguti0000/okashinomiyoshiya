import { prisma } from "./prisma";
import { newsItems as fallbackNewsItems, products as fallbackProducts } from "./data";
import type { NewsItem, Product, SitePhoto } from "./data";

type MediaLike = {
  url: string;
  alt: string;
  sourceLabel: string | null;
  sourceUrl: string | null;
} | null;

function mapImage(image: MediaLike) {
  if (!image) return undefined;
  return {
    src: image.url,
    alt: image.alt,
    sourceLabel: image.sourceLabel ?? "管理画面",
    sourceUrl: image.sourceUrl ?? "",
  };
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export async function getPublishedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    include: { image: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const cmsProducts = products.map((product) => ({
    id: product.slug,
    name: product.name,
    yomi: product.yomi,
    category: product.category as Product["category"],
    description: product.description,
    longDescription: product.longDescription,
    price: product.price ?? undefined,
    note: product.note ?? undefined,
    season: product.season,
    emoji: product.emoji,
    emojiBg: product.emojiBg,
    image: mapImage(product.image),
  }));

  const cmsSlugs = new Set(cmsProducts.map((product) => product.id));
  return [
    ...cmsProducts,
    ...fallbackProducts.filter((product) => !cmsSlugs.has(product.id)),
  ];
}

export async function getPublishedProduct(slug: string): Promise<Product | null> {
  const product = await prisma.product.findFirst({
    where: { slug, isPublished: true },
    include: { image: true },
  });

  if (!product) {
    return fallbackProducts.find((fallback) => fallback.id === slug) ?? null;
  }

  return {
    id: product.slug,
    name: product.name,
    yomi: product.yomi,
    category: product.category as Product["category"],
    description: product.description,
    longDescription: product.longDescription,
    price: product.price ?? undefined,
    note: product.note ?? undefined,
    season: product.season,
    emoji: product.emoji,
    emojiBg: product.emojiBg,
    image: mapImage(product.image),
  };
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  const news = await prisma.newsItem.findMany({
    where: { isPublished: true },
    include: { image: true },
    orderBy: [{ publishedAt: "desc" }, { sortOrder: "asc" }],
  });

  const cmsNews = news.map((item) => ({
    id: item.id,
    date: formatDate(item.publishedAt),
    title: item.title,
    category: item.category as NewsItem["category"],
    body: item.body ?? undefined,
    image: mapImage(item.image),
  }));

  const cmsIds = new Set(cmsNews.map((item) => item.id));
  return [
    ...cmsNews,
    ...fallbackNewsItems.filter((item) => !cmsIds.has(item.id)),
  ].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getSpecialDays() {
  const days = await prisma.specialDay.findMany({
    orderBy: { date: "asc" },
  });
  return days.map((d) => ({
    id: d.id,
    date: `${d.date.getUTCFullYear()}-${String(d.date.getUTCMonth() + 1).padStart(2, "0")}-${String(d.date.getUTCDate()).padStart(2, "0")}`,
    label: d.label,
    isClosed: d.isClosed,
    hours: d.hours ?? undefined,
  }));
}

export async function getPublishedNewsItem(id: string): Promise<NewsItem | null> {
  const item = await prisma.newsItem.findFirst({
    where: { id, isPublished: true },
    include: { image: true },
  });

  if (!item) {
    return fallbackNewsItems.find((fallback) => fallback.id === id) ?? null;
  }

  return {
    id: item.id,
    date: formatDate(item.publishedAt),
    title: item.title,
    category: item.category as NewsItem["category"],
    body: item.body ?? undefined,
    image: mapImage(item.image),
  };
}

export async function getActiveSitePhotos(): Promise<SitePhoto[]> {
  const photos = await prisma.sitePhoto.findMany({
    where: { isActive: true },
    include: { image: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return photos.map((photo) => ({
    src: photo.image.url,
    alt: photo.image.alt,
    title: photo.title,
    body: photo.body,
    sourceLabel: photo.image.sourceLabel ?? "管理画面",
    sourceUrl: photo.image.sourceUrl ?? "",
  }));
}

export async function getHeroPhotos() {
  const photos = await prisma.sitePhoto.findMany({
    where: { isActive: true },
    include: { image: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    take: 4,
  });

  return photos.map((photo) => ({
    src: photo.image.url,
    alt: photo.image.alt,
  }));
}
