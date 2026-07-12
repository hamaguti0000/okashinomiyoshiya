import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPublishedProduct, getPublishedProducts } from "@/lib/cms";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { lineStampBenefit, lineUrl, phoneHref } from "@/lib/contact";

type Props = { params: Promise<{ id: string }> };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getPublishedProduct(id);
  if (!product) return {};
  const priceText = product.price ? `${product.price}。` : "";
  return {
    title: `${product.name}｜${product.category}・${product.season}`,
    description: `${priceText}${product.description}長崎県諫早市高来町「お菓子のみよしや」の手作り${product.category}。ご注文・取り置きは0957-32-2372まで。`,
    openGraph: {
      type: "website",
      url: `${BASE_URL}/products/${id}`,
      title: `${product.name}｜${product.category}・${product.season}`,
      description: `${priceText}${product.description}長崎県諫早市高来町「お菓子のみよしや」の手作り${product.category}。ご注文・取り置きは0957-32-2372まで。`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const [product, products] = await Promise.all([
    getPublishedProduct(id),
    getPublishedProducts(),
  ]);
  if (!product) notFound();

  const others = products.filter((p) => p.id !== product.id).slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription || product.description,
    ...(product.image ? { image: `${BASE_URL}${product.image.src}` } : {}),
    brand: { "@type": "Brand", name: "お菓子のみよしや" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStore",
      seller: {
        "@type": "LocalBusiness",
        name: "お菓子のみよしや",
        address: {
          "@type": "PostalAddress",
          addressLocality: "諫早市",
          addressRegion: "長崎県",
          addressCountry: "JP",
        },
      },
    },
  };

  return (
    <main className="min-h-screen bg-milk-50 pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6">

        <Breadcrumb items={[
          { label: "トップ", href: "/" },
          { label: "商品カテゴリ", href: "/products" },
          { label: product.name },
        ]} />

        {/* Product hero */}
        <div className="bg-white rounded-2xl border border-sakura-100 p-8 md:p-12 mb-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Product visual */}
            <div className={`aspect-square rounded-2xl bg-gradient-to-br ${product.emojiBg} flex items-center justify-center max-w-xs mx-auto w-full shadow-sm overflow-hidden relative`}>
              {product.image ? (
                <>
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                  <a
                    href={product.image.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 rounded-full bg-white/85 px-3 py-1.5 text-[10px] text-caramel-500 backdrop-blur-sm hover:bg-white"
                  >
                    出典: {product.image.sourceLabel}
                  </a>
                </>
              ) : (
                <span className="text-[120px]">{product.emoji}</span>
              )}
            </div>

            {/* Info */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-sakura-400 bg-sakura-50 border border-sakura-100 px-2.5 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  {product.note && (
                    <span className="text-xs text-stream-400 bg-stream-50 border border-stream-200 px-2.5 py-0.5 rounded-full">
                      {product.note}
                    </span>
                  )}
                </div>
                <h1
                  className="text-2xl md:text-3xl text-caramel-700 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h1>
                <p className="text-xs tracking-wider text-caramel-300 mt-1">{product.yomi}</p>
              </div>

              {product.price ? (
                <p className="text-2xl text-caramel-600" style={{ fontFamily: "var(--font-heading)" }}>
                  {product.price}
                </p>
              ) : (
                <p className="text-sm text-caramel-400">価格は店頭にてご確認ください</p>
              )}

              <div className="flex items-center gap-2 text-xs text-caramel-400">
                <span>🗓</span>
                <span>{product.season}</span>
              </div>

              <div className="h-px bg-sakura-50" />

              <p className="text-sm text-caramel-600 leading-loose">
                {product.longDescription}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 bg-sakura-300 hover:bg-sakura-400 text-white text-sm font-medium px-7 py-3 rounded-full shadow-md shadow-sakura-200/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>☎</span>
                  <span>お問い合わせ・ご注文</span>
                </a>
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-forest-500 hover:bg-forest-400 text-white text-sm font-medium px-7 py-3 rounded-full shadow-md shadow-forest-200/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>LINE</span>
                  <span>スタンプカード</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-sakura-50 rounded-2xl border border-sakura-100 p-5 mb-12 text-xs text-caramel-500 leading-relaxed space-y-1">
          <p>※ 季節・数量限定商品は品切れの場合がございます。ご来店前にお電話にてご確認ください。</p>
          <p>※ 公式LINEスタンプカード：{lineStampBenefit}</p>
        </div>

        {/* Other products */}
        {others.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-base text-caramel-600" style={{ fontFamily: "var(--font-heading)" }}>
                その他の商品
              </span>
              <div className="h-px flex-1 bg-sakura-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {others.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
