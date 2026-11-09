import { notFound } from "next/navigation";
import AdminNav from "../../AdminNav";
import ProductForm from "../ProductForm";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id }, include: { image: true } });
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-milk-50 pt-16 pb-20">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl text-caramel-700 mb-8" style={{ fontFamily: "var(--font-heading)" }}>商品を編集</h1>
        <ProductForm product={product} />
      </div>
    </main>
  );
}
