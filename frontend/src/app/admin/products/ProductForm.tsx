import type { Product } from "@/generated/prisma/client";
import { saveProductAction } from "../actions";

type ProductWithImage = Product & {
  image?: { url: string; alt: string; sourceLabel?: string | null; sourceUrl?: string | null } | null;
};

type Props = {
  product?: ProductWithImage;
};

export default function ProductForm({ product }: Props) {
  return (
    <form action={saveProductAction} encType="multipart/form-data" className="bg-white border border-sakura-100 rounded-2xl p-7 space-y-8">
      {product && <input type="hidden" name="id" value={product.id} />}

      {/* 基本情報 */}
      <section className="space-y-5">
        <h2 className="text-xs text-sakura-400 tracking-wide">基本情報</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="block">
            <span className="admin-label">商品名</span>
            <input name="name" defaultValue={product?.name} className="admin-input" required />
          </label>
          <label className="block">
            <span className="admin-label">よみ</span>
            <input name="yomi" defaultValue={product?.yomi} className="admin-input" required />
          </label>
          <label className="block">
            <span className="admin-label">カテゴリ</span>
            <select name="category" defaultValue={product?.category ?? "和菓子"} className="admin-input">
              <option value="和菓子">和菓子</option>
              <option value="洋菓子">洋菓子</option>
              <option value="ケーキ">ケーキ</option>
            </select>
          </label>
          <label className="block">
            <span className="admin-label">販売時期</span>
            <input name="season" defaultValue={product?.season} className="admin-input" required placeholder="通年 / 夏季を中心に販売 など" />
          </label>
          <label className="block">
            <span className="admin-label">価格</span>
            <input name="price" defaultValue={product?.price ?? ""} className="admin-input" placeholder="未設定の場合は「お問い合わせください」と表示" />
          </label>
          <label className="block">
            <span className="admin-label">注記</span>
            <input name="note" defaultValue={product?.note ?? ""} className="admin-input" placeholder="数量限定 など" />
          </label>
        </div>
      </section>

      {/* 説明文 */}
      <section className="space-y-5 border-t border-sakura-50 pt-6">
        <h2 className="text-xs text-sakura-400 tracking-wide">説明文</h2>
        <label className="block">
          <span className="admin-label">短い説明（一覧・カード表示用）</span>
          <textarea name="description" defaultValue={product?.description} className="admin-textarea" required rows={3} />
        </label>
        <label className="block">
          <span className="admin-label">詳細説明（商品ページ用）</span>
          <textarea name="longDescription" defaultValue={product?.longDescription} className="admin-textarea" required rows={7} />
        </label>
      </section>

      {/* 画像 */}
      <section className="space-y-5 border-t border-sakura-50 pt-6">
        <h2 className="text-xs text-sakura-400 tracking-wide">画像</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="size-32 rounded-xl bg-milk-100 overflow-hidden shrink-0 flex items-center justify-center text-4xl border border-sakura-50">
            {product?.image ? (
              <img src={product.image.url} alt={product.image.alt} className="h-full w-full object-cover" />
            ) : (
              <span>{product?.emoji ?? "🍪"}</span>
            )}
          </div>
          <div className="flex-1 grid md:grid-cols-2 gap-5">
            <label className="block md:col-span-2">
              <span className="admin-label">画像を{product?.image ? "差し替え" : "追加"}</span>
              <input type="file" name="image" accept="image/*" className="admin-input" />
              <p className="mt-1 text-[11px] text-caramel-400">空の場合、現在の画像はそのまま使われます。</p>
            </label>
            <label className="block">
              <span className="admin-label">画像alt（代替テキスト）</span>
              <input name="imageAlt" defaultValue={product?.image?.alt ?? product?.name ?? ""} className="admin-input" />
            </label>
            <label className="block">
              <span className="admin-label">写真出典ラベル</span>
              <input name="sourceLabel" defaultValue={product?.image?.sourceLabel ?? ""} className="admin-input" placeholder="公式ブログ / 管理画面" />
            </label>
            <label className="block md:col-span-2">
              <span className="admin-label">写真出典URL</span>
              <input name="sourceUrl" defaultValue={product?.image?.sourceUrl ?? ""} className="admin-input" />
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
            <input type="number" name="sortOrder" defaultValue={product?.sortOrder ?? 0} className="admin-input" />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-caramel-600 md:pb-3">
            <input type="checkbox" name="isPublished" defaultChecked={product?.isPublished ?? true} className="size-4 accent-sakura-400" />
            公開する
          </label>
        </div>

        <details className="rounded-xl border border-sakura-50 bg-milk-50/60 p-4 group">
          <summary className="text-xs text-caramel-400 cursor-pointer select-none">
            詳細設定（スラッグ・アイコン）
          </summary>
          <div className="grid md:grid-cols-2 gap-5 mt-4">
            <label className="block">
              <span className="admin-label">スラッグURL（商品ページのアドレス）</span>
              <input name="slug" defaultValue={product?.slug} className="admin-input" required placeholder="water-manju" />
              <p className="mt-1 text-[11px] text-caramel-400">変更すると商品ページのURLが変わります。</p>
            </label>
            <div className="grid grid-cols-2 gap-5">
              <label className="block">
                <span className="admin-label">絵文字（画像が無い場合に表示）</span>
                <input name="emoji" defaultValue={product?.emoji ?? "🍪"} className="admin-input" />
              </label>
              <label className="block">
                <span className="admin-label">背景グラデーション</span>
                <input name="emojiBg" defaultValue={product?.emojiBg ?? "from-honey-100 to-milk-200"} className="admin-input" />
              </label>
            </div>
          </div>
        </details>
      </section>

      <button className="rounded-full bg-caramel-600 px-7 py-3 text-sm text-white hover:bg-caramel-500 transition-colors">
        保存する
      </button>
    </form>
  );
}
