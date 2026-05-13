-- Extend profiles to store auto-discovered company data + uploaded docs
alter table profiles
  add column if not exists website          text,
  add column if not exists tech_stack       text[],
  add column if not exists handles          text[],
  add column if not exists has_privacy_policy boolean,
  add column if not exists privacy_policy_url text,
  add column if not exists team_size_estimate text,
  add column if not exists discovered_data  jsonb,
  add column if not exists discovered_at    timestamptz;

-- Parsed documents (privacy policies, DPAs, pitch decks, etc.)
create table if not exists parsed_documents (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  doc_type      text not null,        -- privacy_policy | dpa | pitch | other
  raw_text      text,                 -- original text content
  extracted     jsonb,                -- LLM-structured output
  created_at    timestamptz not null default now()
);

create index if not exists parsed_documents_user_idx on parsed_documents(user_id, created_at desc);

alter table parsed_documents enable row level security;

create policy "Users read own docs"   on parsed_documents for select using (auth.uid() = user_id);
create policy "Users insert own docs" on parsed_documents for insert with check (auth.uid() = user_id);
create policy "Users delete own docs" on parsed_documents for delete using (auth.uid() = user_id);
