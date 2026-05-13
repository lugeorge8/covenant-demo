import { SiteShell } from '@/components/SiteShell';
import { BRAND } from '@/lib/brand';

export default function StatesPage() {
  return (
    <SiteShell
      title="States served"
      subtitle="Covenant Law Group currently serves clients in the following states, with intent to expand nationwide."
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap gap-3">
          {BRAND.states.map((s) => (
            <div key={s} className="rounded-2xl border border-white/10 bg-slate-950/30 px-5 py-4 text-sm text-white">
              {s}
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
