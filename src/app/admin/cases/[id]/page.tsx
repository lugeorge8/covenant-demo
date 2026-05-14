import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_CASES } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export default async function AdminCaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = MOCK_CASES.find((x) => x.id === id);
  if (!c) return notFound();

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/admin" className="text-sm text-zinc-400 hover:text-white">
            ← All cases
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">{c.id}</h1>
          <div className="mt-2 text-sm text-zinc-300">
            {c.insured} • {c.carrier} • {c.state}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
            {c.department}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
            {c.status}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
            Next: {c.nextStep}
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <div className="text-sm font-semibold text-white">Expanded case file (demo)</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Assigned firm</div>
              <div className="mt-2 text-sm text-white">{c.assignedFirm}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Documents</div>
              <div className="mt-2 text-sm text-white">{c.docs} attachments</div>
              <div className="mt-1 text-xs text-zinc-400">Carrier letters, estimates, engineer reports, etc.</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Notes (demo)</div>
            <div className="mt-2 space-y-3 text-sm text-zinc-200">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-zinc-400">2026-05-10 • Staff</div>
                <div className="mt-1">Requested missing documentation from referral partner.</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-zinc-400">2026-05-08 • Staff</div>
                <div className="mt-1">Carrier acknowledgement letter uploaded; waiting on contractor estimate.</div>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Quick actions (demo)</div>
          <div className="mt-4 grid gap-2 text-sm">
            <button className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-left text-zinc-200 hover:bg-white/5">
              Change status
            </button>
            <button className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-left text-zinc-200 hover:bg-white/5">
              Request missing info
            </button>
            <button className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-left text-zinc-200 hover:bg-white/5">
              Assign firm
            </button>
            <button className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-left text-zinc-200 hover:bg-white/5">
              Generate LOR
            </button>
          </div>

          <div className="mt-6 text-xs text-zinc-400">
            These actions will become real tools later (status updates, document templates, and email workflows).
          </div>
        </aside>
      </div>
    </div>
  );
}
