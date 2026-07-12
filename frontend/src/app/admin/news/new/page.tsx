import AdminNav from "../../AdminNav";
import NewsForm from "../NewsForm";
import { requireAdmin } from "@/lib/admin-auth";

export default async function NewNewsPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>お知らせを追加</h1>
        <NewsForm />
      </div>
    </main>
  );
}
