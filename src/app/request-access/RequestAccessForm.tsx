'use client';

import { useState } from 'react';

export default function RequestAccessForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Request received</div>
        <div className="mt-3 text-sm leading-7 text-slate-300">
          Thanks — we’ll follow up with next steps.
        </div>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl border border-white/10 bg-white/5 p-6"
      action="#"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="text-sm font-semibold text-white">Request access form</div>
      <div className="mt-4 grid gap-3">
        <label className="grid gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Name</span>
          <input
            className="h-11 rounded-xl border border-white/10 bg-slate-950/40 px-3 text-sm text-white"
            name="name"
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Firm</span>
          <input
            className="h-11 rounded-xl border border-white/10 bg-slate-950/40 px-3 text-sm text-white"
            name="firm"
            required
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Email</span>
            <input
              className="h-11 rounded-xl border border-white/10 bg-slate-950/40 px-3 text-sm text-white"
              name="email"
              type="email"
              required
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Phone</span>
            <input
              className="h-11 rounded-xl border border-white/10 bg-slate-950/40 px-3 text-sm text-white"
              name="phone"
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">State</span>
          <input
            className="h-11 rounded-xl border border-white/10 bg-slate-950/40 px-3 text-sm text-white"
            name="state"
            placeholder="e.g., NC"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Notes</span>
          <textarea
            className="min-h-28 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white"
            name="notes"
            placeholder="Claim types, monthly volume, and anything we should know."
          />
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-amber-300 px-4 text-sm font-semibold text-slate-950 hover:bg-amber-200"
        >
          Submit
        </button>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        Demo note: this form does not send email yet. When intake email is finalized, we can wire this to email + CRM.
      </div>
    </form>
  );
}
