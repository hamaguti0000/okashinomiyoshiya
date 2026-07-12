import Link from "next/link";
import AdminNav from "../AdminNav";
import { deleteProductAction, moveProductAction, toggleProductPublishedAction } from "../actions";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import ReorderButtons from "../ReorderButtons";
import PublishToggle from "../PublishToggle";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    include: { image: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-sakura-300 uppercase mb-3">Products</p>
            <h1 className="text-3xl text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>商品管理</h1>
            <p className="text-xs text-caramel-400 mt-1">表示順は↑↓で入れ替えできます。「公開中」を押すと一時的に非公開にできます。</p>
          </div>
          <Link href="/admin/products/new" className="rounded-full bg-caramel-600 px-5 py-3 text-sm text-white hover:bg-caramel-500">商品を追加</Link>
        </div>

        <div className="space-y-3">
          {products.map((product, i) => (
            <article key={product.id} className="bg-white border border-sakura-100 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <ReorderButtons
                id={product.id}
                action={moveProductAction}
                isFirst={i === 0}
                isLast={i === products.length - 1}
                className="flex md:flex-col gap-1 self-start md:self-center order-first md:order-none"
              />
              <div className="size-20 rounded-xl bg-milk-100 overflow-hidden shrink-0 flex items-center justify-center text-3xl">
                {product.image ? <img src={product.image.url} alt={product.image.alt} className="h-full w-full object-cover" /> : product.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-base text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>{product.name}</h2>
                </div>
                <p className="text-xs text-caramel-400">{product.slug} / {product.category} / 表示順 {product.sortOrder}</p>
              </div>
              <div className="flex items-center gap-3">
                <PublishToggle id={product.id} isPublished={product.isPublished} action={toggleProductPublishedAction} />
                <Link href={`/admin/products/${product.id}`} className="text-sm text-sakura-400 hover:text-sakura-300">編集</Link>
                <form action={deleteProductAction}>
                  <input type="hidden" name="id" value={product.id} />
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
