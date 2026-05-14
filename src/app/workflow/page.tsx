import { SiteShell } from '@/components/SiteShell';

const lanes = [
  {
    title: 'Onboarding',
    items: [
      'Initial Review & Evaluation',
      'Missing Information',
      'Missing Info Requested',
      'Missing Info Received',
      'Assign Firm & Finalize Data',
      'Referral Declined',
    ],
  },
  {
    title: 'Retention',
    items: [
      'Build Retainer',
      'Retainer Ready / Call Client(s)',
      'Retainer Sent – Pending Signature(s)',
      'Retainer Pending Attorney Signature(s)',
      'Pending Additional Client Signature',
      'Pending Additional Client Info',
    ],
  },
  {
    title: 'Pre-Litigation',
    items: ['LOR', 'Demand Letter', 'Active Negotiations', 'Suit Preparation'],
  },
  {
    title: 'Litigation',
    items: ['Suit Filed', 'Settled w/ Release', 'Claim Closed'],
  },
];

export default function WorkflowPage() {
  return (
    <SiteShell
      title="Workflow"
      subtitle="A clear pipeline with explicit next steps — designed for fast movement and strong documentation."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        {lanes.map((lane) => (
          <section key={lane.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0e050]/80">{lane.title}</div>
            <ul className="mt-4 grid gap-2">
              {lane.items.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Designed for staff execution</div>
        <div className="mt-3 text-sm leading-7 text-slate-300">
          The goal is that support staff can move cases forward without ambiguity: every status has a next step, every case has a clear owner, and every document
          is tied to a structured case file.
        </div>
      </div>
    </SiteShell>
  );
}
