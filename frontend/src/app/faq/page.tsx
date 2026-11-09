import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SectionTitle from "@/components/SectionTitle";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "よくある質問｜予約方法・価格・営業時間・配達エリア",
  description:
    "お菓子のみよしやへのよくある質問。ケーキ予約は3日前まで・水まんじゅうは夏季限定・高来町〜小長井町は配達可・営業時間は月〜土9:00〜18:30。電話：0957-32-2372。",
  keywords: [
    "お菓子のみよしや よくある質問",
    "ケーキ 予約 諫早",
    "水まんじゅう いつ 販売",
    "高来町 お菓子屋 配達",
    "諫早市 お菓子屋 営業時間",
    "お菓子のみよしや 電話",
    "高来町 ケーキ 予約 何日前",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/faq`,
    title: "よくある質問｜予約方法・価格・営業時間・配達エリア",
    description:
      "お菓子のみよしやへのよくある質問。ケーキ予約は3日前まで・水まんじゅうは夏季限定・高来町〜小長井町は配達可・営業時間は月〜土9:00〜18:30。電話：0957-32-2372。",
  },
};

const staticFaqs = [
  {
    category: "予約・注文",
    items: [
      {
        question: "ケーキの予約は何日前までに必要ですか？",
        answer: "バースデーケーキやクリスマスケーキは、3日前を目安にお電話ください。時期によっては早めにご連絡いただけると確実です。お気軽にご相談ください。",
      },
      {
        question: "まんじゅうやお菓子の取り置きはできますか？",
        answer: "はい、お電話でご連絡いただければ取り置きいたします。数量限定の商品（水まんじゅうなど）は特に、来店前のお電話確認をおすすめします。",
      },
      {
        question: "法事・慶事のお菓子も注文できますか？",
        answer: "はい、承っております。まんじゅう一個からでもご相談いただけます。結婚式、法事、お宮参り、ひな祭りなど、大切な節目のご注文をお電話でご相談ください。",
      },
      {
        question: "電話以外で注文・予約する方法はありますか？",
        answer: "現在はお電話（0957-32-2372）のみご対応しております。ご不便をおかけしますが、お気軽にお電話ください。",
      },
    ],
  },
  {
    category: "商品・販売",
    items: [
      {
        question: "水まんじゅうはいつ買えますか？",
        answer: "主に夏季（6月〜9月頃）の販売です。数量限定のため品切れになる場合があります。来店前にお電話でご確認いただくことをおすすめします。",
      },
      {
        question: "丸ぼうろや栗どらは通年買えますか？",
        answer: "はい、蜂蜜丸ぼうろと栗どらは通年販売しております。お気軽にご来店ください。",
      },
      {
        question: "桃カステラはいつ買えますか？",
        answer: "桃カステラは出産祝い・お宮参り・ひな祭りなど、季節や行事に合わせてご用意しております。ご注文はお電話でご相談ください。",
      },
      {
        question: "お菓子の価格を教えてください。",
        answer: "水まんじゅうは6個入り1,000円（税込）です。その他の商品は店頭にてご確認ください。詳しくはお電話でもお答えします。",
      },
    ],
  },
  {
    category: "配達・アクセス",
    items: [
      {
        question: "配達はしていますか？",
        answer: "高来町・小長井町へのご自宅配達を承っております。その他のエリアについてもお気軽にご相談ください。",
      },
      {
        question: "駐車場はありますか？",
        answer: "はい、店舗前に5台分の駐車スペースがあります。車でお越しの方もご安心ください。",
      },
      {
        question: "車椅子での来店はできますか？",
        answer: "はい、バリアフリー対応しております。車椅子でお越しいただけます。",
      },
      {
        question: "最寄り駅からどのくらいかかりますか？",
        answer: "JR長崎本線 湯江駅より徒歩3〜5分です。国道207号線沿い、エレナ高来店の斜め前にあります。",
      },
    ],
  },
  {
    category: "天然水・水汲み場",
    items: [
      {
        question: "水汲み場はいつでも使えますか？",
        answer: "はい、24時間・無料でどなたでもご利用いただけます。地下80メートルから汲み上げた天然水です。",
      },
      {
        question: "水汲み場の場所はどこですか？",
        answer: "店舗敷地内にございます。〒859-0132 長崎県諫早市高来町三部壱288-8。国道207号線沿いです。",
      },
    ],
  },
  {
    category: "営業・店舗",
    items: [
      {
        question: "営業時間を教えてください。",
        answer: "月曜〜土曜 9:00〜18:30、日曜・祝日 9:00〜16:30です。基本的に元日のみ定休日です。",
      },
      {
        question: "定休日はありますか？",
        answer: "基本的に元日のみ定休です。それ以外は年中無休で営業しておりますが、不定休の場合もございます。ご来店前にお電話でご確認ください。",
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ケーキの予約は何日前までに必要ですか？",
      acceptedAnswer: { "@type": "Answer", text: "バースデーケーキやクリスマスケーキは、3日前を目安にお電話ください。お気軽にご相談ください。電話：0957-32-2372" },
    },
    {
      "@type": "Question",
      name: "水まんじゅうはいつ買えますか？",
      acceptedAnswer: { "@type": "Answer", text: "主に夏季（6月〜9月頃）の販売です。数量限定のため来店前にお電話でご確認ください。" },
    },
    {
      "@type": "Question",
      name: "営業時間を教えてください。",
      acceptedAnswer: { "@type": "Answer", text: "月曜〜土曜 9:00〜18:30、日曜・祝日 9:00〜16:30です。基本的に元日のみ定休日です。" },
    },
    {
      "@type": "Question",
      name: "配達はしていますか？",
      acceptedAnswer: { "@type": "Answer", text: "高来町・小長井町へのご自宅配達を承っております。その他のエリアもご相談ください。" },
    },
    {
      "@type": "Question",
      name: "駐車場はありますか？",
      acceptedAnswer: { "@type": "Answer", text: "店舗前に5台分の駐車スペースがあります。" },
    },
    {
      "@type": "Question",
      name: "法事・慶事のお菓子も注文できますか？",
      acceptedAnswer: { "@type": "Answer", text: "はい、まんじゅう一個からでも承ります。電話：0957-32-2372" },
    },
  ],
};

export default async function FaqPage() {
  // DBからFAQを取得（管理画面で追加したもの）
  let dbFaqs: { id: string; question: string; answer: string; category: string }[] = [];
  try {
    dbFaqs = await prisma.faq.findMany({
      where: { isPublished: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
  } catch {
    // FAQテーブルがまだ存在しない場合はスキップ
  }

  // DBのFAQをカテゴリでグループ化
  const dbFaqsByCategory = dbFaqs.reduce<Record<string, typeof dbFaqs>>((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const allCategories = [
    ...staticFaqs,
    ...Object.entries(dbFaqsByCategory).map(([category, items]) => ({ category, items })),
  ];

  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ページヒーロー */}
      <div className="bg-gradient-to-br from-sakura-50 to-milk-100 py-16 px-6 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sakura-100/30 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "よくある質問" }]} />
          <p className="text-[11px] tracking-[0.4em] text-sakura-300 uppercase mb-3">FAQ</p>
          <h1
            className="text-3xl md:text-4xl text-caramel-700"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            よくある質問
          </h1>
          <p className="mt-3 text-sm text-caramel-400 leading-loose max-w-xl">
            ご予約・商品・配達・水汲み場・営業時間についてよくいただくご質問をまとめました。
            解決しない場合はお電話でお気軽にどうぞ。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 space-y-12">

        {allCategories.map(({ category, items }) => (
          <div key={category}>
            <SectionTitle en={category} ja={category} align="left" />
            <div className="space-y-3">
              {items.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-sakura-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none hover:bg-milk-50 transition-colors">
                    <span
                      className="text-sm text-caramel-700 leading-snug"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Q. {faq.question}
                    </span>
                    <span className="shrink-0 w-6 h-6 rounded-full border border-sakura-200 flex items-center justify-center text-sakura-300 text-sm transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 border-t border-sakura-50">
                    <p className="text-sm text-caramel-500 leading-loose pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-caramel-600 rounded-2xl p-8 text-center">
          <p
            className="text-lg text-milk-50 mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            解決しない場合はお電話ください
          </p>
          <p className="text-sm text-caramel-200 mb-6">
            月〜土 9:00〜18:30 ／ 日祝 9:00〜16:30
          </p>
          <a
            href="tel:0957-32-2372"
            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-milk-50 px-8 py-3.5 text-caramel-600 text-sm font-medium transition-colors"
          >
            ☎ 0957-32-2372
          </a>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-sakura-400 hover:text-sakura-300 border-b border-sakura-200 hover:border-sakura-300 pb-0.5 transition-colors"
          >
            ← トップページへ戻る
          </Link>
        </div>

      </div>
    </main>
  );
}
