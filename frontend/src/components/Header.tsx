"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { lineUrl, phoneHref } from "@/lib/contact";

const navLinks = [
  { label: "商品",           href: "/products"  },
  { label: "営業日",         href: "/#calendar" },
  { label: "予約相談",       href: "/#order"    },
  { label: "こだわり",       href: "/about"     },
  { label: "お知らせ",       href: "/news"      },
  { label: "よくある質問",   href: "/faq"       },
  { label: "アクセス",       href: "/#access"   },
];

type Props = { adminBarActive?: boolean };

export default function Header({ adminBarActive = false }: Props) {
  const pathname = usePathname();
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 管理ページでは AdminBar が非表示なので Header を top-0 に戻す
  const isAdminPage = pathname.startsWith("/admin");
  const hasAdminBar = adminBarActive && !isAdminPage;
  const topClass    = hasAdminBar ? "top-8" : "top-0";

  return (
    <header
      className={`fixed ${topClass} left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-milk-50/95 backdrop-blur-md shadow-sm shadow-sakura-100/60"
          : "bg-milk-50/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-[10px] tracking-[0.35em] text-sakura-300 uppercase">
            Okashi no
          </span>
          <span
            className="text-xl text-caramel-700 group-hover:text-sakura-400 transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            お菓子のみよしや
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-caramel-500 hover:text-sakura-400 transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={phoneHref}
          className="hidden md:flex items-center gap-2 bg-sakura-50 hover:bg-sakura-100 border border-sakura-200 text-caramel-600 text-xs px-4 py-2 rounded-full transition-colors"
        >
          <span>☎</span>
          <span style={{ fontFamily: "var(--font-heading)" }}>電話で予約</span>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px]"
        >
          <span className={`block h-px bg-caramel-600 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px] w-6" : "w-6"}`} />
          <span className={`block h-px bg-caramel-600 transition-all duration-300 ${isOpen ? "opacity-0 w-0" : "w-4"}`} />
          <span className={`block h-px bg-caramel-600 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px] w-6" : "w-6"}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-milk-50/98 border-t border-sakura-100 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="max-w-5xl mx-auto px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2.5 text-sm text-caramel-600 hover:text-sakura-400 border-b border-sakura-50 last:border-0 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a href={phoneHref} className="block pt-3 text-sm text-sakura-400 font-medium">
            ☎ 0957-32-2372
          </a>
          <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="block pt-2 text-sm text-forest-500 font-medium">
            公式LINE・スタンプカード
          </a>
        </nav>
      </div>
    </header>
  );
}
