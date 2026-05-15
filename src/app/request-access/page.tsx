import { SiteShell } from '@/components/SiteShell';
import { BRAND } from '@/lib/brand';
import { sql } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function RequestAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const sp = await searchParams;
  const submitted = sp.submitted === '1';

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

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Request access form</div>

          {submitted ? (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
              Submitted. We’ll follow up soon.
            </div>
          ) : null}

          <form
            className="mt-4 grid gap-3"
            action={async (formData: FormData) => {
              'use server';
              const name = String(formData.get('name') ?? '').trim();
              const firm = String(formData.get('firm') ?? '').trim();
              const email = String(formData.get('email') ?? '').trim();
              const phone = String(formData.get('phone') ?? '').trim();
              const state = String(formData.get('state') ?? '').trim();
              const notes = String(formData.get('notes') ?? '').trim();

              if (!name || !firm || !email) return;

              await sql`
                insert into clg_access_requests (name, firm, email, phone, state, notes)
                values (${name}, ${firm}, ${email}, ${phone || null}, ${state || null}, ${notes || null})
              `;

              redirect('/request-access?submitted=1');
            }}
          >
            <label className="grid gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Name</span>
              <input className="h-11 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white" name="name" required />
            </label>

            <label className="grid gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Firm</span>
              <input className="h-11 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white" name="firm" required />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Email</span>
                <input className="h-11 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white" name="email" type="email" required />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Phone</span>
                <input className="h-11 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white" name="phone" />
              </label>
            </div>

            <label className="grid gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">State</span>
              <input className="h-11 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white" name="state" placeholder="e.g., NC" />
            </label>

            <label className="grid gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Notes</span>
              <textarea
                className="min-h-28 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
                name="notes"
                placeholder="Claim types, monthly volume, and anything we should know."
              />
            </label>

            <button className="mt-2 h-11 rounded-xl bg-[#d0a020] px-4 text-sm font-semibold text-black hover:opacity-90">
              Submit
            </button>
          </form>

          <div className="mt-4 text-xs text-slate-500">
            Backend note: submissions are stored in Postgres (<span className="font-mono">clg_access_requests</span>).
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
