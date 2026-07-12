"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./actions";

const links = [
  { href: "/admin", label: "管理トップ" },
  { href: "/admin/products", label: "商品" },
  { href: "/admin/news", label: "お知らせ" },
  { href: "/admin/photos", label: "トップ画像" },
  { href: "/admin/faqs", label: "FAQ" },
  { href: "/admin/special-days", label: "休業日" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-sakura-100 sticky top-16 z-40">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <nav className="flex items-center gap-1 text-sm overflow-x-auto">
          {links.map((link) => {
            const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  isActive ? "bg-sakura-50 text-sakura-400 font-medium" : "text-caramel-500 hover:text-sakura-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <form action={logoutAction}>
          <button className="text-xs text-caramel-400 hover:text-sakura-400 whitespace-nowrap shrink-0">ログアウト</button>
        </form>
      </div>
    </div>
  );
}
