import type { Faq } from "@/generated/prisma/client";
import { saveFaqAction } from "../actions";

type Props = {
  faq?: Faq;
};

const faqCategories = ["予約・注文", "商品・販売", "配達・アクセス", "天然水・水汲み場", "営業・店舗", "一般"];

export default function FaqForm({ faq }: Props) {
  return (
    <form action={saveFaqAction} className="bg-white border border-sakura-100 rounded-2xl p-7 space-y-8">
      {faq && <input type="hidden" name="id" value={faq.id} />}

      {/* 内容 */}
      <section className="space-y-5">
        <h2 className="text-xs text-sakura-400 tracking-wide">内容</h2>
        <label className="block">
          <span className="admin-label">カテゴリ</span>
          <select name="category" defaultValue={faq?.category ?? "一般"} className="admin-input">
            {faqCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-caramel-400">同じカテゴリの質問はまとめて表示されます。</p>
        </label>

        <label className="block">
          <span className="admin-label">質問</span>
          <input name="question" defaultValue={faq?.question} className="admin-input" required />
        </label>

        <label className="block">
          <span className="admin-label">回答</span>
          <textarea name="answer" defaultValue={faq?.answer} className="admin-textarea" rows={5} required />
        </label>
      </section>

      {/* 表示設定 */}
      <section className="space-y-5 border-t border-sakura-50 pt-6">
        <h2 className="text-xs text-sakura-400 tracking-wide">表示設定</h2>
        <div className="grid md:grid-cols-2 gap-5 items-end">
          <label className="block">
            <span className="admin-label">表示順（同じカテゴリ内での並び順、数字が小さいほど先）</span>
            <input type="number" name="sortOrder" defaultValue={faq?.sortOrder ?? 0} className="admin-input" />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-caramel-600 md:pb-3">
            <input type="checkbox" name="isPublished" defaultChecked={faq?.isPublished ?? true} className="size-4 accent-sakura-400" />
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
