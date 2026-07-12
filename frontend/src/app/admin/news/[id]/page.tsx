import { notFound } from "next/navigation";
import AdminNav from "../../AdminNav";
import NewsForm from "../NewsForm";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditNewsPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const news = await prisma.newsItem.findUnique({ where: { id }, include: { image: true } });
  if (!news) notFound();

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>お知らせを編集</h1>
        <NewsForm news={news} />
      </div>
    </main>
  );
}
