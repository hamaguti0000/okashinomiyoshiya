type Props = {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  isFirst: boolean;
  isLast: boolean;
  className?: string;
};

const buttonClass =
  "flex items-center justify-center size-6 rounded-md border border-sakura-100 text-caramel-400 text-xs hover:border-sakura-300 hover:text-sakura-400 disabled:opacity-30 disabled:hover:border-sakura-100 disabled:hover:text-caramel-400 transition-colors";

export default function ReorderButtons({ id, action, isFirst, isLast, className = "flex md:flex-col gap-1" }: Props) {
  return (
    <div className={className}>
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="up" />
        <button type="submit" disabled={isFirst} className={buttonClass} aria-label="上に移動" title="上に移動">
          ▲
        </button>
      </form>
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="down" />
        <button type="submit" disabled={isLast} className={buttonClass} aria-label="下に移動" title="下に移動">
          ▼
        </button>
      </form>
    </div>
  );
}
