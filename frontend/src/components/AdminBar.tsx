"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/logout-action";

const editLinks: { match: RegExp; href: string; label: string }[] = [
  { match: /^\/news\/[^/]+/,     href: "/admin/news",     label: "お知らせを編集" },
  { match: /^\/news/,            href: "/admin/news",     label: "お知らせ管理"   },
  { match: /^\/products\/[^/]+/, href: "/admin/products", label: "商品を編集"     },
  { match: /^\/products/,        href: "/admin/products", label: "商品管理"       },
  { match: /^\/faq/,             href: "/admin/faqs",     label: "FAQ管理"        },
  { match: /^\/about/,           href: "/admin",          label: "管理トップ"     },
  { match: /^\//,                href: "/admin/photos",   label: "トップ画像管理" },
];

export default function AdminBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const editLink = editLinks.find(({ match }) => match.test(pathname));

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-caramel-700 text-caramel-300 text-[11px] flex items-center">
      <div className="max-w-5xl mx-auto px-4 w-full flex items-center justify-between gap-4">

        <div className="flex items-center gap-4 overflow-hidden">
          <span className="text-caramel-500 shrink-0 hidden sm:block">管理者</span>
          <Link href="/admin" className="hover:text-white transition-colors shrink-0">
            ダッシュボード
          </Link>
          <Link href="/admin/products" className="hover:text-white transition-colors shrink-0 hidden md:block">
            商品
          </Link>
          <Link href="/admin/news" className="hover:text-white transition-colors shrink-0 hidden md:block">
            お知らせ
          </Link>
          <Link href="/admin/photos" className="hover:text-white transition-colors shrink-0 hidden md:block">
            画像
          </Link>
          <Link href="/admin/faqs" className="hover:text-white transition-colors shrink-0 hidden md:block">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {editLink && (
            <Link
              href={editLink.href}
              className="bg-sakura-400/20 hover:bg-sakura-400/30 border border-sakura-400/30 text-sakura-200 hover:text-white px-3 py-0.5 rounded-full transition-colors whitespace-nowrap"
            >
              ✏ {editLink.label}
            </Link>
          )}
          <form action={logoutAction}>
            <button className="hover:text-white transition-colors">ログアウト</button>
          </form>
        </div>

      </div>
    </div>
  );
}
