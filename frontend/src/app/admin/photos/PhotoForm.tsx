import type { SitePhoto } from "@/generated/prisma/client";
import { savePhotoAction } from "../actions";

type PhotoWithImage = SitePhoto & {
  image?: { url: string; alt: string; sourceLabel?: string | null; sourceUrl?: string | null } | null;
};

type Props = {
  photo?: PhotoWithImage;
};

export default function PhotoForm({ photo }: Props) {
  return (
    <form action={savePhotoAction} encType="multipart/form-data" className="bg-white border border-sakura-100 rounded-2xl p-7 space-y-8">
      {photo && <input type="hidden" name="id" value={photo.id} />}

      {/* 基本情報 */}
      <section className="space-y-5">
        <h2 className="text-xs text-sakura-400 tracking-wide">基本情報</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="block">
            <span className="admin-label">タイトル</span>
            <input name="title" defaultValue={photo?.title} className="admin-input" required />
          </label>
          <label className="block">
            <span className="admin-label">表示場所</span>
            <select name="placement" defaultValue={photo?.placement ?? "gallery"} className="admin-input">
              <option value="hero">ヒーロー優先</option>
              <option value="gallery">写真セクション</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="admin-label">説明文</span>
          <textarea name="body" defaultValue={photo?.body} className="admin-textarea" rows={4} required />
        </label>
      </section>

      {/* 画像 */}
      <section className="space-y-5 border-t border-sakura-50 pt-6">
        <h2 className="text-xs text-sakura-400 tracking-wide">画像</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-48 aspect-[16/9] rounded-xl bg-milk-100 overflow-hidden shrink-0 border border-sakura-50">
            {photo?.image && <img src={photo.image.url} alt={photo.image.alt} className="h-full w-full object-cover" />}
          </div>
          <div className="flex-1 grid md:grid-cols-2 gap-5">
            <label className="block md:col-span-2">
              <span className="admin-label">画像を{photo?.image ? "差し替え" : "追加"}</span>
              <input type="file" name="image" accept="image/*" className="admin-input" required={!photo} />
              {photo?.image && <p className="mt-1 text-[11px] text-caramel-400">空の場合、現在の画像はそのまま使われます。</p>}
            </label>
            <label className="block">
              <span className="admin-label">画像alt（代替テキスト）</span>
              <input name="imageAlt" defaultValue={photo?.image?.alt ?? photo?.title ?? ""} className="admin-input" />
            </label>
            <label className="block">
              <span className="admin-label">写真出典ラベル</span>
              <input name="sourceLabel" defaultValue={photo?.image?.sourceLabel ?? ""} className="admin-input" placeholder="管理画面" />
            </label>
            <label className="block md:col-span-2">
              <span className="admin-label">写真出典URL</span>
              <input name="sourceUrl" defaultValue={photo?.image?.sourceUrl ?? ""} className="admin-input" />
            </label>
          </div>
        </div>
      </section>

      {/* 表示設定 */}
      <section className="space-y-5 border-t border-sakura-50 pt-6">
        <h2 className="text-xs text-sakura-400 tracking-wide">表示設定</h2>
        <div className="grid md:grid-cols-2 gap-5 items-end">
          <label className="block">
            <span className="admin-label">表示順（数字が小さいほど先に表示）</span>
            <input type="number" name="sortOrder" defaultValue={photo?.sortOrder ?? 0} className="admin-input" />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-caramel-600 md:pb-3">
            <input type="checkbox" name="isActive" defaultChecked={photo?.isActive ?? true} className="size-4 accent-sakura-400" />
            表示する
          </label>
        </div>
      </section>

      <button className="rounded-full bg-caramel-600 px-7 py-3 text-sm text-white hover:bg-caramel-500 transition-colors">
        保存する
      </button>
    </form>
  );
}
