import { SiteShell } from '@/components/SiteShell';

const steps = [
  {
    title: 'Submit via email + cover sheet PDF',
    body: 'Referral partners and firms submit claims through a dedicated intake email. Each claim includes a cover sheet PDF to standardize metadata and prevent mis-association of attachments.',
  },
  {
    title: 'Attachments are organized automatically',
    body: 'Carrier letters, estimates, engineer reports, damage reports, and supporting documentation are grouped into a structured case file.',
  },
  {
    title: 'Initial review + missing info loop',
    body: 'Cases move through clearly defined statuses: Initial Review → Missing Info Requested/Received → Assign Firm & Finalize Data.',
  },
  {
    title: 'Pre-litigation workflow',
    body: 'LOR → Demand Letter → Active Negotiations. Next steps are explicit and auditable so staff can push cases forward without guesswork.',
  },
  {
    title: 'Litigation when necessary',
    body: 'Suit preparation and filing are tracked as a department transition, with settlement/release milestones for closure.',
  },
];

export default function HowItWorksPage() {
  return (
    <SiteShell
      title="How it works"
      subtitle="A disciplined workflow designed for smaller-dollar property damage claims — without losing documentation or momentum."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((s) => (
          <div key={s.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white">{s.title}</div>
            <div className="mt-3 text-sm leading-7 text-slate-300">{s.body}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Why the cover sheet matters</div>
        <div className="mt-3 text-sm leading-7 text-slate-300">
          Many referral partners submit multiple claims in a single email. The cover sheet provides a consistent delimiter and a single source of truth for
          claim-level metadata — making it possible to separate claims cleanly and attach the right documents to the right case.
        </div>
      </div>
    </SiteShell>
  );
}
