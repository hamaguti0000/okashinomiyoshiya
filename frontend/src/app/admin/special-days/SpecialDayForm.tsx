"use client";

import { useState } from "react";
import { saveSpecialDayAction } from "../actions";

type Props = {
  specialDay?: {
    id: string;
    date: string;
    label: string;
    isClosed: boolean;
    hours?: string;
  };
};

export default function SpecialDayForm({ specialDay }: Props) {
  const [isClosed, setIsClosed] = useState(specialDay?.isClosed ?? true);

  return (
    <form action={saveSpecialDayAction} className="bg-white border border-sakura-100 rounded-2xl p-7 space-y-8">
      {specialDay && <input type="hidden" name="id" value={specialDay.id} />}

      <section className="space-y-5">
        <h2 className="text-xs text-sakura-400 tracking-wide">基本情報</h2>

        <label className="block">
          <span className="admin-label">日付</span>
          <input
            type="date"
            name="date"
            defaultValue={specialDay?.date}
            className="admin-input"
            required
          />
        </label>

        <div>
          <span className="admin-label">この日の営業状態</span>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-colors ${
                isClosed ? "border-red-200 bg-red-50" : "border-sakura-100 bg-white hover:border-sakura-200"
              }`}
            >
              <input
                type="radio"
                name="isClosed"
                value="on"
                checked={isClosed}
                onChange={() => setIsClosed(true)}
                className="sr-only"
              />
              <span className="block text-sm font-medium text-caramel-700">休業日</span>
              <span className="block text-[11px] text-caramel-400 mt-1">この日はお店を閉めます</span>
            </label>
            <label
              className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-colors ${
                !isClosed ? "border-honey-300 bg-honey-100/50" : "border-sakura-100 bg-white hover:border-sakura-200"
              }`}
            >
              <input
                type="radio"
                name="isClosed"
                value=""
                checked={!isClosed}
                onChange={() => setIsClosed(false)}
                className="sr-only"
              />
              <span className="block text-sm font-medium text-caramel-700">特別営業日</span>
              <span className="block text-[11px] text-caramel-400 mt-1">通常と異なる時間で営業します</span>
            </label>
          </div>
        </div>

        <label className="block">
          <span className="admin-label">ラベル（カレンダーに表示する文字）</span>
          <input
            name="label"
            defaultValue={specialDay?.label ?? (isClosed ? "臨時休業" : "特別営業")}
            placeholder={isClosed ? "臨時休業" : "特別営業時間"}
            className="admin-input"
          />
          <p className="mt-1 text-[11px] text-caramel-400">例：臨時休業、年末年始、イベント営業 など</p>
        </label>

        {!isClosed && (
          <label className="block">
            <span className="admin-label">営業時間（休業でない場合）</span>
            <input
              name="hours"
              defaultValue={specialDay?.hours ?? ""}
              placeholder="例：10:00 〜 15:00"
              className="admin-input"
            />
          </label>
        )}
      </section>

      <button className="rounded-full bg-caramel-600 px-7 py-3 text-sm text-white hover:bg-caramel-500 transition-colors">
        保存する
      </button>
    </form>
  );
}
