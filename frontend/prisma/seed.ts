import { newsItems, products, sitePhotos } from "../src/lib/data";
import { prisma } from "../src/lib/prisma";

function parseDate(value: string) {
  const [year, month, day] = value.split(".").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}

async function upsertMedia(image: {
  src: string;
  alt: string;
  sourceLabel?: string;
  sourceUrl?: string;
}) {
  return prisma.media.upsert({
    where: { url: image.src },
    update: {
      alt: image.alt,
      sourceLabel: image.sourceLabel,
      sourceUrl: image.sourceUrl,
    },
    create: {
      url: image.src,
      alt: image.alt,
      sourceLabel: image.sourceLabel,
      sourceUrl: image.sourceUrl,
    },
  });
}

async function main() {
  for (const [index, product] of products.entries()) {
    const image = product.image ? await upsertMedia(product.image) : null;

    await prisma.product.upsert({
      where: { slug: product.id },
      update: {
        name: product.name,
        yomi: product.yomi,
        category: product.category,
        description: product.description,
        longDescription: product.longDescription,
        price: product.price,
        note: product.note,
        season: product.season,
        emoji: product.emoji,
        emojiBg: product.emojiBg,
        sortOrder: index,
        isPublished: true,
        imageId: image?.id ?? null,
      },
      create: {
        id: product.id,
        slug: product.id,
        name: product.name,
        yomi: product.yomi,
        category: product.category,
        description: product.description,
        longDescription: product.longDescription,
        price: product.price,
        note: product.note,
        season: product.season,
        emoji: product.emoji,
        emojiBg: product.emojiBg,
        sortOrder: index,
        isPublished: true,
        imageId: image?.id ?? null,
      },
    });
  }

  for (const [index, item] of newsItems.entries()) {
    const image = item.image ? await upsertMedia(item.image) : null;

    await prisma.newsItem.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        category: item.category,
        body: item.body,
        publishedAt: parseDate(item.date),
        sortOrder: index,
        isPublished: true,
        imageId: image?.id ?? null,
      },
      create: {
        id: item.id,
        title: item.title,
        category: item.category,
        body: item.body,
        publishedAt: parseDate(item.date),
        sortOrder: index,
        isPublished: true,
        imageId: image?.id ?? null,
      },
    });
  }

  for (const [index, photo] of sitePhotos.entries()) {
    const image = await upsertMedia(photo);

    await prisma.sitePhoto.upsert({
      where: { id: `site-photo-${index + 1}` },
      update: {
        title: photo.title,
        body: photo.body,
        placement: index === 0 ? "hero" : "gallery",
        sortOrder: index,
        isActive: true,
        imageId: image.id,
      },
      create: {
        id: `site-photo-${index + 1}`,
        title: photo.title,
        body: photo.body,
        placement: index === 0 ? "hero" : "gallery",
        sortOrder: index,
        isActive: true,
        imageId: image.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
