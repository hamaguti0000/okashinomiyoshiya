import Link from "next/link";
import type { Product } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProductsSection({ products }: Props) {
  return (
    <section id="products" className="bg-sakura-50 py-24 px-6 relative overflow-hidden border-y border-sakura-100">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#5c3820 1px, transparent 1px)",
          backgroundSize: "100% 36px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        <ScrollReveal>
          <SectionTitle
            en="Products"
            ja="店頭で選べるお菓子"
            sub="定番、季節商品、ケーキまで。来店前の確認にもご利用ください"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-caramel-600 leading-loose border-l-2 border-sakura-200 pl-4">
            すぐに買える定番商品と、季節や予約状況で変わる商品があります。
            お目当ての商品がある場合や、まとまった数が必要な場合は、ご来店前にお電話で確認いただくと確実です。
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white hover:bg-sakura-50 text-caramel-600 text-sm font-medium px-8 py-3 rounded-full border border-sakura-200 hover:border-sakura-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              商品一覧を見る →
            </Link>
            <p className="mt-4 text-xs text-caramel-400 leading-relaxed">
              ケーキ、鯉菓子、桃カステラ、法事・祝事のお菓子は予約相談がおすすめです。
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
