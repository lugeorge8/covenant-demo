import Link from 'next/link';
import { MOCK_CASES } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

function pill(tone: 'gold' | 'slate' | 'red' | 'green') {
  if (tone === 'gold') return 'border-[#d0a020]/40 bg-[#d0a020]/15 text-amber-100';
  if (tone === 'green') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100';
  if (tone === 'red') return 'border-rose-500/30 bg-rose-500/10 text-rose-100';
  return 'border-white/10 bg-white/5 text-zinc-200';
}

export default async function AdminCasesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; department?: string; status?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? '').trim().toLowerCase();
  const department = (sp.department ?? '').trim();
  const status = (sp.status ?? '').trim();

  const filtered = MOCK_CASES.filter((c) => {
    if (department && c.department !== department) return false;
    if (status && c.status !== status) return false;
    if (!q) return true;
    return (
      c.id.toLowerCase().includes(q) ||
      c.insured.toLowerCase().includes(q) ||
      c.carrier.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q)
    );
  });

  const counts = {
    total: filtered.length,
    high: filtered.filter((c) => c.priority === 'High').length,
    onboarding: filtered.filter((c) => c.department === 'Onboarding').length,
    prelit: filtered.filter((c) => c.department === 'Pre-Litigation').length,
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0e050]/80">All cases</div>
          <h1 className="mt-2 text-2xl font-semibold">Inbox + pipeline</h1>
          <p className="mt-2 text-sm text-zinc-300">
            Demo admin backend: filter, search, and drill into an expanded case file.
          </p>
        </div>

        <form method="get" className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <input
            name="q"
            defaultValue={sp.q ?? ''}
            placeholder="Search case ID, insured, carrier, state"
            className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white md:w-80"
          />
          <select
            name="department"
            defaultValue={department}
            className="h-10 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white"
          >
            <option value="">All departments</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Pre-Litigation">Pre-Litigation</option>
            <option value="Litigation">Litigation</option>
          </select>
          <button className="h-10 rounded-xl bg-[#d0a020] px-4 text-sm font-semibold text-black hover:opacity-90">
            Apply
          </button>
        </form>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className={`rounded-2xl border p-4 text-sm ${pill('slate')}`}>
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Cases</div>
          <div className="mt-1 text-2xl font-semibold text-white">{counts.total}</div>
        </div>
        <div className={`rounded-2xl border p-4 text-sm ${pill('red')}`}>
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">High priority</div>
          <div className="mt-1 text-2xl font-semibold text-white">{counts.high}</div>
        </div>
        <div className={`rounded-2xl border p-4 text-sm ${pill('slate')}`}>
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Onboarding</div>
          <div className="mt-1 text-2xl font-semibold text-white">{counts.onboarding}</div>
        </div>
        <div className={`rounded-2xl border p-4 text-sm ${pill('slate')}`}>
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Pre-Lit</div>
          <div className="mt-1 text-2xl font-semibold text-white">{counts.prelit}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            <tr>
              <th className="px-5 py-4">Case</th>
              <th className="px-5 py-4">Insured</th>
              <th className="px-5 py-4">Carrier</th>
              <th className="px-5 py-4">Dept</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Next step</th>
              <th className="px-5 py-4">Docs</th>
              <th className="px-5 py-4">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="px-5 py-4 font-semibold text-white">
                  <Link className="underline decoration-white/20 hover:decoration-white" href={`/admin/cases/${encodeURIComponent(c.id)}`}>
                    {c.id}
                  </Link>
                  <div className="mt-1 text-xs text-zinc-400">Last touch: {c.lastTouch}</div>
                </td>
                <td className="px-5 py-4 text-zinc-200">{c.insured}</td>
                <td className="px-5 py-4 text-zinc-200">{c.carrier}</td>
                <td className="px-5 py-4 text-zinc-200">{c.department}</td>
                <td className="px-5 py-4 text-zinc-200">{c.status}</td>
                <td className="px-5 py-4 text-zinc-300">{c.nextStep}</td>
                <td className="px-5 py-4 text-zinc-200">{c.docs}</td>
                <td className="px-5 py-4">
                  <span
                    className={
                      'rounded-full border px-2 py-1 text-xs ' +
                      (c.priority === 'High'
                        ? pill('red')
                        : c.priority === 'Low'
                          ? pill('green')
                          : pill('slate'))
                    }
                  >
                    {c.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-zinc-400">
        Note: this is a demo backend with mock data. Next step is wiring persistence + email intake.
      </div>
    </div>
  );
}
