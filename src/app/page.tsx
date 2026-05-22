import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { BRAND } from '@/lib/brand';

const highlights = [
  {
    title: 'Under-$100k property damage claims',
    body: 'We focus on the claims other firms pass on: smaller-dollar property damage matters that still demand professional execution and documentation.',
  },
  {
    title: 'Built for co-counsel + support staff',
    body: 'A practice management system designed for the real workflow: attorneys, paralegals, accounting, and claims specialists moving cases forward together.',
  },
  {
    title: 'Email intake → structured case file',
    body: 'Claims arrive via a dedicated email workflow. A cover sheet PDF drives consistent intake and case creation — even when partners submit multiple claims at once.',
  },
];

export default function HomePage() {
  return (
    <SiteShell
      variant="dullYellow"
      title="Property damage claims under $100k — handled with the same discipline as larger cases."
      subtitle={
        "Covenant Law Group exists for the cases other firms reject. We bring structure, documentation, and momentum to denied, delayed, or underpaid property damage claims — and we do it with a workflow built for law firms."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white">{h.title}</div>
            <div className="mt-3 text-sm leading-7 text-slate-300">{h.body}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0e050]/80">What we handle</div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
            <li>Residential and commercial property damage claims</li>
            <li>Denied, partial denials, underpaid, and delayed claims</li>
            <li>Storm / hail / wind • water damage • fire/smoke • roof</li>
          </ul>
          <div className="mt-4 text-xs text-slate-400">We decline matters that lack sufficient documentation to support a claim.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0e050]/80">States served</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {BRAND.states.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/request-access"
              className="inline-flex items-center justify-center rounded-full bg-[#d0a020] px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              Request access
            </Link>
            <Link
              href="/workflow"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-white/25"
            >
              See workflow
            </Link>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Intake email: <span className="font-mono">{BRAND.contact.intakeEmail}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0e050]/80">Audience</div>
        <div className="mt-3 text-sm leading-7 text-slate-300">
          This system is intended for <span className="font-semibold">co-counsel attorneys/firms</span> and Covenant Law Group{' '}
          <span className="font-semibold">support staff</span> (paralegals, accounting, claims specialists). It is not a public-facing consumer site.
        </div>
      </div>
    </SiteShell>
  );
}
