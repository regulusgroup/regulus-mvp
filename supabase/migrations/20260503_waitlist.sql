create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text,
  created_at timestamptz not null default now()
);

alter table waitlist enable row level security;

create policy "Allow public inserts" on waitlist
  for insert to anon with check (true);
