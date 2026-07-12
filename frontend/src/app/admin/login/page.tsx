import { loginAction } from "../actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-milk-50 pt-28 px-6">
      <div className="max-w-sm mx-auto bg-white border border-sakura-100 rounded-2xl p-8 shadow-sm">
        <p className="text-[11px] tracking-[0.35em] text-sakura-300 uppercase mb-3">Admin</p>
        <h1 className="text-2xl text-caramel-700 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          管理者ログイン
        </h1>
        {error && (
          <p className="mb-4 rounded-lg bg-sakura-50 border border-sakura-100 px-4 py-3 text-sm text-sakura-400">
            パスワードが違います。
          </p>
        )}
        <form action={loginAction} className="space-y-5">
          <label className="block">
            <span className="block text-xs text-caramel-400 mb-2">パスワード</span>
            <input
              type="password"
              name="password"
              className="w-full rounded-lg border border-sakura-100 bg-milk-50 px-4 py-3 text-sm text-caramel-700 outline-none focus:border-sakura-300"
              required
            />
          </label>
          <button className="w-full rounded-full bg-caramel-600 px-5 py-3 text-sm text-white hover:bg-caramel-500 transition-colors">
            ログイン
          </button>
        </form>
      </div>
    </main>
  );
}
