import { BRAND } from '@/lib/brand';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0e050]/80">Settings</div>
        <h1 className="mt-2 text-2xl font-semibold">Configuration (demo)</h1>
        <p className="mt-2 text-sm text-zinc-300">Placeholders for the future PMS tools configuration.</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Intake</div>
        <div className="mt-3 text-sm text-zinc-200">
          Intake email: <span className="font-mono">{BRAND.contact.intakeEmail}</span>
        </div>
        <div className="mt-2 text-xs text-zinc-400">Email intake + cover sheet parsing will be implemented as separate tools later.</div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Auth</div>
        <div className="mt-3 text-xs text-zinc-400">
          Demo login uses a password cookie. Set <span className="font-mono">CLG_ADMIN_PASSWORD</span> in Vercel.
        </div>
      </div>
    </div>
  );
}
