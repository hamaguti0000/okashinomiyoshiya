import Link from "next/link";
import Image from "next/image";
import type { NewsItem } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";


const categoryStyle: Record<NewsItem["category"], string> = {
  新商品:   "bg-forest-50  text-forest-500 border-forest-200",
  お知らせ: "bg-milk-100   text-caramel-500 border-caramel-200",
  イベント: "bg-sakura-50  text-sakura-400  border-sakura-200",
  休業案内: "bg-caramel-100 text-caramel-500 border-caramel-200",
};

type Props = {
  newsItems: NewsItem[];
};

export default function NewsSection({ newsItems }: Props) {
  const recent = newsItems.slice(0, 3);

  return (
    <section id="news" className="bg-milk-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <ScrollReveal>
          <SectionTitle en="News" ja="お知らせ" />
        </ScrollReveal>

        {recent.length === 0 ? (
          <ScrollReveal>
            <div className="rounded-2xl border border-sakura-100 bg-white py-16 text-center text-caramel-400">
              <p className="text-sm">現在お知らせはありません</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recent.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.08}>
                <Link
                  href={`/news/${item.id}`}
                  className="group bg-white rounded-2xl border border-sakura-100 overflow-hidden hover:border-sakura-200 hover:shadow-md hover:shadow-sakura-50/80 transition-all duration-200 h-full flex flex-col"
                >
                  {item.image && (
                    <div className="relative aspect-[4/3] bg-milk-100 overflow-hidden">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-3 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <time className="text-xs text-caramel-300 tracking-wide shrink-0 tabular-nums">
                        {item.date}
                      </time>
                      <span className={`text-[10px] tracking-wider border px-2.5 py-0.5 rounded-full shrink-0 ${categoryStyle[item.category]}`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-caramel-600 leading-relaxed flex-1">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-sakura-400 group-hover:text-sakura-300 transition-colors">
                      続きを読む →
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-sakura-400 hover:text-sakura-300 border-b border-sakura-200 hover:border-sakura-300 pb-0.5 transition-colors"
            >
              すべてのお知らせを見る →
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
