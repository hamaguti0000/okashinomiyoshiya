/**
 * アメブロ記事インポートスクリプト
 *
 * 使い方:
 *   npx tsx scripts/import-ameblog.ts
 *
 * RSS から記事を取得し、お知らせとして DB に登録します。
 * 同じタイトルの記事は重複登録しません。
 */

import { prisma } from "../src/lib/prisma";

const BLOG_ID = "okashinomiyoshiya";
const RSS_URL = `https://rssblog.ameba.jp/${BLOG_ID}/rss20.xml`;

// タグ間のテキストを抽出（CDATA も対応）
function extractTag(xml: string, tag: string): string {
  const cdata = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  if (cdata) return cdata[1].trim();
  const plain = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return plain ? plain[1].trim() : "";
}

// HTMLタグ・エスケープを除去してプレーンテキスト化
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// <item>…</item> を全件抽出
function parseItems(xml: string) {
  const items: { title: string; link: string; pubDate: string; description: string }[] = [];
  const rx = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = rx.exec(xml)) !== null) {
    const chunk = m[1];
    items.push({
      title:       extractTag(chunk, "title"),
      link:        extractTag(chunk, "link"),
      pubDate:     extractTag(chunk, "pubDate"),
      description: extractTag(chunk, "description"),
    });
  }
  return items;
}

async function main() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  アメブロ → お知らせ インポート");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("RSS:", RSS_URL);

  const res = await fetch(RSS_URL);
  if (!res.ok) throw new Error(`RSS 取得失敗: HTTP ${res.status}`);

  const xml = await res.text();
  const items = parseItems(xml);
  console.log(`取得件数: ${items.length} 件\n`);

  let imported = 0;
  let skipped  = 0;

  for (const item of items) {
    if (!item.title) { skipped++; continue; }

    const pubDate = new Date(item.pubDate);
    if (isNaN(pubDate.getTime())) {
      console.warn(`  ⚠ 日付が不正: ${item.pubDate}`);
      skipped++;
      continue;
    }

    // 重複チェック
    const exists = await prisma.newsItem.findFirst({ where: { title: item.title } });
    if (exists) {
      console.log(`  スキップ (重複): ${item.title}`);
      skipped++;
      continue;
    }

    const body = item.description ? stripHtml(item.description).slice(0, 800) : null;

    await prisma.newsItem.create({
      data: {
        title:       item.title,
        category:    "お知らせ",
        body:        body,
        publishedAt: pubDate,
        isPublished: true,
        sortOrder:   0,
      },
    });

    console.log(`  ✓ 登録: ${item.title.slice(0, 50)}`);
    imported++;
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  登録完了: ${imported} 件 / スキップ: ${skipped} 件`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
