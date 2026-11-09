"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, requireAdmin, setAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const categories = {
  product: ["和菓子", "洋菓子", "ケーキ"],
  news: ["お知らせ", "新商品", "イベント", "休業案内"],
};

function value(formData: FormData, key: string) {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

function optionalValue(formData: FormData, key: string) {
  const text = value(formData, key);
  return text.length > 0 ? text : null;
}

function intValue(formData: FormData, key: string) {
  const parsed = Number.parseInt(value(formData, key), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function boolValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function requireOneOf(input: string, allowed: string[], fallback: string) {
  return allowed.includes(input) ? input : fallback;
}

async function uploadMedia(formData: FormData, fallbackAlt: string) {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return null;

  const mimeType = file.type || "application/octet-stream";
  const ext = mimeType.split("/")[1]?.replace("jpeg", "jpg") || "bin";
  const filename = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));

  return prisma.media.create({
    data: {
      url: `/uploads/${filename}`,
      alt: optionalValue(formData, "imageAlt") ?? fallbackAlt,
      sourceLabel: optionalValue(formData, "sourceLabel") ?? "管理画面",
      sourceUrl: optionalValue(formData, "sourceUrl"),
      filename,
      mimeType,
      size: file.size,
    },
  });
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/news");
  revalidatePath("/sitemap.xml");
}

type Direction = "up" | "down";

/**
 * Moves `id` one place up/down within `ids` and writes back sortOrder = index
 * for every item, so ordering stays consistent even if sortOrder values were
 * previously duplicated (e.g. all left at the default 0).
 */
async function applyReorder(
  ids: string[],
  id: string,
  direction: Direction,
  update: (id: string, sortOrder: number) => Promise<unknown>
) {
  const index = ids.indexOf(id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= ids.length) return;

  const reordered = [...ids];
  [reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]];
  await Promise.all(reordered.map((itemId, i) => update(itemId, i)));
}

export async function loginAction(formData: FormData) {
  const password = value(formData, "password");
  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin();

  const id = value(formData, "id");
  const name = value(formData, "name");
  const slug = value(formData, "slug");
  const image = await uploadMedia(formData, name);
  const data = {
    slug,
    name,
    yomi: value(formData, "yomi"),
    category: requireOneOf(value(formData, "category"), categories.product, "和菓子"),
    description: value(formData, "description"),
    longDescription: value(formData, "longDescription"),
    price: optionalValue(formData, "price"),
    note: optionalValue(formData, "note"),
    season: value(formData, "season"),
    emoji: value(formData, "emoji") || "🍪",
    emojiBg: value(formData, "emojiBg") || "from-honey-100 to-milk-200",
    sortOrder: intValue(formData, "sortOrder"),
    isPublished: boolValue(formData, "isPublished"),
    ...(image ? { imageId: image.id } : {}),
  };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePublic();
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: value(formData, "id") } });
  revalidatePublic();
  redirect("/admin/products");
}

export async function toggleProductPublishedAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const product = await prisma.product.findUnique({ where: { id }, select: { isPublished: true } });
  if (!product) return;
  await prisma.product.update({ where: { id }, data: { isPublished: !product.isPublished } });
  revalidatePublic();
  redirect("/admin/products");
}

export async function moveProductAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const direction = value(formData, "direction") as Direction;
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  await applyReorder(products.map((p) => p.id), id, direction, (itemId, sortOrder) =>
    prisma.product.update({ where: { id: itemId }, data: { sortOrder } })
  );
  revalidatePublic();
  redirect("/admin/products");
}

export async function saveNewsAction(formData: FormData) {
  await requireAdmin();

  const id = value(formData, "id");
  const title = value(formData, "title");
  const image = await uploadMedia(formData, title);
  const data = {
    title,
    category: requireOneOf(value(formData, "category"), categories.news, "お知らせ"),
    body: optionalValue(formData, "body"),
    publishedAt: new Date(`${value(formData, "publishedAt")}T00:00:00+09:00`),
    sortOrder: intValue(formData, "sortOrder"),
    isPublished: boolValue(formData, "isPublished"),
    ...(image ? { imageId: image.id } : {}),
  };

  if (id) {
    await prisma.newsItem.update({ where: { id }, data });
  } else {
    await prisma.newsItem.create({ data });
  }

  revalidatePublic();
  redirect("/admin/news");
}

export async function deleteNewsAction(formData: FormData) {
  await requireAdmin();
  await prisma.newsItem.delete({ where: { id: value(formData, "id") } });
  revalidatePublic();
  redirect("/admin/news");
}

export async function toggleNewsPublishedAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const news = await prisma.newsItem.findUnique({ where: { id }, select: { isPublished: true } });
  if (!news) return;
  await prisma.newsItem.update({ where: { id }, data: { isPublished: !news.isPublished } });
  revalidatePublic();
  redirect("/admin/news");
}

export async function savePhotoAction(formData: FormData) {
  await requireAdmin();

  const id = value(formData, "id");
  const title = value(formData, "title");
  const image = await uploadMedia(formData, title);

  if (!id && !image) {
    redirect("/admin/photos?error=image");
  }

  const data = {
    title,
    body: value(formData, "body"),
    placement: value(formData, "placement") || "gallery",
    sortOrder: intValue(formData, "sortOrder"),
    isActive: boolValue(formData, "isActive"),
    ...(image ? { imageId: image.id } : {}),
  };

  if (id) {
    await prisma.sitePhoto.update({ where: { id }, data });
  } else if (image) {
    await prisma.sitePhoto.create({ data: { ...data, imageId: image.id } });
  }

  revalidatePublic();
  redirect("/admin/photos");
}

export async function deletePhotoAction(formData: FormData) {
  await requireAdmin();
  await prisma.sitePhoto.delete({ where: { id: value(formData, "id") } });
  revalidatePublic();
  redirect("/admin/photos");
}

export async function togglePhotoActiveAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const photo = await prisma.sitePhoto.findUnique({ where: { id }, select: { isActive: true } });
  if (!photo) return;
  await prisma.sitePhoto.update({ where: { id }, data: { isActive: !photo.isActive } });
  revalidatePublic();
  redirect("/admin/photos");
}

export async function movePhotoAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const direction = value(formData, "direction") as Direction;
  const photos = await prisma.sitePhoto.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  await applyReorder(photos.map((p) => p.id), id, direction, (itemId, sortOrder) =>
    prisma.sitePhoto.update({ where: { id: itemId }, data: { sortOrder } })
  );
  revalidatePublic();
  redirect("/admin/photos");
}

export async function saveSpecialDayAction(formData: FormData) {
  await requireAdmin();

  const id       = value(formData, "id");
  const dateStr  = value(formData, "date");
  const isClosed = boolValue(formData, "isClosed");
  const hours    = isClosed ? null : optionalValue(formData, "hours");

  const data = {
    date:     new Date(`${dateStr}T00:00:00Z`),
    label:    value(formData, "label") || (isClosed ? "臨時休業" : "特別営業"),
    isClosed,
    hours,
  };

  if (id) {
    await prisma.specialDay.update({ where: { id }, data });
  } else {
    await prisma.specialDay.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  redirect("/admin/special-days");
}

export async function deleteSpecialDayAction(formData: FormData) {
  await requireAdmin();
  await prisma.specialDay.delete({ where: { id: value(formData, "id") } });
  revalidatePath("/");
  redirect("/admin/special-days");
}

export async function saveFaqAction(formData: FormData) {
  await requireAdmin();

  const id = value(formData, "id");
  const data = {
    question:   value(formData, "question"),
    answer:     value(formData, "answer"),
    category:   value(formData, "category") || "一般",
    sortOrder:  intValue(formData, "sortOrder"),
    isPublished: boolValue(formData, "isPublished"),
  };

  if (id) {
    await prisma.faq.update({ where: { id }, data });
  } else {
    await prisma.faq.create({ data });
  }

  revalidatePath("/faq");
  redirect("/admin/faqs");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdmin();
  await prisma.faq.delete({ where: { id: value(formData, "id") } });
  revalidatePath("/faq");
  redirect("/admin/faqs");
}

export async function toggleFaqPublishedAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const faq = await prisma.faq.findUnique({ where: { id }, select: { isPublished: true } });
  if (!faq) return;
  await prisma.faq.update({ where: { id }, data: { isPublished: !faq.isPublished } });
  revalidatePath("/faq");
  redirect("/admin/faqs");
}

export async function moveFaqAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const direction = value(formData, "direction") as Direction;
  const target = await prisma.faq.findUnique({ where: { id }, select: { category: true } });
  if (!target) return;

  // 表示順はカテゴリ内での並びなので、同じカテゴリの中だけで入れ替える
  const faqs = await prisma.faq.findMany({
    where: { category: target.category },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  await applyReorder(faqs.map((f) => f.id), id, direction, (itemId, sortOrder) =>
    prisma.faq.update({ where: { id: itemId }, data: { sortOrder } })
  );
  revalidatePath("/faq");
  redirect("/admin/faqs");
}
