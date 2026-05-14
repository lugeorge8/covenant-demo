import { MOCK_CASES } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  const byDept = MOCK_CASES.reduce<Record<string, number>>((acc, c) => {
    acc[c.department] = (acc[c.department] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid gap-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0e050]/80">Analytics</div>
        <h1 className="mt-2 text-2xl font-semibold">Pipeline snapshot (demo)</h1>
        <p className="mt-2 text-sm text-zinc-300">Simple counts to match mock layout. Replace with real metrics later.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {Object.entries(byDept).map(([k, v]) => (
          <div key={k} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">{k}</div>
            <div className="mt-2 text-3xl font-semibold text-white">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
