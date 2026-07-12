import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPublishedNewsItem, getPublishedNews } from "@/lib/cms";
import Breadcrumb from "@/components/Breadcrumb";
import type { NewsItem } from "@/lib/data";
import { lineUrl, phoneHref, phoneNumber } from "@/lib/contact";

type Props = { params: Promise<{ id: string }> };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getPublishedNewsItem(id);
  if (!item) return {};
  return {
    title: `${item.title} | お知らせ | お菓子のみよしや`,
    description: item.body?.slice(0, 120) ?? item.title,
    openGraph: {
      type: "article",
      url: `${BASE_URL}/news/${id}`,
      title: `${item.title} | お知らせ | お菓子のみよしや`,
      description: item.body?.slice(0, 120) ?? item.title,
    },
  };
}

const categoryStyle: Record<NewsItem["category"], string> = {
  新商品:   "bg-forest-50  text-forest-500  border-forest-200",
  お知らせ: "bg-milk-100   text-caramel-500 border-caramel-200",
  イベント: "bg-sakura-50  text-sakura-400  border-sakura-200",
  休業案内: "bg-caramel-100 text-caramel-500 border-caramel-200",
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const [item, allNews] = await Promise.all([
    getPublishedNewsItem(id),
    getPublishedNews(),
  ]);
  if (!item) notFound();

  const related = allNews.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">

      {/* ページヒーロー */}
      <div className="bg-gradient-to-br from-sakura-50 to-milk-100 py-16 px-6 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sakura-100/30 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Breadcrumb items={[
            { label: "トップ", href: "/" },
            { label: "お知らせ", href: "/news" },
            { label: item.title },
          ]} />
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <time className="text-xs text-caramel-300 tracking-wide tabular-nums">
              {item.date}
            </time>
            <span className={`text-[10px] tracking-wider border px-2.5 py-0.5 rounded-full ${categoryStyle[item.category]}`}>
              {item.category}
            </span>
          </div>
          <h1
            className="text-2xl md:text-3xl text-caramel-700 leading-snug"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {item.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">

        {/* 記事本文 */}
        <article className="bg-white rounded-2xl border border-sakura-100 overflow-hidden mb-10">
          {item.image && (
            <div className="relative aspect-[16/9] bg-milk-100 overflow-hidden">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}
          <div className="p-8 md:p-10">
            {item.body ? (
              <p className="text-sm text-caramel-600 leading-loose whitespace-pre-line">
                {item.body}
              </p>
            ) : (
              <p className="text-sm text-caramel-400">本文はありません。</p>
            )}
            {item.image && item.image.sourceUrl && (
              <a
                href={item.image.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-6 text-[10px] text-sakura-400 hover:text-sakura-300 border-b border-sakura-100 hover:border-sakura-300 pb-px transition-colors"
              >
                写真出典: {item.image.sourceLabel}
              </a>
            )}
          </div>
        </article>

        {/* CTA */}
        <div className="bg-sakura-50 rounded-2xl border border-sakura-100 p-6 mb-12 space-y-4">
          <p className="text-sm text-caramel-500">ご予約・お問い合わせはお電話または公式LINEで</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-caramel-600 hover:bg-caramel-500 px-6 py-3 text-sm text-white transition-colors"
            >
              ☎ {phoneNumber}
            </a>
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-forest-500 hover:bg-forest-400 px-6 py-3 text-sm text-white transition-colors"
            >
              LINEで相談
            </a>
          </div>
        </div>

        {/* 関連記事 */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-base text-caramel-600" style={{ fontFamily: "var(--font-heading)" }}>
                その他のお知らせ
              </span>
              <div className="h-px flex-1 bg-sakura-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((n) => (
                <Link
                  key={n.id}
                  href={`/news/${n.id}`}
                  className="group bg-white rounded-2xl border border-sakura-100 p-5 hover:shadow-md hover:border-sakura-200 transition-all duration-200"
                >
                  {n.image && (
                    <div className="relative aspect-[4/3] bg-milk-100 overflow-hidden rounded-xl mb-3">
                      <Image
                        src={n.image.src}
                        alt={n.image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="33vw"
                      />
                    </div>
                  )}
                  <time className="text-[10px] text-caramel-300 tracking-wide">{n.date}</time>
                  <p className="text-xs text-caramel-600 mt-1 leading-relaxed line-clamp-2">{n.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
