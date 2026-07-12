import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedProducts } from "@/lib/cms";
import { getCategoryBySlug, productCategories } from "@/lib/product-categories";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

type Props = {
  params: Promise<{ category: string }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.label}一覧 | お菓子のみよしや`,
    description: `お菓子のみよしやの${category.label}一覧です。${category.description}`,
    openGraph: {
      type: "website",
      url: `${BASE_URL}/products/category/${slug}`,
      title: `${category.label}一覧 | お菓子のみよしや`,
      description: `お菓子のみよしやの${category.label}一覧です。${category.description}`,
    },
  };
}

export default async function ProductCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = (await getPublishedProducts()).filter((product) => product.category === category.label);

  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">
      <div className="bg-gradient-to-br from-sakura-50 to-milk-100 py-16 px-6 mb-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "商品カテゴリ", href: "/products" }, { label: `${category.label}一覧` }]} />
          <p className="text-[11px] tracking-[0.4em] text-sakura-300 uppercase mb-3">{category.en}</p>
          <h1 className="text-3xl md:text-4xl text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>
            {category.label}一覧
          </h1>
          <p className="mt-3 text-sm text-caramel-400 leading-loose max-w-2xl">{category.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full border border-sakura-200 bg-white/80 px-5 py-2.5 text-sm text-caramel-600 hover:bg-white transition-colors">
              カテゴリ紹介へ
            </Link>
            <Link href="/products/all" className="rounded-full bg-caramel-600 px-5 py-2.5 text-sm text-white hover:bg-caramel-500 transition-colors">
              全商品一覧
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-sakura-100 p-8 text-sm text-caramel-500 leading-loose">
            現在、このカテゴリの商品は準備中です。管理画面から商品カテゴリを「{category.label}」にして追加すると、この一覧に表示されます。
          </div>
        )}
      </div>
    </main>
  );
}
