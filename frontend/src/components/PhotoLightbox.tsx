"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { SitePhoto } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

type Props = {
  sitePhotos: SitePhoto[];
};

export default function PhotoLightbox({ sitePhotos }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close  = useCallback(() => setActiveIndex(null), []);
  const prev   = useCallback(() => setActiveIndex((i) => (i === null || i === 0 ? sitePhotos.length - 1 : i - 1)), [sitePhotos.length]);
  const next   = useCallback(() => setActiveIndex((i) => (i === null ? 0 : (i + 1) % sitePhotos.length)), [sitePhotos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")    close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, prev, next]);

  const activePhoto = activeIndex !== null ? sitePhotos[activeIndex] : null;

  return (
    <section className="bg-milk-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            en="Photos"
            ja="外観・店舗・商品写真"
            sub="お店の外観や店頭のお菓子を、来店前にご覧いただけます"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sitePhotos.map((photo, i) => (
            <ScrollReveal key={photo.src} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                onClick={() => setActiveIndex(i)}
                className={`group bg-white rounded-2xl border border-sakura-100 overflow-hidden cursor-zoom-in hover:shadow-xl hover:shadow-sakura-100/60 hover:border-sakura-200 transition-colors duration-300 h-full ${i === 0 ? "lg:col-span-2" : ""}`}
              >
                <div className={`relative ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"} bg-milk-100 overflow-hidden`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                    loading="lazy"
                    quality={78}
                  />
                  {/* ホバー時の拡大アイコン */}
                  <div className="absolute inset-0 bg-caramel-700/0 group-hover:bg-caramel-700/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-2xl drop-shadow-lg">
                      🔍
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-sm text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>
                    {photo.title}
                  </h3>
                  <p className="text-xs text-caramel-500 leading-relaxed">{photo.body}</p>
                  <a
                    href={photo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex text-[10px] text-sakura-400 hover:text-sakura-300 border-b border-sakura-100 hover:border-sakura-300 pb-px transition-colors"
                  >
                    出典: {photo.sourceLabel}
                  </a>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ライトボックスオーバーレイ */}
      <AnimatePresence>
        {activePhoto && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-caramel-900/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            {/* 閉じるボタン */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors"
              aria-label="閉じる"
            >
              ✕
            </button>

            {/* 前へ */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors"
              aria-label="前の写真"
            >
              ‹
            </button>

            {/* 次へ */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors"
              aria-label="次の写真"
            >
              ›
            </button>

            {/* 画像 */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full max-h-[80vh] flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                  loading="eager"
                  quality={85}
                />
              </div>
              <div className="text-center">
                <p className="text-white text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  {activePhoto.title}
                </p>
                <p className="text-white/60 text-xs mt-1">
                  {activeIndex + 1} / {sitePhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
