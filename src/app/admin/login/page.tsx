import Link from 'next/link';
import { loginAdmin } from '@/lib/auth';
import { BRAND } from '@/lib/brand';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const showErr = sp.error === '1';

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← Back to site
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <object data="/brand/clg-logo.pdf" type="application/pdf" className="h-full w-full" aria-label="Logo" />
            </div>
            <div>
              <div className="text-sm font-semibold">{BRAND.orgName}</div>
              <div className="text-xs text-zinc-400">Admin login</div>
            </div>
          </div>

          {showErr ? (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              Invalid password.
            </div>
          ) : null}

          <form action={loginAdmin} className="mt-6 grid gap-3">
            <label className="grid gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Password</span>
              <input
                name="password"
                type="password"
                className="h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white"
                placeholder="demo"
                required
              />
            </label>

            <button className="h-11 rounded-xl bg-[#d0a020] text-sm font-semibold text-black hover:opacity-90">
              Sign in
            </button>

            <div className="text-xs text-zinc-400">
              Demo default password: <span className="font-mono">demo</span> (or set{' '}
              <span className="font-mono">CLG_ADMIN_PASSWORD</span>).
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
