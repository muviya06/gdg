create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  state text,
  created_at timestamptz default now()
);

create index if not exists profiles_username_idx on profiles (username);
