import Link from 'next/link';
import { BRAND } from '@/lib/brand';

const nav = [
  { href: '/', label: 'Overview' },
  { href: '/workflow', label: 'Workflow' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/states', label: 'States served' },
  { href: '/request-access', label: 'Request access' },
  { href: '/admin', label: 'Admin' },
];

export function SiteShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {/* Use PDF logo directly (vector). Works in modern browsers. */}
                <object data="/brand/clg-logo.pdf" type="application/pdf" className="h-full w-full" aria-label="Logo" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-white">{BRAND.orgName}</div>
                <div className="text-xs text-slate-400">Internal tools • marketing demo</div>
              </div>
            </Link>
          </div>

          <nav className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-3 py-2 hover:border-white/20 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/80">Covenant Law Group</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
          {subtitle ? <p className="mt-3 text-base text-slate-300">{subtitle}</p> : null}
        </div>

        <div className="mt-10">{children}</div>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {BRAND.orgName}. Demo only.</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="/brand/clg-logo.pdf" target="_blank" rel="noreferrer">
              Brand assets
            </a>
            <span className="text-slate-600">•</span>
            <a className="hover:text-white" href="/request-access">
              Request access
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
