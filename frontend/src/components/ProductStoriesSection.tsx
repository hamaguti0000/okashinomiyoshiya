import Image from "next/image";
import Link from "next/link";
import { productStories } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

export default function ProductStoriesSection() {
  return (
    <section id="blog-products" className="bg-milk-50 py-24 px-6 border-y border-caramel-100">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            en="Shop Notes"
            ja="季節と定番のお菓子"
            sub="今の時期に並ぶお菓子や、昔から作り続けている定番を紹介します。"
          />
        </ScrollReveal>

        <div className="space-y-6">
          {productStories.map((story, index) => (
            <ScrollReveal key={story.title} delay={index * 0.08}>
              <article className="group grid md:grid-cols-[320px_minmax(0,1fr)] gap-0 border border-caramel-100 bg-white shadow-sm shadow-caramel-100/40">
                <Link
                  href={`/products/${story.productId}`}
                  className="relative min-h-[260px] overflow-hidden bg-milk-100"
                  aria-label={`${story.title}の商品詳細を見る`}
                >
                  <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 767px) 100vw, 320px"
                  />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-[10px] tracking-[0.15em] text-caramel-500">
                    {story.tag}
                  </span>
                </Link>
                <div className="min-w-0 flex flex-col gap-4 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-caramel-500 border border-caramel-200 px-2.5 py-0.5">
                      {story.category}
                    </span>
                    <span className="text-[10px] text-caramel-400">{story.season}</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>
                      {story.title}
                    </h3>
                    <p className="mt-3 text-sm text-caramel-600 leading-loose">{story.description}</p>
                  </div>
                  <p className="text-sm text-caramel-500 leading-loose flex-1 border-l-2 border-sakura-200 pl-4">{story.detail}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-caramel-100 pt-4">
                    {story.price ? (
                      <span className="text-sm text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>
                        {story.price}
                      </span>
                    ) : (
                      <span className="text-sm text-caramel-400">価格は店頭でご確認ください</span>
                    )}
                    <Link
                      href={`/products/${story.productId}`}
                      className="text-xs text-sakura-400 hover:text-sakura-300 font-medium transition-colors border-b border-sakura-200 pb-0.5"
                    >
                      商品の詳細を見る →
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
