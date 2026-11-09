import Link from "next/link";
import { lineStampBenefit, lineUrl, phoneHref, phoneNumber } from "@/lib/contact";

const links = [
  { label: "商品一覧",               href: "/products"  },
  { label: "お店について",           href: "/about"     },
  { label: "お知らせ",               href: "/news"      },
  { label: "よくある質問",           href: "/faq"       },
  { label: "轟渓流からお越しの方へ", href: "/todoroki"  },
  { label: "アクセス",               href: "/#access"   },
];

export default function Footer() {
  return (
    <footer className="bg-caramel-700 text-caramel-200">

      {/* Wave top */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="w-full block" preserveAspectRatio="none">
          <path d="M0 25C360 0 720 50 1080 25C1260 12 1380 38 1440 25V50H0V25Z" fill="#3d2010" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-10">

        {/* Logo */}
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.4em] text-caramel-500 uppercase">Okashi no</p>
          <h2 className="text-2xl text-caramel-100" style={{ fontFamily: "var(--font-heading)" }}>
            みよしや
          </h2>
          <p className="text-xs text-caramel-500 leading-loose pt-1 max-w-xs">
            安心安全なお菓子を第一に、基本に忠実なお菓子づくりで皆さんを笑顔にしたい。
          </p>
        </div>

        <div className="h-px bg-caramel-600" />

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Nav */}
          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-xs text-caramel-400 hover:text-caramel-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-2 text-xs text-caramel-400">
            <p>〒859-0132 長崎県諫早市高来町三部壱288-8</p>
            <p>
              <a href={phoneHref} className="hover:text-caramel-100 transition-colors">
                TEL: {phoneNumber}
              </a>
            </p>
            <p>月〜土 9:00〜18:30 ／ 日祝 9:00〜16:30</p>
            <p className="leading-relaxed text-caramel-500">
              公式LINEスタンプカード：{lineStampBenefit}
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:text-caramel-100 transition-colors border-b border-caramel-600 hover:border-caramel-400 pb-px"
              >
                公式LINE →
              </a>
              <a
                href="https://ameblo.jp/okashinomiyoshiya/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:text-caramel-100 transition-colors border-b border-caramel-600 hover:border-caramel-400 pb-px"
              >
                公式ブログ →
              </a>
            </div>
          </div>
        </div>

        <div className="h-px bg-caramel-600" />
        <p className="text-[11px] text-caramel-600">
          © {new Date().getFullYear()} お菓子のみよしや
        </p>
      </div>
    </footer>
  );
}
