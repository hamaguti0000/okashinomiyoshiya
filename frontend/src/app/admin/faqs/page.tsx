import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminNav from "../AdminNav";
import { deleteFaqAction, moveFaqAction, toggleFaqPublishedAction } from "../actions";
import ReorderButtons from "../ReorderButtons";
import PublishToggle from "../PublishToggle";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  await requireAdmin();
  const faqs = await prisma.faq.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>
              よくある質問
            </h1>
            <p className="text-xs text-caramel-400 mt-1">表示順は同じカテゴリ内で↑↓で入れ替えできます。</p>
          </div>
          <Link
            href="/admin/faqs/new"
            className="rounded-full bg-caramel-600 hover:bg-caramel-500 px-6 py-2.5 text-sm text-white transition-colors"
          >
            + 新規追加
          </Link>
        </div>

        {faqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-sakura-100 p-12 text-center text-caramel-400 text-sm">
            まだFAQがありません
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryFaqs = faqs.filter((faq) => faq.category === category);
              return (
                <div key={category}>
                  <h2 className="text-xs text-sakura-400 tracking-wide mb-3">{category}</h2>
                  <div className="space-y-3">
                    {categoryFaqs.map((faq, i) => (
                      <div
                        key={faq.id}
                        className="bg-white rounded-2xl border border-sakura-100 p-5 flex items-start gap-4"
                      >
                        <ReorderButtons
                          id={faq.id}
                          action={moveFaqAction}
                          isFirst={i === 0}
                          isLast={i === categoryFaqs.length - 1}
                          className="flex flex-col gap-1 pt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-caramel-700 font-medium truncate">Q. {faq.question}</p>
                          <p className="text-xs text-caramel-400 mt-0.5 truncate">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <PublishToggle id={faq.id} isPublished={faq.isPublished} action={toggleFaqPublishedAction} />
                          <Link
                            href={`/admin/faqs/${faq.id}`}
                            className="text-xs text-sakura-400 hover:text-sakura-300 transition-colors"
                          >
                            編集
                          </Link>
                          <form action={deleteFaqAction}>
                            <input type="hidden" name="id" value={faq.id} />
                            <button className="text-xs text-caramel-400 hover:text-red-400 transition-colors">
                              削除
                            </button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
