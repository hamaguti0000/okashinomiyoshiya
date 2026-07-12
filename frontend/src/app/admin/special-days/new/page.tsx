import { requireAdmin } from "@/lib/admin-auth";
import AdminNav from "../../AdminNav";
import SpecialDayForm from "../SpecialDayForm";

export default async function NewSpecialDayPage() {
  await requireAdmin();
  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>
          特別営業日・休業日を追加
        </h1>
        <SpecialDayForm />
      </div>
    </main>
  );
}
