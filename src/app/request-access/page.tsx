import { SiteShell } from '@/components/SiteShell';
import { BRAND } from '@/lib/brand';
import RequestAccessForm from './RequestAccessForm';

export default function RequestAccessPage() {
  return (
    <SiteShell
      title="Request access"
      subtitle="Submit your information and we’ll follow up with next steps for onboarding and intake."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">What happens next</div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
            <li>We confirm fit (under-$100k property damage claim workflow).</li>
            <li>We provide the cover sheet PDF format for submissions.</li>
            <li>We onboard your staff (admin + staff roles) and go-live.</li>
          </ul>
          <div className="mt-4 text-xs text-slate-400">
            Intake email is currently <span className="font-mono">{BRAND.contact.intakeEmail}</span> (placeholder).
          </div>
        </div>

        <RequestAccessForm />
      </div>
    </SiteShell>
  );
}
