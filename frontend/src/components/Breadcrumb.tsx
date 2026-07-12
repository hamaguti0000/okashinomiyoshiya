import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくずリスト" className="flex items-center gap-2 flex-wrap text-xs text-caramel-400 mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="text-caramel-200">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-sakura-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-caramel-600">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
