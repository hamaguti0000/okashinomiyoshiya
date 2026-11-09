import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminNav from "./AdminNav";

export default async function AdminPage() {
  await requireAdmin();

  const [
    productTotal,
    productHidden,
    newsTotal,
    newsHidden,
    photoTotal,
    photoHidden,
    faqTotal,
    faqHidden,
    upcomingSpecialDays,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isPublished: false } }),
    prisma.newsItem.count(),
    prisma.newsItem.count({ where: { isPublished: false } }),
    prisma.sitePhoto.count(),
    prisma.sitePhoto.count({ where: { isActive: false } }),
    prisma.faq.count(),
    prisma.faq.count({ where: { isPublished: false } }),
    prisma.specialDay.count({ where: { date: { gte: new Date(new Date().toISOString().slice(0, 10)) } } }),
  ]);

  const links = [
    {
      href: "/admin/products",
      title: "商品管理",
      body: "商品情報、説明文、価格、写真を追加・編集・削除します。",
      stat: `全${productTotal}件`,
      warn: productHidden > 0 ? `非公開 ${productHidden}件` : null,
    },
    {
      href: "/admin/news",
      title: "お知らせ管理",
      body: "お知らせ、イベント、新商品情報と写真を更新します。",
      stat: `全${newsTotal}件`,
      warn: newsHidden > 0 ? `非公開 ${newsHidden}件` : null,
    },
    {
      href: "/admin/photos",
      title: "トップ画像管理",
      body: "トップページに出す外観・商品・店内写真を差し替えます。",
      stat: `全${photoTotal}件`,
      warn: photoHidden > 0 ? `非表示 ${photoHidden}件` : null,
    },
    {
      href: "/admin/faqs",
      title: "FAQ管理",
      body: "よくある質問を追加・編集・削除します。",
      stat: `全${faqTotal}件`,
      warn: faqHidden > 0 ? `非公開 ${faqHidden}件` : null,
    },
    {
      href: "/admin/special-days",
      title: "休業日・特別営業日",
      body: "臨時休業や特別営業時間をカレンダーに表示します。",
      stat: `今後の予定 ${upcomingSpecialDays}件`,
      warn: null,
    },
  ];

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-[11px] tracking-[0.35em] text-sakura-300 uppercase mb-3">Admin</p>
        <h1 className="text-3xl text-caramel-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          管理トップ
        </h1>
        <p className="text-sm text-caramel-400 mb-8">編集したい項目を選んでください。</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white border border-sakura-100 rounded-2xl p-6 hover:shadow-md hover:shadow-sakura-50/80 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-base text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>
                  {link.title}
                </h2>
                <span className="shrink-0 text-[11px] text-caramel-400 bg-milk-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {link.stat}
                </span>
              </div>
              <p className="text-sm text-caramel-500 leading-relaxed">{link.body}</p>
              {link.warn && (
                <p className="mt-3 text-[11px] text-sakura-400 bg-sakura-50 border border-sakura-100 inline-block px-2.5 py-0.5 rounded-full">
                  {link.warn}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
