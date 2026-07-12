import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminNav from "../AdminNav";
import { deleteSpecialDayAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminSpecialDaysPage() {
  await requireAdmin();
  const days = await prisma.specialDay.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-sakura-300 uppercase mb-1">Calendar</p>
            <h1 className="text-3xl text-caramel-700" style={{ fontFamily: "var(--font-heading)" }}>
              特別営業日・休業日
            </h1>
            <p className="text-xs text-caramel-400 mt-1">臨時休業や特別営業時間をカレンダーに表示します</p>
          </div>
          <Link
            href="/admin/special-days/new"
            className="rounded-full bg-caramel-600 px-5 py-3 text-sm text-white hover:bg-caramel-500"
          >
            + 日付を追加
          </Link>
        </div>

        {days.length === 0 ? (
          <div className="bg-white rounded-2xl border border-sakura-100 p-12 text-center text-caramel-400 text-sm">
            登録された特別営業日・休業日はありません
          </div>
        ) : (
          <div className="space-y-3">
            {days.map((day) => {
              const dateStr = `${day.date.getUTCFullYear()}年${day.date.getUTCMonth() + 1}月${day.date.getUTCDate()}日`;
              return (
                <div key={day.id} className="bg-white border border-sakura-100 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      day.isClosed
                        ? "bg-red-50 text-red-400 border border-red-200"
                        : "bg-honey-100 text-caramel-600 border border-honey-200"
                    }`}>
                      {day.isClosed ? "休" : "特"}
                    </div>
                    <div>
                      <p className="text-sm text-caramel-700 font-medium">{dateStr}</p>
                      <p className="text-xs text-caramel-400">
                        {day.label}
                        {!day.isClosed && day.hours && ` ・ ${day.hours}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/special-days/${day.id}`} className="text-xs text-sakura-400 hover:text-sakura-300">
                      編集
                    </Link>
                    <form action={deleteSpecialDayAction}>
                      <input type="hidden" name="id" value={day.id} />
                      <button className="text-xs text-caramel-400 hover:text-red-400 transition-colors">
                        削除
                      </button>
                    </form>
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
