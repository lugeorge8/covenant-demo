import Link from 'next/link';
import { BRAND } from '@/lib/brand';
import { logoutAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const nav = [
  { href: '/admin', label: 'All cases' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 md:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 bg-black/40 p-5 md:min-h-screen md:border-b-0 md:border-r">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <object data="/brand/clg-logo.pdf" type="application/pdf" className="h-full w-full" aria-label="Logo" />
            </div>
            <div>
              <div className="text-sm font-semibold">{BRAND.orgName}</div>
              <div className="text-xs text-zinc-400">Admin console (demo)</div>
            </div>
          </Link>

          <nav className="mt-6 grid gap-2">
            {nav.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 hover:border-white/20"
              >
                {it.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-300">
            <div className="font-semibold text-white">States served</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {BRAND.states.map((s) => (
                <span key={s} className="rounded-full border border-white/10 px-2 py-1 text-[10px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <form action={logoutAdmin} className="mt-6">
            <button className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 hover:border-white/20">
              Logout
            </button>
          </form>
        </aside>

        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
