type Props = {
  id: string;
  isPublished: boolean;
  action: (formData: FormData) => void | Promise<void>;
  activeLabel?: string;
  inactiveLabel?: string;
};

export default function PublishToggle({
  id,
  isPublished,
  action,
  activeLabel = "公開中",
  inactiveLabel = "非公開",
}: Props) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title="クリックで切り替え"
        className={`rounded-full px-3 py-1 text-[11px] border transition-colors whitespace-nowrap ${
          isPublished
            ? "bg-forest-50 text-forest-600 border-forest-200 hover:bg-forest-100"
            : "bg-caramel-100 text-caramel-500 border-caramel-200 hover:bg-caramel-200"
        }`}
      >
        {isPublished ? activeLabel : inactiveLabel}
      </button>
    </form>
  );
}
