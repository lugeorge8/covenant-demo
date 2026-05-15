import Link from 'next/link';
import { notFound } from 'next/navigation';
import { query, sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminCaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseRes = await query<{
    id: string;
    insured: string;
    carrier: string;
    state: string;
    assigned_firm: string;
    department: string;
    status: string;
    next_step: string;
    docs_count: number;
    priority: string;
    last_touch: string;
  }>(
    `select id, insured, carrier, state, assigned_firm, department, status, next_step, docs_count, priority, last_touch
     from clg_cases where id = $1 limit 1`,
    [id]
  );
  const row = caseRes.rows[0];
  if (!row) return notFound();

  const c = {
    id: row.id,
    insured: row.insured,
    carrier: row.carrier,
    state: row.state,
    assignedFirm: row.assigned_firm,
    department: row.department,
    status: row.status,
    nextStep: row.next_step,
    docs: Number(row.docs_count ?? 0),
    priority: row.priority,
    lastTouch: row.last_touch,
  };

  const notesRes = await sql<{ id: string; author: string; body: string; created_at: string }>`
    select id::text, author, body, created_at
    from clg_case_notes
    where case_id = ${id}
    order by created_at desc
    limit 50
  `;

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
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Notes</div>
            <div className="mt-3 grid gap-2">
              <form
                action={async (formData: FormData) => {
                  'use server';
                  const body = String(formData.get('body') ?? '').trim();
                  if (!body) return;
                  await sql`
                    insert into clg_case_notes (case_id, author, body)
                    values (${id}, 'Staff', ${body})
                  `;
                  await sql`update clg_cases set updated_at = now(), last_touch = current_date where id = ${id}`;
                }}
                className="grid gap-2"
              >
                <textarea
                  name="body"
                  className="min-h-20 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
                  placeholder="Add a note…"
                />
                <button className="h-10 w-fit rounded-xl bg-[#d0a020] px-4 text-sm font-semibold text-black hover:opacity-90">
                  Add note
                </button>
              </form>

              <div className="mt-2 space-y-3 text-sm text-zinc-200">
                {notesRes.rows.length ? (
                  notesRes.rows.map((n) => (
                    <div key={n.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-xs text-zinc-400">
                        {new Date(n.created_at).toLocaleString()} • {n.author}
                      </div>
                      <div className="mt-1 whitespace-pre-wrap">{n.body}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-zinc-400">No notes yet.</div>
                )}
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
