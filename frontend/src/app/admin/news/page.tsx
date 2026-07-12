import Link from "next/link";
import AdminNav from "../AdminNav";
import { deleteNewsAction, toggleNewsPublishedAction } from "../actions";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import PublishToggle from "../PublishToggle";

export default async function AdminNewsPage() {
  await requireAdmin();
  const newsItems = await prisma.newsItem.findMany({
    include: { image: true },
    orderBy: [{ publishedAt: "desc" }, { sortOrder: "asc" }],
  });

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-sakura-300 uppercase mb-3">News</p>
            <h1 className="text-3xl text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>お知らせ管理</h1>
            <p className="text-xs text-caramel-400 mt-1">並び順は日付が新しい順です。「公開中」を押すと一時的に非公開にできます。</p>
          </div>
          <Link href="/admin/news/new" className="rounded-full bg-caramel-600 px-5 py-3 text-sm text-white hover:bg-caramel-500">お知らせを追加</Link>
        </div>

        <div className="space-y-3">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white border border-sakura-100 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="size-20 rounded-xl bg-milk-100 overflow-hidden shrink-0">
                {item.image && <img src={item.image.url} alt={item.image.alt} className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-base text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h2>
                </div>
                <p className="text-xs text-caramel-400">{item.publishedAt.toISOString().slice(0, 10)} / {item.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <PublishToggle id={item.id} isPublished={item.isPublished} action={toggleNewsPublishedAction} />
                <Link href={`/admin/news/${item.id}`} className="text-sm text-sakura-400 hover:text-sakura-300">編集</Link>
                <form action={deleteNewsAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="text-sm text-caramel-400 hover:text-sakura-400">削除</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
