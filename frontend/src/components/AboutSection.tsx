import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

type AboutItem = {
  image: { src: string; alt: string };
  title: string;
  body: ReactNode;
};

const aboutItems: AboutItem[] = [
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20240227/15/okashinomiyoshiya/78/ff/j/o0810108015406650789.jpg?caw=800",
      alt: "お菓子のみよしやの店内で仕込み中の桃カステラ",
    },
    title: "昭和10年創業",
    body: (
      <>
        轟の滝で知られる高来町で、地元の方に通っていただきながら
        <strong className="font-semibold text-caramel-600">創業約90年</strong>
        。和菓子も洋菓子も、毎日の店頭に合わせて作っています。
      </>
    ),
  },
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20230912/21/okashinomiyoshiya/4a/2e/j/o0810108015337291006.jpg?caw=800",
      alt: "蜂蜜丸ぼうろの製造ライン",
    },
    title: "基本に忠実な手作り",
    body: (
      <>
        <strong className="font-semibold text-caramel-600">安心安全を第一</strong>
        に、素材と製法を大切にしながら、昔ながらのお菓子を丁寧に仕込んでいます。
      </>
    ),
  },
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20220505/11/okashinomiyoshiya/17/56/j/o0810108015113026312.jpg?caw=800",
      alt: "店頭に並ぶ鯉の生菓子",
    },
    title: "少量からご相談",
    body: "バースデーケーキ、祝事・法事のお菓子、まんじゅう少量のご注文もご相談ください。",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-milk-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <ScrollReveal>
          <SectionTitle
            en="About"
            ja="お店について"
            sub="昭和10年から、諫早市高来町で日々のお菓子を作っています。"
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {aboutItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden border border-sakura-100 hover:shadow-lg hover:shadow-sakura-50/80 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-milk-100">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 33vw"
                    quality={75}
                  />
                </div>
                <div className="p-7 flex flex-col gap-4 flex-1">
                  <h3
                    className="text-base text-caramel-700"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-caramel-500 leading-relaxed flex-1">{item.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-sakura-400 hover:text-sakura-300 border-b border-sakura-200 hover:border-sakura-300 pb-0.5 transition-colors"
            >
              お店のこだわりをもっと見る →
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
