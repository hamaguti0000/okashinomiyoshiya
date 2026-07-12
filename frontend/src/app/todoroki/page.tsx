import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const metadata: Metadata = {
  title: "轟渓流のお土産・立ち寄りスポット | お菓子のみよしや",
  description:
    "環境省「名水百選」轟渓流のすぐそば、高来町で昭和10年から続くお菓子屋です。地下80mの天然水で作る「轟名水 水まんじゅう」や蜂蜜丸ぼうろをお土産にどうぞ。",
  keywords: [
    "轟渓流 お土産",
    "轟渓流 お菓子",
    "高来町 観光 お土産",
    "名水百選 お土産",
    "轟の滝 お土産",
    "長崎 名水 お菓子",
    "諫早市 観光 お菓子",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/todoroki`,
    title: "轟渓流のお土産・立ち寄りスポット | お菓子のみよしや",
    description:
      "名水百選・轟渓流のそばで90年。地下80mの天然水で作る水まんじゅうをお土産に。",
  },
};

const products = [
  {
    image: { src: "/photos/water-manju.webp", alt: "轟名水 水まんじゅう" },
    name: "轟名水 水まんじゅう",
    note: "数量限定",
    desc: "地下80mの天然水を使った看板商品。プルンとした生地となめらかなこし餡。轟渓流の名を冠した、高来町ならではのお菓子です。",
    season: "夏季を中心に販売",
    href: "/products/water-manju",
  },
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20260107/14/okashinomiyoshiya/16/b7/j/o0810108015738453133.jpg?caw=800",
      alt: "お菓子のみよしやの蜂蜜 丸ぼうろ",
    },
    name: "蜂蜜 丸ぼうろ",
    note: null,
    desc: "長崎の伝統菓子を30年かけて改良。柔らかくしっとりした食感が特長です。常温で日持ちするため、お土産に最適です。",
    season: "通年",
    href: "/products/marubolo",
  },
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20171003/11/okashinomiyoshiya/4c/bc/j/o0960072014040690027.jpg?caw=800",
      alt: "お菓子のみよしやの栗どら",
    },
    name: "栗どら",
    note: null,
    desc: "大きな栗が丸ごと入ったどら焼き。しっとり生地・ゆたかなあんこ・ごろりとした栗の三つの味わい。",
    season: "通年",
    href: "/products/kuri-dora",
  },
];

export default function TodorokiPage() {
  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">

      {/* ヒーロー */}
      <div className="bg-gradient-to-br from-forest-700 to-forest-600 py-20 px-6 mb-0 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #d5ecf3 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <nav aria-label="パンくずリスト" className="flex items-center gap-2 flex-wrap text-xs text-milk-200/60 mb-6">
            <Link href="/" className="hover:text-milk-100 transition-colors">トップ</Link>
            <span>/</span>
            <span className="text-milk-100">轟渓流からお越しの方へ</span>
          </nav>
          <p className="text-[11px] tracking-[0.4em] text-stream-300/70 uppercase mb-4">
            Todoroki Keiryu · Nagasaki
          </p>
          <h1
            className="text-3xl md:text-5xl text-milk-50 leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            轟渓流のお帰りに、<br />
            ぜひ立ち寄ってください。
          </h1>
          <p className="text-base text-milk-200/80 leading-loose max-w-2xl mb-8">
            環境省「名水百選」に選ばれた轟渓流と同じ高来町で、昭和10年から続くお菓子屋です。
            地下80mから汲み上げた天然水を使ったお菓子を、観光のお土産にどうぞ。
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:0957-32-2372"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 px-6 py-3 text-sm text-milk-50 transition-colors"
            >
              ☎ 0957-32-2372
            </a>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-stream-400/20 hover:bg-stream-400/30 border border-stream-300/30 px-6 py-3 text-sm text-stream-100 transition-colors"
            >
              商品を見る
            </Link>
          </div>
        </div>
      </div>

      {/* 轟渓流について */}
      <div className="bg-forest-600 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-[11px] tracking-[0.4em] text-stream-300/60 uppercase">About Todoroki</p>
              <h2
                className="text-2xl text-milk-50 leading-relaxed"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                轟渓流とは
              </h2>
              <div className="w-8 h-px bg-stream-400/50" />
              <p className="text-sm text-milk-200/80 leading-loose">
                長崎県諫早市高来町にある轟渓流（とどろきけいりゅう）は、
                環境省「名水百選」に選定された清流です。
                大小30余りの滝が連なり、県下有数の清流として知られています。
              </p>
              <p className="text-sm text-milk-200/80 leading-loose">
                緑豊かな渓谷と清らかな水音が魅力の自然スポットで、
                長崎県内外から多くの観光客が訪れます。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 content-start">
              {[
                "環境省「名水百選」認定",
                "大小30余りの滝が連なる",
                "当店と同じ高来町",
                "四季で楽しめる渓谷美",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-stream-200/90 border border-stream-400/30 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 天然水のつながり */}
      <div className="bg-forest-700 px-6 py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <p className="text-[11px] tracking-[0.4em] text-stream-300/60 uppercase mb-4">Water Connection</p>
            <h2
              className="text-xl md:text-2xl text-milk-50 mb-6 leading-relaxed"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              「轟名水 水まんじゅう」—<br className="sm:hidden" />
              名前に込めた、高来町への想い
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-milk-200/80 leading-loose">
              <p>
                当店では、地下80メートルから汲み上げた天然水をお菓子づくりに使用しています。
                この地・高来町の恵みを菓子に込めたいという想いから、
                「<strong className="text-stream-200">轟名水 水まんじゅう</strong>」と名付けました。
              </p>
              <p>
                また店舗には、地域の方々にもご利用いただける
                <strong className="text-stream-200">天然水の水汲み場</strong>を設けております。
                24時間・無料でどなたでもお使いいただけます。
                轟渓流の帰り道にぜひお立ち寄りください。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["地下80m天然水", "水汲み場 24時間無料", "轟渓流と同じ高来町"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-stream-200/90 border border-stream-400/30 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* お土産おすすめ */}
      <div className="bg-milk-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            en="Souvenirs"
            ja="おすすめのお土産"
            sub="軽くて日持ちがするものを中心にご用意しています。電話でのお取り置きも承ります"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {products.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group bg-white rounded-2xl border border-sakura-100 p-7 hover:shadow-lg hover:shadow-sakura-50/80 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-sakura-50 bg-milk-100">
                    <Image src={p.image.src} alt={p.image.alt} fill className="object-cover" sizes="56px" quality={75} />
                  </div>
                  {p.note && (
                    <span className="text-[10px] text-sakura-400 bg-sakura-50 border border-sakura-100 px-2.5 py-0.5 rounded-full">
                      {p.note}
                    </span>
                  )}
                </div>
                <div>
                  <h3
                    className="text-base text-caramel-700 mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[10px] text-caramel-300 tracking-wide">{p.season}</p>
                </div>
                <p className="text-xs text-caramel-500 leading-relaxed flex-1">{p.desc}</p>
                <p className="text-[11px] text-sakura-400 group-hover:text-sakura-300 transition-colors">
                  詳しく見る →
                </p>
              </Link>
            ))}
          </div>
          <div className="bg-sakura-50 rounded-2xl border border-sakura-100 p-6 text-sm text-caramel-500 leading-relaxed space-y-1">
            <p>※ 水まんじゅうは数量限定です。来店前にお電話でご確認ください。</p>
            <p>※ 贈り物・詰め合わせのご相談もお電話で承ります。</p>
          </div>
        </div>
      </div>

      {/* アクセス */}
      <div className="bg-sakura-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            en="Access"
            ja="店舗へのアクセス"
            sub="轟渓流と同じ高来町にあります"
          />
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl border border-sakura-100 p-8 space-y-5">
              {[
                { label: "住所", content: "〒859-0132 長崎県諫早市高来町三部壱288-8" },
                { label: "電話番号", content: "0957-32-2372" },
                { label: "営業時間", content: "月〜土 9:00〜18:30 ／ 日祝 9:00〜16:30" },
                { label: "定休日", content: "基本的に元日のみ" },
                { label: "駐車場", content: "店舗前に5台分あり" },
              ].map((item) => (
                <div key={item.label} className="flex gap-6 border-b border-sakura-50 pb-4 last:border-0 last:pb-0">
                  <dt className="text-[10px] tracking-[0.25em] text-sakura-300 uppercase w-20 shrink-0 pt-0.5">{item.label}</dt>
                  <dd
                    className="text-sm text-caramel-600 leading-relaxed"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.label === "電話番号" ? (
                      <a href="tel:0957-32-2372" className="hover:text-sakura-400 transition-colors">
                        {item.content}
                      </a>
                    ) : item.content}
                  </dd>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border border-sakura-100 shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=%E9%95%B7%E5%B4%8E%E7%9C%8C%E8%AB%AB%E6%97%A9%E5%B8%82%E9%AB%98%E6%9D%A5%E7%94%BA%E4%B8%89%E9%83%A8%E5%A3%B1288-8&hl=ja&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="お菓子のみよしやの地図"
                className="block"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:0957-32-2372"
              className="inline-flex items-center gap-2 rounded-full bg-caramel-600 hover:bg-caramel-500 px-6 py-3 text-sm text-white transition-colors"
            >
              ☎ 電話でお問い合わせ
            </a>
            <a
              href="https://maps.google.com/?q=お菓子のみよしや+長崎県諫早市高来町三部壱288-8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sakura-200 bg-white px-6 py-3 text-sm text-caramel-600 hover:border-sakura-300 transition-colors"
            >
              Google マップで開く →
            </a>
          </div>
        </div>
      </div>

    </main>
  );
}
