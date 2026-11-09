import { requireAdmin } from "@/lib/admin-auth";
import AdminNav from "../../AdminNav";
import FaqForm from "../FaqForm";

export default async function NewFaqPage() {
  await requireAdmin();
  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>
          FAQ 新規追加
        </h1>
        <FaqForm />
      </div>
    </main>
  );
}
