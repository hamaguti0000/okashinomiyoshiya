import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

function RippleIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="12" stroke="currentColor" strokeWidth="1"   opacity="0.9" />
      <circle cx="60" cy="60" r="26" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
    </svg>
  );
}

export default function WaterSection() {
  return (
    <section id="water" className="relative bg-forest-700 py-24 px-6 overflow-hidden">

      {/* Texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #d5ecf3 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <p className="text-[11px] tracking-[0.4em] text-stream-300/70 uppercase">Natural Water</p>
              <h2
                className="text-2xl md:text-3xl text-milk-50 leading-relaxed"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                地下80メートルの
                <br />
                天然水を使っています
              </h2>
              <div className="w-8 h-px bg-stream-400/60" />
              <p className="text-sm text-milk-200/80 leading-loose">
                店舗では<strong className="font-semibold text-stream-100">地下80メートルから汲み上げた天然水</strong>をお菓子づくりに使用しています。
                「轟名水 水まんじゅう」という名前にも、この地・高来町への思いを込めています。
              </p>
              <p className="text-sm text-milk-200/80 leading-loose">
                店先には、地域の皆さまにも
                お使いいただける水汲み場があります。
                24時間、無料でご利用いただけます。
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["地下80m天然水", "お菓子づくりに使用", "水汲み場 24時間無料"].map((tag) => (
                  <span key={tag} className="text-xs text-stream-200/90 border border-stream-400/30 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href="/todoroki"
                  className="inline-flex items-center gap-2 text-sm text-stream-200/80 hover:text-stream-100 border-b border-stream-400/30 hover:border-stream-300/60 pb-px transition-colors"
                >
                  轟渓流からお越しの方へ →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Visual */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="flex items-center justify-center">
              <div className="relative w-52 h-52 animate-float">
                <div className="absolute inset-0 text-stream-300/30">
                  <RippleIcon />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-6xl text-stream-200/25 select-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    水
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* 轟渓流 strip */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="text-[11px] tracking-[0.3em] text-milk-300/50 uppercase mb-4">Nearby</p>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
              <div>
                <p className="text-base text-milk-50/90" style={{ fontFamily: "var(--font-heading)" }}>
                  轟渓流（とどろきけいりゅう）
                </p>
                <p className="text-xs text-milk-300/60 mt-1">
                  環境省「名水百選」に選ばれた清流。同じ高来町にあります。
                </p>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/15" />
              <p className="text-xs text-milk-300/50 leading-relaxed max-w-xs">
                大小30余りの滝が連なる県下有数の清流です。
                轟渓流へお越しの際は、帰り道に当店にもお立ち寄りください。
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
