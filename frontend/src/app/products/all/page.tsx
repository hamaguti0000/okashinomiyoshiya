import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedProducts } from "@/lib/cms";
import { productCategories } from "@/lib/product-categories";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const metadata: Metadata = {
  title: "全商品・価格一覧｜水まんじゅう・丸ぼうろ・栗どら・桃カステラ",
  description: "諫早市高来町「お菓子のみよしや」の全商品一覧。水まんじゅう1,000円・蜂蜜丸ぼうろ70円・栗どら200円・桃カステラ550円（ひな祭り時期限定）。バースデーケーキ・法事のお菓子もご相談ください。",
  openGraph: {
    type: "website",
    url: `${BASE_URL}/products/all`,
    title: "全商品・価格一覧｜水まんじゅう・丸ぼうろ・栗どら・桃カステラ",
    description: "諫早市高来町「お菓子のみよしや」の全商品一覧。水まんじゅう1,000円・蜂蜜丸ぼうろ70円・栗どら200円・桃カステラ550円（ひな祭り時期限定）。バースデーケーキ・法事のお菓子もご相談ください。",
  },
};

export const dynamic = "force-dynamic";

export default async function AllProductsPage() {
  const products = await getPublishedProducts();

  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">
      <div className="bg-gradient-to-br from-sakura-50 to-milk-100 py-16 px-6 mb-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "商品カテゴリ", href: "/products" }, { label: "全商品一覧" }]} />
          <p className="text-[11px] tracking-[0.4em] text-sakura-300 uppercase mb-3">All Products</p>
          <h1 className="text-3xl md:text-4xl text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>
            全商品一覧
          </h1>
          <p className="mt-3 text-sm text-caramel-400 leading-loose">
            掲載中の商品をまとめてご覧いただけます。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full border border-sakura-200 bg-white/80 px-5 py-2.5 text-sm text-caramel-600 hover:bg-white transition-colors">
              カテゴリ紹介へ
            </Link>
            {productCategories.map((category) => (
              <Link key={category.slug} href={`/products/category/${category.slug}`} className="rounded-full border border-sakura-200 bg-white/80 px-5 py-2.5 text-sm text-caramel-600 hover:bg-white transition-colors">
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
