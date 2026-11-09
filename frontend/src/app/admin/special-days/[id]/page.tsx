import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminNav from "../../AdminNav";
import SpecialDayForm from "../SpecialDayForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditSpecialDayPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const day = await prisma.specialDay.findUnique({ where: { id } });
  if (!day) notFound();

  const formatted = {
    id: day.id,
    date: `${day.date.getUTCFullYear()}-${String(day.date.getUTCMonth() + 1).padStart(2, "0")}-${String(day.date.getUTCDate()).padStart(2, "0")}`,
    label: day.label,
    isClosed: day.isClosed,
    hours: day.hours ?? undefined,
  };

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>
          特別営業日・休業日を編集
        </h1>
        <SpecialDayForm specialDay={formatted} />
      </div>
    </main>
  );
}
