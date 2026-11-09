"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { lineStampBenefit, lineUrl, phoneHref } from "@/lib/contact";

const easeOut = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

type Props = {
  photos?: Array<{ src: string; alt: string }>;
};

const fallbackPhotos = [
  { src: "/photos/tv-exterior.webp", alt: "お菓子のみよしやの店舗外観" },
  { src: "/photos/water-manju.webp", alt: "轟名水 水まんじゅう" },
  { src: "https://stat.ameba.jp/user_images/20260107/14/okashinomiyoshiya/16/b7/j/o0810108015738453133.jpg?caw=800", alt: "蜂蜜 丸ぼうろ" },
  { src: "/photos/cake.webp", alt: "ケーキ" },
];

const mainImageSizes = "(max-width: 767px) 100vw, 360px";

export default function HeroSection({ photos = fallbackPhotos }: Props) {
  const [mainPhoto = fallbackPhotos[0], ...subPhotos] = photos.length > 0 ? photos : fallbackPhotos;
  const thumbnails = subPhotos.length >= 3 ? subPhotos.slice(0, 3) : fallbackPhotos.slice(1, 4);

  return (
    <section className="relative overflow-hidden border-b border-caramel-100 bg-milk-50">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#7a5030 1px, transparent 1px), linear-gradient(90deg, #7a5030 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-y-0 right-0 hidden lg:block w-[44vw]">
        <Image
          src={mainPhoto.src}
          alt=""
          fill
          className="object-cover"
          sizes="44vw"
          priority
          quality={78}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-milk-50 via-milk-50/85 to-milk-50/30" />
        <div className="absolute inset-0 bg-caramel-700/10" />
      </div>
      <div
        className="absolute left-[-5%] top-1/2 -translate-y-[50%] select-none pointer-events-none leading-none text-caramel-100/40 hidden md:block"
        style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(15rem, 28vw, 26rem)" }}
        aria-hidden="true"
      >
        菓
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 md:pb-20 w-full">
        <div className="grid md:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-16 items-start">
          <motion.div className="flex-1 min-w-0" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="mb-5">
              <p className="text-[11px] tracking-[0.34em] text-caramel-400 uppercase mb-3">
                Isahaya Takaki / since 1935
              </p>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl text-caramel-700 leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                お菓子のみよしや
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-caramel-600 leading-loose mb-6 max-w-2xl">
              諫早市高来町、国道207号線沿いの和洋菓子店です。水まんじゅう、蜂蜜丸ぼうろ、栗どら、季節のケーキまで、普段のおやつと手みやげを店頭でご用意しています。
            </motion.p>

            <motion.p variants={fadeUp} className="mb-6 max-w-xl border-y border-caramel-100 py-3 text-sm text-caramel-600 leading-loose">
              来店前に商品や営業日を確認したい方、ケーキやお祝い菓子を予約したい方は、お電話でお気軽にお尋ねください。
            </motion.p>

            {/* モバイル専用メイン写真 */}
            <motion.div variants={fadeUp} className="md:hidden mb-6 overflow-hidden rounded-lg border border-caramel-100 shadow-md shadow-caramel-200/20 bg-milk-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={mainPhoto.src}
                  alt={mainPhoto.alt}
                  fill
                  className="object-cover"
                  sizes={mainImageSizes}
                  preload
                  quality={82}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-caramel-600 hover:bg-caramel-500 text-white text-sm px-6 py-3 rounded-full transition-colors"
              >
                商品を選ぶ
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 bg-white hover:bg-milk-50 text-caramel-600 text-sm px-6 py-3 rounded-full border border-sakura-200 transition-colors"
              >
                <span>☎</span>
                <span>予約・取り置き</span>
              </a>
              <Link
                href="/#calendar"
                className="inline-flex items-center gap-2 bg-white hover:bg-milk-50 text-caramel-600 text-sm px-6 py-3 rounded-full border border-sakura-200 transition-colors"
              >
                営業日を見る
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              <div className="border-l-4 border-caramel-300 bg-white/90 px-4 py-3 text-xs text-caramel-600 leading-relaxed shadow-sm shadow-caramel-100/40">
                <span className="font-medium text-caramel-700">営業時間</span>
                <span className="mx-2 text-caramel-300">/</span>
                月〜土 9:00〜18:30、日祝 9:00〜16:30。基本的に元日のみ休みです。
              </div>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-l-4 border-forest-400 bg-white/90 px-4 py-3 text-xs text-caramel-600 leading-relaxed shadow-sm shadow-caramel-100/40 transition-colors hover:bg-forest-50"
              >
                <span className="font-medium text-forest-600">LINEスタンプカード</span>
                <span className="mx-2 text-caramel-300">/</span>
                {lineStampBenefit}
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3 max-w-2xl">
              {[
                { value: "定番", label: "水まんじゅう・丸ぼうろ", href: "/products" },
                { value: "予約", label: "ケーキ・お祝い菓子", href: phoneHref },
                { value: "営業日", label: "今月のカレンダー", href: "/#calendar" },
                { value: "アクセス", label: "駐車場5台", href: "/#access" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-baseline gap-2 border-b border-caramel-200 hover:border-caramel-400 pb-1 transition-colors"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.55 + i * 0.08, ease: easeOut }}
                >
                  <span className="text-sm text-caramel-700 group-hover:text-caramel-600 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.value}
                  </span>
                  <span className="text-[10px] text-caramel-400">{item.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
          >
            <div className="relative">
              <div className="absolute -left-4 top-5 h-full w-full border border-caramel-200 bg-honey-100/35" />
              <div className="relative bg-white p-3 shadow-xl shadow-caramel-400/20 border border-caramel-100">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-milk-100">
                <Image
                  src={mainPhoto.src}
                  alt={mainPhoto.alt}
                  fill
                  className="object-cover"
                  sizes={mainImageSizes}
                  preload
                  quality={82}
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {thumbnails.map((photo, i) => (
                  <motion.div
                    key={photo.src}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.4 + i * 0.08, ease: easeOut }}
                    className="relative aspect-square overflow-hidden rounded-md bg-milk-100"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="110px"
                      loading="lazy"
                      quality={72}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 border-t border-caramel-100 pt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-caramel-500">
                <p>国道207号線沿い</p>
                <p>駐車場5台</p>
                <p>湯江駅から徒歩圏</p>
                <p>電話・LINE相談可</p>
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
