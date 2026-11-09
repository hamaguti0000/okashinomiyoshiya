"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import SectionTitle from "./SectionTitle";

type SpecialDay = {
  id: string;
  date: string;
  label: string;
  isClosed: boolean;
  hours?: string;
};

const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];

// 国民の祝日・振替休日（2025〜2027年）
const HOLIDAYS = new Set([
  // 2025
  "2025-01-01", "2025-01-13", "2025-02-11", "2025-02-23", "2025-02-24",
  "2025-03-20", "2025-04-29", "2025-05-03", "2025-05-04", "2025-05-05",
  "2025-05-06", "2025-07-21", "2025-08-11", "2025-09-15", "2025-09-23",
  "2025-10-13", "2025-11-03", "2025-11-23", "2025-11-24",
  // 2026
  "2026-01-01", "2026-01-12", "2026-02-11", "2026-02-23",
  "2026-03-20", "2026-04-29", "2026-05-03", "2026-05-04", "2026-05-05",
  "2026-05-06", // 振替休日（憲法記念日 5/3 が日曜のため）
  "2026-07-20", "2026-08-11", "2026-09-21",
  "2026-09-22", // 国民の休日（敬老の日 9/21 と秋分の日 9/23 の間）
  "2026-09-23",
  "2026-10-12", "2026-11-03", "2026-11-23",
  // 2027
  "2027-01-01", "2027-01-11", "2027-02-11", "2027-02-23",
  "2027-03-20", "2027-04-29", "2027-05-03", "2027-05-04", "2027-05-05",
  "2027-07-19", "2027-08-11", "2027-09-20", "2027-09-23",
  "2027-10-11", "2027-11-03", "2027-11-23",
]);

// JST（UTC+9）の今日の日付を返す
function getJSTToday() {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return { year: jst.getUTCFullYear(), month: jst.getUTCMonth(), date: jst.getUTCDate() };
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildMonthCalendar(
  displayYear: number,
  displayMonth: number,
  today: { year: number; month: number; date: number },
) {
  const firstDay = new Date(displayYear, displayMonth, 1).getDay();
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const isCurrentMonth = displayYear === today.year && displayMonth === today.month;

  const cells: Array<{
    day: number | null;
    weekday: number | null;
    isToday: boolean;
    isHoliday: boolean;
  }> = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: null, weekday: null, isToday: false, isHoliday: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const weekday = new Date(displayYear, displayMonth, day).getDay();
    const dateKey = toDateKey(displayYear, displayMonth, day);
    cells.push({
      day,
      weekday,
      isToday: isCurrentMonth && day === today.date,
      isHoliday: HOLIDAYS.has(dateKey),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: null, weekday: null, isToday: false, isHoliday: false });
  }

  return {
    monthLabel: new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
    }).format(new Date(displayYear, displayMonth, 1)),
    cells,
  };
}

const MAX_PAST   = 1;
const MAX_FUTURE = 3;

type Props = {
  specialDays?: SpecialDay[];
};

export default function BusinessCalendarSection({ specialDays = [] }: Props) {
  const today = getJSTToday();
  const [offset, setOffset] = useState(0);

  const specialDayMap = new Map(specialDays.map((d) => [d.date, d]));

  const displayDate = new Date(today.year, today.month + offset, 1);
  const displayYear  = displayDate.getFullYear();
  const displayMonth = displayDate.getMonth();
  const { monthLabel, cells } = buildMonthCalendar(displayYear, displayMonth, today);

  return (
    <section id="calendar" className="bg-milk-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            en="Calendar"
            ja="営業日カレンダー"
            sub="営業時間と休業日を来店前にご確認ください"
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl border border-sakura-100 bg-white p-6 md:p-8">

            {/* ヘッダー：月ナビ + 凡例 */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOffset((o) => o - 1)}
                  disabled={offset <= -MAX_PAST}
                  aria-label="前の月"
                  className="w-8 h-8 rounded-full border border-sakura-200 flex items-center justify-center text-lg leading-none text-caramel-400 hover:bg-sakura-50 hover:text-caramel-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ‹
                </button>
                <p
                  className="text-lg text-caramel-700 min-w-[8rem] text-center tabular-nums"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {monthLabel}
                </p>
                <button
                  onClick={() => setOffset((o) => o + 1)}
                  disabled={offset >= MAX_FUTURE}
                  aria-label="次の月"
                  className="w-8 h-8 rounded-full border border-sakura-200 flex items-center justify-center text-lg leading-none text-caramel-400 hover:bg-sakura-50 hover:text-caramel-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ›
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-caramel-400">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-caramel-600" />
                  月〜土 9:00〜18:30
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sakura-300" />
                  日祝 9:00〜16:30
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                  休業
                </span>
              </div>
            </div>

            {/* カレンダーグリッド */}
            <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-sakura-100 bg-sakura-100">
              {weekdayLabels.map((label) => (
                <div
                  key={label}
                  className="bg-milk-50 px-2 py-2 text-center text-[10px] tracking-[0.3em] text-caramel-400"
                >
                  {label}
                </div>
              ))}

              {cells.map((cell, index) => {
                const isEmpty    = cell.day === null;
                const isShortDay = cell.weekday === 0 || cell.isHoliday;
                const isSaturday = cell.weekday === 6;
                const dateKey    = cell.day
                  ? toDateKey(displayYear, displayMonth, cell.day)
                  : null;
                const special    = dateKey ? specialDayMap.get(dateKey) : undefined;

                const bgClass = isEmpty
                  ? "bg-milk-50"
                  : special?.isClosed
                  ? "bg-red-50/60"
                  : special
                  ? "bg-honey-100/60"
                  : isShortDay
                  ? "bg-sakura-50/50"
                  : isSaturday
                  ? "bg-stream-50/30"
                  : "bg-white";

                const defaultHours = isShortDay ? "9:00 〜 16:30" : "9:00 〜 18:30";
                const displayHours = special?.isClosed
                  ? "休業"
                  : special?.hours ?? defaultHours;

                const badge = special?.isClosed
                  ? { text: special.label, cls: "bg-red-100 text-red-400" }
                  : special
                  ? { text: special.label, cls: "bg-honey-200 text-caramel-600" }
                  : isShortDay
                  ? { text: "短縮", cls: "bg-sakura-100 text-sakura-400" }
                  : { text: "営業", cls: "bg-caramel-50 text-caramel-500" };

                return (
                  <div
                    key={`${cell.day ?? "blank"}-${index}`}
                    className={`min-h-16 sm:min-h-20 p-2 sm:p-2.5 relative ${bgClass} ${cell.isToday ? "ring-2 ring-inset ring-caramel-400" : ""}`}
                  >
                    {!isEmpty && (
                      <>
                        <div className="flex items-start justify-between gap-1">
                          <span
                            className={`text-sm font-medium ${
                              cell.isToday
                                ? "text-white bg-caramel-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                : special?.isClosed
                                ? "text-red-400"
                                : isShortDay
                                ? "text-sakura-400"
                                : isSaturday
                                ? "text-stream-400"
                                : "text-caramel-700"
                            }`}
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {cell.day}
                          </span>
                          <span className={`hidden sm:inline text-[9px] tracking-[0.15em] px-1.5 py-0.5 rounded-full shrink-0 ${badge.cls}`}>
                            {badge.text}
                          </span>
                        </div>
                        <p className="hidden sm:block mt-1.5 text-[9px] text-caramel-400 leading-relaxed">
                          {displayHours}
                        </p>
                        {cell.isToday && (
                          <p className="mt-1 text-[9px] text-caramel-500 font-medium sm:hidden">今日</p>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* モバイル凡例 */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-caramel-400 sm:hidden">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-caramel-600" />月〜土 9:00〜18:30
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sakura-300" />日祝 9:00〜16:30
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-300" />休業
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-5 h-3 rounded-full border-2 border-caramel-400 inline-block" />今日
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:0957-32-2372"
                className="inline-flex items-center gap-2 rounded-full bg-caramel-600 px-5 py-3 text-sm text-white hover:bg-caramel-500 transition-colors"
              >
                電話で予約・確認する
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-sakura-200 bg-sakura-50 px-5 py-3 text-sm text-caramel-600 hover:bg-white transition-colors"
              >
                商品一覧を見る
              </Link>
              <Link
                href="/#access"
                className="inline-flex items-center gap-2 rounded-full border border-sakura-200 bg-sakura-50 px-5 py-3 text-sm text-caramel-600 hover:bg-white transition-colors"
              >
                アクセスを見る
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
