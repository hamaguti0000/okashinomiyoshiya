import Image from "next/image";
import type { SitePhoto } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

type Props = {
  sitePhotos: SitePhoto[];
};

export default function PhotoSection({ sitePhotos }: Props) {
  return (
    <section className="bg-milk-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            en="Photos"
            ja="外観・店舗・商品写真"
            sub="公式ページや番組掲載写真から、来店前に見ておきたいものをまとめました"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sitePhotos.map((photo, i) => (
            <ScrollReveal key={photo.src} delay={i * 0.08}>
              <article className={`group bg-white rounded-2xl border border-sakura-100 overflow-hidden h-full hover:shadow-lg hover:shadow-sakura-50/80 hover:-translate-y-1 transition-all duration-300 ${i === 0 ? "lg:col-span-2" : ""}`}>
                <div className={`relative ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"} bg-milk-100 overflow-hidden`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3
                    className="text-sm text-caramel-700"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {photo.title}
                  </h3>
                  <p className="text-xs text-caramel-500 leading-relaxed">{photo.body}</p>
                  <a
                    href={photo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-[10px] text-sakura-400 hover:text-sakura-300 border-b border-sakura-100 hover:border-sakura-300 pb-px transition-colors"
                  >
                    出典: {photo.sourceLabel}
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
