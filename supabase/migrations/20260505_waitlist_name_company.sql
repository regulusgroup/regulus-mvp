alter table waitlist
  add column if not exists name    text,
  add column if not exists company text;
