-- Sip Club initial schema.
-- Tables per design_handoff_coffee_drip/README.md sections 8 (state) and 9 (data model):
-- user_gear (onboarding grinder/dripper choice), brew_history (saved brews + feedback),
-- recipes (computed recipe per bag, derived from analysis + gear).

create extension if not exists "pgcrypto";

-- One row per user's gear selection (production extension of README section 8's
-- client-side grinder/dripper state).
create table if not exists public.user_gear (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  grinder_id text not null,
  dripper_id text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_gear_user_id_idx on public.user_gear (user_id);

-- Computed recipe per analyzed bag (README section 9 sample_recipe shape).
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  origin text not null,
  process text not null,
  roast text not null,
  dripper_id text not null,
  grinder_id text not null,
  ratio text not null,
  dose_g numeric not null,
  water_g numeric not null,
  water_temp_c numeric not null,
  total_time_sec integer not null,
  grind_setting jsonb not null,
  pours jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists recipes_user_id_idx on public.recipes (user_id);

-- Saved brews + taste feedback (README section 6.B screen 4 / section 8 brewHistory[]).
create table if not exists public.brew_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  recipe_id uuid references public.recipes (id) on delete set null,
  bag_photo_path text,
  feedback_tags text[] not null default '{}',
  adjustment_text text,
  brewed_at timestamptz not null default now()
);

create index if not exists brew_history_user_id_idx on public.brew_history (user_id);
create index if not exists brew_history_recipe_id_idx on public.brew_history (recipe_id);

-- RLS: every table is scoped to the authenticated (including anonymous) user that owns it.
alter table public.user_gear enable row level security;
alter table public.recipes enable row level security;
alter table public.brew_history enable row level security;

create policy "user_gear_select_own" on public.user_gear
  for select using (auth.uid() = user_id);
create policy "user_gear_insert_own" on public.user_gear
  for insert with check (auth.uid() = user_id);
create policy "user_gear_update_own" on public.user_gear
  for update using (auth.uid() = user_id);
create policy "user_gear_delete_own" on public.user_gear
  for delete using (auth.uid() = user_id);

create policy "recipes_select_own" on public.recipes
  for select using (auth.uid() = user_id);
create policy "recipes_insert_own" on public.recipes
  for insert with check (auth.uid() = user_id);
create policy "recipes_delete_own" on public.recipes
  for delete using (auth.uid() = user_id);

create policy "brew_history_select_own" on public.brew_history
  for select using (auth.uid() = user_id);
create policy "brew_history_insert_own" on public.brew_history
  for insert with check (auth.uid() = user_id);
create policy "brew_history_update_own" on public.brew_history
  for update using (auth.uid() = user_id);
create policy "brew_history_delete_own" on public.brew_history
  for delete using (auth.uid() = user_id);
