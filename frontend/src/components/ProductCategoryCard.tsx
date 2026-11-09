import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import type { ProductCategory } from "@/lib/product-categories";
import ProductCard from "./ProductCard";

type Props = {
  category: ProductCategory;
  products: Product[];
};

export default function ProductCategoryCard({ category, products }: Props) {
  const featured = products.slice(0, 3);

  return (
    <section className="mb-16">
      <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-6 items-stretch mb-7">
        <div className="relative overflow-hidden rounded-2xl border border-sakura-100 bg-white min-h-72">
          <Image src={category.image} alt={`${category.label}のイメージ`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 320px" />
          <div className="absolute inset-0 bg-gradient-to-t from-caramel-700/70 via-caramel-700/10 to-transparent" />
          <div className="absolute left-5 right-5 bottom-5 text-white">
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/70 mb-2">{category.en}</p>
            <h2 className="text-3xl" style={{ fontFamily: "var(--font-heading)" }}>{category.label}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-sakura-100 p-7 flex flex-col justify-between">
          <div>
            <p className="text-lg text-caramel-700 leading-relaxed mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              {category.lead}
            </p>
            <p className="text-sm text-caramel-500 leading-loose">{category.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href={`/products/category/${category.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-caramel-600 px-6 py-3 text-sm text-white hover:bg-caramel-500 transition-colors"
            >
              {category.label}をすべて見る
            </Link>
            <Link
              href="/products/all"
              className="inline-flex items-center justify-center rounded-full border border-sakura-200 bg-sakura-50 px-6 py-3 text-sm text-caramel-600 hover:bg-white transition-colors"
            >
              全商品一覧
            </Link>
          </div>
        </div>
      </div>

      {featured.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-sakura-100 bg-white p-7 text-sm text-caramel-500 leading-loose">
          ただいま掲載準備中です。ご注文や季節商品のご相談はお電話でお問い合わせください。
        </div>
      )}
    </section>
  );
}
