-- covenant-demo: minimal persistent backend for admin cases

create table if not exists clg_cases (
  id text primary key,
  insured text not null,
  carrier text not null,
  state text not null,
  assigned_firm text not null default 'Covenant Law Group',
  department text not null,
  status text not null,
  next_step text not null,
  docs_count int not null default 0,
  priority text not null default 'Normal',
  last_touch date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clg_cases_department_status_idx on clg_cases(department, status);
create index if not exists clg_cases_updated_at_idx on clg_cases(updated_at desc);

create table if not exists clg_case_notes (
  id uuid primary key default gen_random_uuid(),
  case_id text not null references clg_cases(id) on delete cascade,
  author text not null default 'Staff',
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists clg_case_notes_case_created on clg_case_notes(case_id, created_at desc);

-- Optional: leads from marketing form
create table if not exists clg_access_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  firm text not null,
  email text not null,
  phone text,
  state text,
  notes text,
  created_at timestamptz not null default now()
);

-- Seed demo cases (safe to run multiple times)
insert into clg_cases (id, insured, carrier, state, department, status, next_step, docs_count, priority, last_touch)
values
  ('CLG-000132','Maria Lopez','State Farm','NC','Onboarding','Initial Review & Evaluation','Initial Review',12,'High','2026-05-10'),
  ('CLG-000141','Jordan Patel','Allstate','SC','Onboarding','Missing Info Requested','Missing Info Received',7,'Normal','2026-05-08'),
  ('CLG-000155','K. Nguyen','Nationwide','FL','Pre-Litigation','LOR','LOR Sent to IC – Pending Response',18,'Normal','2026-05-07'),
  ('CLG-000160','S. Williams','USAA','MI','Pre-Litigation','Demand Letter','Demand Letter Pending Approval',25,'High','2026-05-06'),
  ('CLG-000177','A. Chen','Progressive','CO','Litigation','Suit Filed','Await carrier response',31,'Normal','2026-05-03'),
  ('CLG-000181','L. Garcia','Farm Bureau','HI','Pre-Litigation','Active Negotiations','Pending BC/Contractor Estimate',9,'Low','2026-05-02')
on conflict (id) do nothing;
