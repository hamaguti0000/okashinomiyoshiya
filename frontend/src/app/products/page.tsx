import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedProducts } from "@/lib/cms";
import { productCategories } from "@/lib/product-categories";
import ProductCategoryCard from "@/components/ProductCategoryCard";
import Breadcrumb from "@/components/Breadcrumb";
import { lineStampBenefit, lineUrl, phoneHref } from "@/lib/contact";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const metadata: Metadata = {
  title: "商品・価格一覧｜水まんじゅう・丸ぼうろ・栗どら・ケーキ",
  description: "水まんじゅう1,000円・蜂蜜丸ぼうろ70円・栗どら200円・ケーキ予約承り中。長崎県諫早市高来町「お菓子のみよしや」の和菓子・洋菓子・ケーキをカテゴリ別にご紹介します。",
  openGraph: {
    type: "website",
    url: `${BASE_URL}/products`,
    title: "商品・価格一覧｜水まんじゅう・丸ぼうろ・栗どら・ケーキ",
    description: "水まんじゅう1,000円・蜂蜜丸ぼうろ70円・栗どら200円・ケーキ予約承り中。長崎県諫早市高来町「お菓子のみよしや」の和菓子・洋菓子・ケーキをカテゴリ別にご紹介します。",
  },
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">
      <div className="bg-gradient-to-br from-sakura-50 to-milk-100 py-16 px-6 mb-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "商品カテゴリ" }]} />
          <p className="text-[11px] tracking-[0.4em] text-sakura-300 uppercase mb-3">Products</p>
          <h1
            className="text-3xl md:text-4xl text-caramel-700"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            商品カテゴリ
          </h1>
          <p className="mt-3 text-sm text-caramel-400 leading-loose max-w-2xl">
            和菓子・洋菓子・ケーキのカテゴリごとに、代表商品を3つずつご紹介します。すべての商品をまとめて見たい場合は全商品一覧へどうぞ。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {productCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/category/${category.slug}`}
                className="rounded-full border border-sakura-200 bg-white/80 px-5 py-2.5 text-sm text-caramel-600 hover:bg-white hover:border-sakura-300 transition-colors"
              >
                {category.label}
              </Link>
            ))}
            <Link
              href="/products/all"
              className="rounded-full bg-caramel-600 px-5 py-2.5 text-sm text-white hover:bg-caramel-500 transition-colors"
            >
              全商品一覧
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {productCategories.map((category) => (
          <ProductCategoryCard
            key={category.slug}
            category={category}
            products={products.filter((product) => product.category === category.label)}
          />
        ))}

        <div className="bg-white rounded-2xl border border-sakura-100 p-6 text-sm text-caramel-500 leading-relaxed space-y-2">
          <p>※ 数量限定・季節商品は品切れの場合がございます。ご来店前にお電話にてご確認ください。</p>
          <p>※ 結婚式・法事のお菓子、ケーキのご注文も承っております。</p>
          <p>
            ※ ご注文・お問い合わせ：
            <a href={phoneHref} className="text-sakura-400 hover:text-sakura-300 font-medium ml-1">
              0957-32-2372
            </a>
          </p>
          <p>
            ※ 公式LINEでもお問い合わせいただけます：
            <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="text-forest-500 hover:text-forest-400 font-medium ml-1">
              友だち追加・相談
            </a>
          </p>
          <p>※ 公式LINEスタンプカード：{lineStampBenefit}</p>
        </div>
      </div>
    </main>
  );
}
