import Link from "next/link";
import AdminNav from "../AdminNav";
import { deletePhotoAction, movePhotoAction, togglePhotoActiveAction } from "../actions";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import ReorderButtons from "../ReorderButtons";
import PublishToggle from "../PublishToggle";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminPhotosPage({ searchParams }: Props) {
  await requireAdmin();
  const { error } = await searchParams;
  const photos = await prisma.sitePhoto.findMany({
    include: { image: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-sakura-300 uppercase mb-3">Photos</p>
            <h1 className="text-3xl text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>トップ画像管理</h1>
            <p className="text-xs text-caramel-400 mt-1">表示順は↑↓で入れ替えできます。「表示中」を押すと一時的に非表示にできます。</p>
          </div>
          <Link href="/admin/photos/new" className="rounded-full bg-caramel-600 px-5 py-3 text-sm text-white hover:bg-caramel-500">画像を追加</Link>
        </div>

        {error === "image" && (
          <p className="mb-5 rounded-xl bg-sakura-50 border border-sakura-100 px-5 py-3 text-sm text-sakura-400">
            新規追加には画像ファイルが必要です。
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {photos.map((photo, i) => (
            <article key={photo.id} className="bg-white border border-sakura-100 rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] bg-milk-100 relative">
                <img src={photo.image.url} alt={photo.image.alt} className="h-full w-full object-cover" />
                <div className="absolute top-2 left-2 bg-white/85 rounded-md p-0.5">
                  <ReorderButtons
                    id={photo.id}
                    action={movePhotoAction}
                    isFirst={i === 0}
                    isLast={i === photos.length - 1}
                    className="flex gap-1"
                  />
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="text-base text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>{photo.title}</h2>
                  <PublishToggle
                    id={photo.id}
                    isPublished={photo.isActive}
                    action={togglePhotoActiveAction}
                    activeLabel="表示中"
                    inactiveLabel="非表示"
                  />
                </div>
                <p className="text-xs text-caramel-400 mb-4">{photo.placement} / 表示順 {photo.sortOrder}</p>
                <div className="flex items-center gap-3">
                  <Link href={`/admin/photos/${photo.id}`} className="text-sm text-sakura-400 hover:text-sakura-300">編集</Link>
                  <form action={deletePhotoAction}>
                    <input type="hidden" name="id" value={photo.id} />
                    <button className="text-sm text-caramel-400 hover:text-sakura-400">削除</button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
