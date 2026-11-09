import Image from "next/image";
import { phoneHref } from "@/lib/contact";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

const photoItems = [
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20250213/15/okashinomiyoshiya/df/e8/j/o0810108015543781192.jpg?caw=800",
      alt: "お菓子のみよしやのバタークリームチョコケーキ",
    },
    title: "ケーキのご予約",
    body: "バースデーケーキ、クリスマスケーキ、昔ながらのバタークリームケーキなど、ご希望をお聞かせください。",
    badge: "電話予約",
  },
  {
    image: {
      src: "https://stat.ameba.jp/user_images/20250505/07/okashinomiyoshiya/43/b2/j/o0810108015586252208.jpg?caw=800",
      alt: "お菓子のみよしやの鯉菓子",
    },
    title: "贈り物のご相談",
    body: "結婚式や法事、祝事の詰め合わせも、ご予算や数に合わせてご用意します。",
    badge: "電話注文可",
  },
];

export default function CommunitySection() {
  return (
    <section id="order" className="bg-milk-100 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <ScrollReveal>
          <SectionTitle
            en="Order"
            ja="予約したい商品"
            sub="ケーキ、贈り物、配達のご相談はお電話が確実です"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {photoItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-sakura-100 hover:shadow-lg hover:shadow-sakura-50/80 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-milk-100">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 767px) 100vw, 50vw"
                    quality={75}
                  />
                  <span className="absolute right-3 top-3 text-[10px] text-sakura-400 bg-white/90 px-2.5 py-0.5 rounded-full tracking-wide">
                    {item.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-2 flex-1">
                  <h3
                    className="text-base text-caramel-700"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-caramel-500 leading-relaxed flex-1">{item.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-sakura-100 bg-white p-6">
            <div className="w-12 h-12 rounded-full bg-sakura-50 border border-sakura-100 flex items-center justify-center text-2xl shrink-0">
              🚗
            </div>
            <div className="flex-1">
              <h3
                className="text-base text-caramel-700"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                近隣への配達
              </h3>
              <p className="mt-1 text-xs text-caramel-500 leading-relaxed">
                高来町・小長井町へのご自宅配達を承っています。その他の地域もお電話でご相談ください。
              </p>
            </div>
            <span className="text-[10px] text-sakura-400 bg-sakura-50 border border-sakura-100 px-2.5 py-0.5 rounded-full tracking-wide shrink-0">
              高来町・小長井町
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 text-center">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-caramel-600 px-6 py-3 text-sm text-white transition-colors hover:bg-caramel-500"
            >
              電話で予約・相談する
            </a>
            <p className="mt-4 text-xs text-caramel-400">
              地元中学校の職場体験も受け入れています。
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
