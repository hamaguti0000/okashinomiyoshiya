type Props = {
  en: string;
  ja: string;
  sub?: string;
  align?: "left" | "center";
};

export default function SectionTitle({ en, ja, sub, align = "center" }: Props) {
  const isCenter = align === "center";
  return (
    <div className={`space-y-3 mb-12 ${isCenter ? "text-center" : ""}`}>
      <p className="text-[11px] tracking-[0.4em] text-sakura-300 uppercase font-medium">
        {en}
      </p>
      <h2
        className="text-2xl md:text-3xl text-caramel-700"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {ja}
      </h2>
      <div className={`flex items-center gap-2 ${isCenter ? "justify-center" : ""}`}>
        <div className="w-8 h-px bg-sakura-200" />
        <span className="text-sakura-300 text-xs">✦</span>
        <div className="w-8 h-px bg-sakura-200" />
      </div>
      {sub && (
        <p className="text-sm text-caramel-400 leading-relaxed">{sub}</p>
      )}
    </div>
  );
}
