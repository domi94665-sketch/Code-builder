create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by users" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can insert their profile" on public.profiles
  for insert with check (auth.uid() = id);

create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  status text not null default 'pending',
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.tasks enable row level security;

create policy "Users can manage their tasks" on public.tasks
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);
