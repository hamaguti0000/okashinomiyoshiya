import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminNav from "../../AdminNav";
import FaqForm from "../FaqForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditFaqPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>
          FAQ 編集
        </h1>
        <FaqForm faq={faq} />
      </div>
    </main>
  );
}
