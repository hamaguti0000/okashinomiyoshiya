import { notFound } from "next/navigation";
import AdminNav from "../../AdminNav";
import PhotoForm from "../PhotoForm";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditPhotoPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const photo = await prisma.sitePhoto.findUnique({ where: { id }, include: { image: true } });
  if (!photo) notFound();

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>画像を編集</h1>
        <PhotoForm photo={photo} />
      </div>
    </main>
  );
}
