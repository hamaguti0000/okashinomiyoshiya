"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { type Product } from "@/lib/data";

type Props = {
  product: Product;
  linkToDetail?: boolean;
};

export default function ProductCard({ product, linkToDetail = true }: Props) {
  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="group relative bg-white rounded-2xl p-6 border border-sakura-100 hover:border-sakura-200 hover:shadow-xl hover:shadow-sakura-100/50 transition-colors duration-300 flex flex-col gap-4 h-full"
    >
      {linkToDetail ? (
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-10 rounded-2xl"
          aria-label={`${product.name}の商品詳細を見る`}
        >
          <span className="sr-only">{product.name}の商品詳細を見る</span>
        </Link>
      ) : null}
      {product.image ? (
        <div className="relative aspect-[4/3] -mx-1 -mt-1 overflow-hidden rounded-xl bg-milk-100 border border-sakura-50">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <a
            href={product.image.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 z-20 rounded-full bg-white/85 px-2.5 py-1 text-[10px] text-caramel-500 backdrop-blur-sm hover:bg-white"
          >
            出典: {product.image.sourceLabel}
          </a>
        </div>
      ) : (
        <div className="relative aspect-[4/3] -mx-1 -mt-1 overflow-hidden rounded-xl bg-milk-100 border border-sakura-50 flex items-center justify-center">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.12 }}
            transition={{ duration: 0.45 }}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${product.emojiBg} flex items-center justify-center text-4xl shadow-sm cursor-default`}
          >
            {product.emoji}
          </motion.div>
        </div>
      )}

      {/* アイコン行 */}
      <div className="flex items-start justify-between">
        <span className="text-[10px] text-caramel-300 tracking-wide">{product.category}</span>

        <div className="flex flex-col items-end gap-1.5">
          {product.note && (
            <span className="animate-badge-pulse text-[10px] tracking-wide text-sakura-400 bg-sakura-50 border border-sakura-200 px-2.5 py-0.5 rounded-full">
              {product.note}
            </span>
          )}
          <span className="text-[10px] text-caramel-300 tracking-wide">{product.season}</span>
        </div>
      </div>

      {/* 商品名 */}
      <div className="space-y-0.5">
        <h3
          className="text-base text-caramel-700"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {product.name}
        </h3>
        <p className="text-[10px] tracking-wider text-caramel-300">{product.yomi}</p>
      </div>

      {/* 説明 */}
      <p className="text-xs text-caramel-500 leading-relaxed flex-1">
        {product.description}
      </p>

      {/* 価格 + リンク */}
      <div className="flex items-center justify-between pt-1 border-t border-sakura-50">
        {product.price ? (
          <span className="text-sm text-caramel-600" style={{ fontFamily: "var(--font-heading)" }}>
            {product.price}
          </span>
        ) : (
          <span className="text-xs text-caramel-300">価格は店頭にて</span>
        )}
        {linkToDetail && (
          <span className="text-[11px] text-sakura-400 group-hover:text-sakura-300 font-medium transition-colors group-hover:underline underline-offset-2">
            詳しく →
          </span>
        )}
      </div>
    </motion.article>
  );
}
