import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import Breadcrumb from "@/components/Breadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const metadata: Metadata = {
  title: "昭和10年創業のこだわり｜お店について",
  description: "1935年（昭和10年）創業。長崎県諫早市高来町で90年続く手作り和洋菓子店「みよしや」のこだわりと歴史。地下80m天然水を使ったお菓子づくり・地域に根ざした営業スタイルをご紹介します。",
  openGraph: {
    type: "website",
    url: `${BASE_URL}/about`,
    title: "昭和10年創業のこだわり｜お店について",
    description: "1935年（昭和10年）創業。長崎県諫早市高来町で90年続く手作り和洋菓子店「みよしや」のこだわりと歴史。地下80m天然水を使ったお菓子づくり・地域に根ざした営業スタイルをご紹介します。",
  },
};

const values = [
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20241222/21/okashinomiyoshiya/d1/85/j/o0810108015524465651.jpg?caw=800",
      alt: "地元でとれたいちご",
    },
    title: "安心・安全な素材",
    body: "使用する素材と製法を大切にし、安心して召し上がっていただけるお菓子を作ります。シンプルな素材で丁寧に作ることが、みよしやの出発点です。",
  },
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20230913/23/okashinomiyoshiya/f1/ed/j/o0810108015337743181.jpg?caw=800",
      alt: "焼き上がったマドレーヌ",
    },
    title: "基本に忠実な手作り",
    body: "奇をてらわず、お菓子づくりの基本に丁寧に向き合い続けることを大切にしています。30年間改良を重ねてきた丸ぼうろにも、その姿勢が表れています。",
  },
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20241123/20/okashinomiyoshiya/ba/c8/j/o0810108015513435366.jpg?caw=800",
      alt: "ケーキ作りの会の様子",
    },
    title: "皆さんの笑顔のために",
    body: "食べてくださる方の顔がほころぶ瞬間を思い浮かべながら、毎日お菓子を作っています。それがみよしやのお菓子づくりの原点です。",
  },
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20251124/16/okashinomiyoshiya/58/71/j/o0810108015722731833.jpg?caw=800",
      alt: "地域のケーキ作りの会に参加する皆さん",
    },
    title: "地域に根ざしたお店",
    body: "高来町・小長井町への宅配、毎年恒例のケーキ教室、地元中学生の職場体験受け入れなど、地域のくらしに寄り添い続けています。",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">

      {/* Page hero */}
      <div className="bg-gradient-to-br from-sakura-50 to-milk-100 py-16 px-6 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sakura-100/30 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "お店について" }]} />
          <p className="text-[11px] tracking-[0.4em] text-sakura-300 uppercase mb-3">About</p>
          <h1
            className="text-3xl md:text-4xl text-caramel-700"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            お店について
          </h1>
          <p className="mt-3 text-sm text-caramel-400 max-w-xl leading-loose">
            安心安全なお菓子を第一に、基本に忠実なお菓子づくりで皆さんを笑顔にしたい。
            長年、高来町の地域に根ざしてきた和洋菓子店です。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-16">

        {/* Concept quote */}
        <div className="bg-white rounded-2xl border border-sakura-100 p-10 text-center">
          <p className="text-[11px] tracking-[0.4em] text-sakura-300 uppercase mb-4">Our Concept</p>
          <blockquote
            className="text-xl md:text-2xl text-caramel-600 leading-relaxed"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            「安心安全なお菓子を第一に、
            <br className="hidden md:block" />
            基本に忠実なお菓子づくりで
            <br className="hidden md:block" />
            皆さんを笑顔にしたい。」
          </blockquote>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-8 h-px bg-sakura-200" />
            <span className="text-sakura-300 text-xs">✦</span>
            <div className="w-8 h-px bg-sakura-200" />
          </div>
        </div>

        {/* Values */}
        <div>
          <SectionTitle en="Values" ja="みよしやのこだわり" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-sakura-100 p-7 flex gap-5 hover:shadow-lg hover:shadow-sakura-50/80 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-milk-100">
                  <Image
                    src={v.image.src}
                    alt={v.image.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                    quality={75}
                  />
                </div>
                <div>
                  <h3
                    className="text-base text-caramel-700 mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-xs text-caramel-500 leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <SectionTitle en="History" ja="みよしやの歩み" align="left" />
          <div className="relative border-l-2 border-sakura-100 ml-4 space-y-8 pb-2">
            {[
              {
                year: "昭和10年（1935年）",
                title: "創業",
                body: "長崎県諫早市高来町で、地域に根ざしたお菓子屋として創業しました。",
              },
              {
                year: "創業以来 約30年",
                title: "蜂蜜丸ぼうろの研究・改良",
                body: "長崎の伝統菓子・丸ぼうろを、素材と焼き加減にこだわりながら30年以上かけて改良。柔らかくしっとりした食感に仕上げました。",
              },
              {
                year: "地下80mの天然水",
                title: "「轟名水 水まんじゅう」誕生",
                body: "地下80メートルから汲み上げた天然水をお菓子づくりに採用。この地・高来町への想いを込め「轟名水」と名付けました。",
              },
              {
                year: "地域への貢献",
                title: "水汲み場の開放・地域活動",
                body: "天然水を24時間無料で地域の方々に開放。高来町・小長井町への宅配、毎年恒例のケーキ教室、地元中学生の職場体験受け入れなども続けています。",
              },
              {
                year: "現在（創業約90年）",
                title: "長崎国際テレビにも紹介",
                body: "地域に愛されるお菓子屋として、地元メディアにも取り上げていただいています。昭和10年の創業から変わらず、高来町で皆さんの笑顔のためにお菓子を作り続けています。",
              },
            ].map((item) => (
              <div key={item.title} className="relative pl-8">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-sakura-200 border-2 border-white shadow-sm" />
                <p className="text-[10px] tracking-[0.25em] text-sakura-300 uppercase mb-1">{item.year}</p>
                <h3
                  className="text-base text-caramel-700 mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-caramel-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Water feature */}
        <div className="bg-forest-700 rounded-2xl p-10 text-milk-100">
          <p className="text-[11px] tracking-[0.4em] text-stream-300/70 uppercase mb-3">Natural Water</p>
          <h2
            className="text-xl text-milk-50 mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            地下80メートルの天然水
          </h2>
          <p className="text-sm text-milk-200/80 leading-loose mb-4">
            店舗では地下80メートルから汲み上げた天然水をお菓子づくりに使用しています。
            「轟名水 水まんじゅう」という商品名には、この地・高来町への想いが込められています。
          </p>
          <p className="text-sm text-milk-200/80 leading-loose mb-6">
            当店では、この天然水を地域の皆さまにもご利用いただける「水汲み場」を設けております。
            24時間・無料でお使いいただけます。
          </p>
          <div className="border-t border-white/10 pt-6">
            <p className="text-xs text-milk-300/60 leading-relaxed">
              店舗の近くには、環境省「名水百選」に選定された清流・轟渓流があります。
              轟渓流へお越しの際は、ぜひ当店にもお立ち寄りください。
            </p>
          </div>
        </div>

        {/* Store info */}
        <div className="bg-white rounded-2xl border border-sakura-100 p-8">
          <SectionTitle en="Store Info" ja="店舗情報" align="left" />
          <dl className="space-y-4 text-sm">
            {[
              { dt: "住所",     dd: "〒859-0132 長崎県諫早市高来町三部壱288-8" },
              { dt: "電話",     dd: "0957-32-2372" },
              { dt: "営業時間", dd: "月〜土 9:00〜18:30 ／ 日祝 9:00〜16:30" },
              { dt: "定休日",   dd: "不定休（基本的に元日のみ）" },
              { dt: "アクセス", dd: "JR長崎本線 湯江駅より徒歩3〜5分 / 国道207号線沿い" },
              { dt: "駐車場",   dd: "5台分あり" },
            ].map((item) => (
              <div key={item.dt} className="flex gap-6 border-b border-sakura-50 pb-4 last:border-0 last:pb-0">
                <dt className="text-sakura-400 w-20 shrink-0 text-xs tracking-wide pt-0.5">{item.dt}</dt>
                <dd className="text-caramel-600 leading-relaxed">{item.dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-sakura-300 hover:bg-sakura-400 text-white text-sm font-medium px-8 py-3.5 rounded-full shadow-md shadow-sakura-200/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>🛍</span>
            <span>商品を見る</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
