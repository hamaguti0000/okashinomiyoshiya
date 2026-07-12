import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedNews } from "@/lib/cms";
import type { NewsItem } from "@/lib/data";
import Breadcrumb from "@/components/Breadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const metadata: Metadata = {
  title: "お知らせ・新商品・イベント情報",
  description: "長崎県諫早市高来町「お菓子のみよしや」からの最新情報。水まんじゅう販売開始・ケーキ教室・臨時休業などのお知らせをご確認ください。",
  openGraph: {
    type: "website",
    url: `${BASE_URL}/news`,
    title: "お知らせ・新商品・イベント情報",
    description: "長崎県諫早市高来町「お菓子のみよしや」からの最新情報。水まんじゅう販売開始・ケーキ教室・臨時休業などのお知らせをご確認ください。",
  },
};

export const dynamic = "force-dynamic";

const categoryStyle: Record<NewsItem["category"], string> = {
  新商品:   "bg-forest-50  text-forest-500  border-forest-200",
  お知らせ: "bg-milk-100   text-caramel-500 border-caramel-200",
  イベント: "bg-sakura-50  text-sakura-400  border-sakura-200",
  休業案内: "bg-caramel-100 text-caramel-500 border-caramel-200",
};

export default async function NewsPage() {
  const newsItems = await getPublishedNews();

  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">

      {/* Page hero */}
      <div className="bg-gradient-to-br from-sakura-50 to-milk-100 py-16 px-6 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sakura-100/30 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "お知らせ" }]} />
          <p className="text-[11px] tracking-[0.4em] text-sakura-300 uppercase mb-3">News</p>
          <h1
            className="text-3xl md:text-4xl text-caramel-700"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            お知らせ
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {newsItems.length === 0 && (
          <div className="rounded-2xl border border-sakura-100 bg-white py-20 text-center text-caramel-400 mb-6">
            <p className="text-sm">現在お知らせはありません</p>
          </div>
        )}
      </div>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="group bg-white rounded-2xl border border-sakura-100 overflow-hidden hover:shadow-md hover:shadow-sakura-50/80 hover:border-sakura-200 transition-all duration-200"
          >
            {item.image && (
              <div className="relative aspect-[16/10] bg-milk-100 overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="p-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <time className="text-xs text-caramel-300 tracking-wide tabular-nums">
                  {item.date}
                </time>
                <span className={`text-[10px] tracking-wider border px-2.5 py-0.5 rounded-full ${categoryStyle[item.category]}`}>
                  {item.category}
                </span>
              </div>
              <h2
                className="text-base text-caramel-700 mb-3 leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.title}
              </h2>
              {item.body && (
                <p className="text-sm text-caramel-500 leading-loose line-clamp-3">{item.body}</p>
              )}
              <p className="mt-4 text-[11px] text-sakura-400 group-hover:text-sakura-300 transition-colors">
                続きを読む →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
