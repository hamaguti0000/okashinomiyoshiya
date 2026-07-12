import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";
import type { SitePhoto } from "@/lib/data";

const hours = [
  { day: "月曜〜土曜", time: "9:00 〜 18:30" },
  { day: "日曜・祝日", time: "9:00 〜 16:30" },
  { day: "定休日",     time: "基本的に元日のみ" },
];

type Props = {
  exteriorPhoto?: SitePhoto;
};

export default function AccessSection({ exteriorPhoto }: Props) {
  const photo = exteriorPhoto ?? {
    src: "/photos/tv-exterior.webp",
    alt: "国道207号線沿いのお菓子のみよしや外観",
    sourceLabel: "長崎国際テレビ",
    sourceUrl: "https://www.nib.jp/tv/hirujige/hirujige_backnumber/hirujige_1755856742344413",
  };

  return (
    <section id="access" className="bg-sakura-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <ScrollReveal>
          <SectionTitle en="Access" ja="店舗情報・アクセス" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Exterior photo */}
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden border border-sakura-100 shadow-sm bg-white">
              <div className="relative aspect-[4/3] bg-milk-100 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-sm text-caramel-600" style={{ fontFamily: "var(--font-heading)" }}>
                    国道207号線沿いの店舗外観
                  </p>
                  <p className="text-xs text-caramel-400 mt-1">店舗前に駐車場5台分があります</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=お菓子のみよしや+長崎県諫早市高来町三部壱288-8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sakura-400 hover:text-sakura-300 bg-sakura-50 border border-sakura-200 hover:border-sakura-300 px-4 py-2 rounded-full transition-colors"
                  >
                    Google マップで開く →
                  </a>
                  <a
                    href={photo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-caramel-400 hover:text-caramel-600 border-b border-caramel-100 hover:border-caramel-300 pb-px transition-colors"
                  >
                    写真出典: {photo.sourceLabel}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="bg-white rounded-2xl border border-sakura-100 p-8 space-y-6">

              {[
                {
                  label: "住所",
                  content: (
                    <address className="not-italic text-sm text-caramel-600 leading-loose"
                      style={{ fontFamily: "var(--font-heading)" }}>
                      〒859-0132<br />長崎県諫早市高来町三部壱288-8
                    </address>
                  ),
                },
                {
                  label: "電話番号",
                  content: (
                    <a href="tel:0957-32-2372"
                      className="text-xl text-caramel-700 hover:text-sakura-400 transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}>
                      0957-32-2372
                    </a>
                  ),
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] tracking-[0.3em] text-sakura-300 uppercase mb-1.5">{item.label}</p>
                  {item.content}
                </div>
              ))}

              <div className="h-px bg-sakura-50" />

              <div>
                <p className="text-[10px] tracking-[0.3em] text-sakura-300 uppercase mb-3">営業時間</p>
                <dl className="space-y-1.5">
                  {hours.map((h) => (
                    <div key={h.day} className="flex gap-4 text-sm">
                      <dt className="text-caramel-400 w-24 shrink-0">{h.day}</dt>
                      <dd className="text-caramel-600" style={{ fontFamily: "var(--font-heading)" }}>
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="h-px bg-sakura-50" />

              <div>
                <p className="text-[10px] tracking-[0.3em] text-sakura-300 uppercase mb-3">アクセス</p>
                <ul className="space-y-2">
                  {[
                    { icon: "🚃", text: "JR長崎本線 湯江駅より徒歩3〜5分" },
                    { icon: "🚗", text: "国道207号線沿い（エレナ高来店 斜め前）" },
                    { icon: "🅿️", text: "駐車場5台分あり" },
                    { icon: "♿", text: "バリアフリー対応（車椅子でご来店いただけます）" },
                    { icon: "💧", text: "地下80mの天然水を汲める水汲み場あり（24時間無料）" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-2.5 text-xs text-caramel-500">
                      <span className="shrink-0 mt-0.5">{item.icon}</span>
                      <span className="leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </ScrollReveal>

        </div>

        {/* Google マップ埋め込み */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8 rounded-2xl overflow-hidden border border-sakura-100 shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=%E9%95%B7%E5%B4%8E%E7%9C%8C%E8%AB%AB%E6%97%A9%E5%B8%82%E9%AB%98%E6%9D%A5%E7%94%BA%E4%B8%89%E9%83%A8%E5%A3%B1288-8&hl=ja&z=17&output=embed"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="お菓子のみよしやの地図"
              className="block"
            />
          </div>
          <p className="mt-2 text-right">
            <a
              href="https://maps.google.com/?q=お菓子のみよしや+長崎県諫早市高来町三部壱288-8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-caramel-400 hover:text-sakura-400 transition-colors"
            >
              Google マップで開く →
            </a>
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
