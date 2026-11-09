import type { NewsItem } from "@/generated/prisma/client";
import { saveNewsAction } from "../actions";

type NewsWithImage = NewsItem & {
  image?: { url: string; alt: string; sourceLabel?: string | null; sourceUrl?: string | null } | null;
};

function dateInputValue(date?: Date) {
  if (!date) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

type Props = {
  news?: NewsWithImage;
};

export default function NewsForm({ news }: Props) {
  return (
    <form action={saveNewsAction} encType="multipart/form-data" className="bg-white border border-sakura-100 rounded-2xl p-7 space-y-8">
      {news && <input type="hidden" name="id" value={news.id} />}

      {/* 基本情報 */}
      <section className="space-y-5">
        <h2 className="text-xs text-sakura-400 tracking-wide">基本情報</h2>
        <label className="block">
          <span className="admin-label">タイトル</span>
          <input name="title" defaultValue={news?.title} className="admin-input" required />
        </label>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="block">
            <span className="admin-label">日付</span>
            <input type="date" name="publishedAt" defaultValue={dateInputValue(news?.publishedAt)} className="admin-input" required />
          </label>
          <label className="block">
            <span className="admin-label">カテゴリ</span>
            <select name="category" defaultValue={news?.category ?? "お知らせ"} className="admin-input">
              <option value="お知らせ">お知らせ</option>
              <option value="新商品">新商品</option>
              <option value="イベント">イベント</option>
              <option value="休業案内">休業案内</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="admin-label">本文</span>
          <textarea name="body" defaultValue={news?.body ?? ""} className="admin-textarea" rows={6} />
        </label>
      </section>

      {/* 画像 */}
      <section className="space-y-5 border-t border-sakura-50 pt-6">
        <h2 className="text-xs text-sakura-400 tracking-wide">画像</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="size-32 rounded-xl bg-milk-100 overflow-hidden shrink-0 border border-sakura-50">
            {news?.image && <img src={news.image.url} alt={news.image.alt} className="h-full w-full object-cover" />}
          </div>
          <div className="flex-1 grid md:grid-cols-2 gap-5">
            <label className="block md:col-span-2">
              <span className="admin-label">画像を{news?.image ? "差し替え" : "追加"}</span>
              <input type="file" name="image" accept="image/*" className="admin-input" />
              <p className="mt-1 text-[11px] text-caramel-400">空の場合、現在の画像はそのまま使われます。</p>
            </label>
            <label className="block">
              <span className="admin-label">画像alt（代替テキスト）</span>
              <input name="imageAlt" defaultValue={news?.image?.alt ?? news?.title ?? ""} className="admin-input" />
            </label>
            <label className="block">
              <span className="admin-label">写真出典ラベル</span>
              <input name="sourceLabel" defaultValue={news?.image?.sourceLabel ?? ""} className="admin-input" placeholder="公式ブログ / 管理画面" />
            </label>
            <label className="block md:col-span-2">
              <span className="admin-label">写真出典URL</span>
              <input name="sourceUrl" defaultValue={news?.image?.sourceUrl ?? ""} className="admin-input" />
            </label>
          </div>
        </div>
      </section>

      {/* 表示設定 */}
      <section className="space-y-5 border-t border-sakura-50 pt-6">
        <h2 className="text-xs text-sakura-400 tracking-wide">表示設定</h2>
        <div className="grid md:grid-cols-2 gap-5 items-end">
          <label className="block">
            <span className="admin-label">表示順（同じ日付内での並び順、数字が小さいほど先）</span>
            <input type="number" name="sortOrder" defaultValue={news?.sortOrder ?? 0} className="admin-input" />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-caramel-600 md:pb-3">
            <input type="checkbox" name="isPublished" defaultChecked={news?.isPublished ?? true} className="size-4 accent-sakura-400" />
            公開する
          </label>
        </div>
      </section>

      <button className="rounded-full bg-caramel-600 px-7 py-3 text-sm text-white hover:bg-caramel-500 transition-colors">
        保存する
      </button>
    </form>
  );
}
