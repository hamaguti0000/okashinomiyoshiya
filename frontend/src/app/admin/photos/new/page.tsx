import AdminNav from "../../AdminNav";
import PhotoForm from "../PhotoForm";
import { requireAdmin } from "@/lib/admin-auth";

export default async function NewPhotoPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>画像を追加</h1>
        <PhotoForm />
      </div>
    </main>
  );
}
