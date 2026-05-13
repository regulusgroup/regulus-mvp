-- ── Profiles ───────────────────────────────────────────────────────────────
-- One row per auth user. Holds the saved compliance profile.
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  name        text,
  company     text,
  country     text,
  stage       text,
  business    text,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users read own profile"  on profiles for select using (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on profiles for insert with check (auth.uid() = id);

-- ── Scans ──────────────────────────────────────────────────────────────────
-- Every generated compliance report. One user can have many.
create table if not exists scans (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  inputs      jsonb not null,
  report      jsonb not null,
  created_at  timestamptz not null default now()
);

create index if not exists scans_user_id_idx on scans(user_id, created_at desc);

alter table scans enable row level security;

create policy "Users read own scans"   on scans for select using (auth.uid() = user_id);
create policy "Users insert own scans" on scans for insert with check (auth.uid() = user_id);
create policy "Users delete own scans" on scans for delete using (auth.uid() = user_id);

-- ── Regulation tasks ───────────────────────────────────────────────────────
-- Per-regulation status tracker, derived from the latest scan.
create table if not exists regulation_tasks (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  scan_id         uuid references scans(id) on delete cascade,
  regulation_name text not null,
  regulation_full text,
  priority        text,
  reason          text,
  action          text,
  status          text not null default 'not_started',  -- not_started | in_progress | done
  updated_at      timestamptz not null default now()
);

create index if not exists regulation_tasks_user_idx on regulation_tasks(user_id, status);

alter table regulation_tasks enable row level security;

create policy "Users read own tasks"   on regulation_tasks for select using (auth.uid() = user_id);
create policy "Users insert own tasks" on regulation_tasks for insert with check (auth.uid() = user_id);
create policy "Users update own tasks" on regulation_tasks for update using (auth.uid() = user_id);
create policy "Users delete own tasks" on regulation_tasks for delete using (auth.uid() = user_id);
