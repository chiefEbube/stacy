-- Stacy: profiles linked to Supabase Auth users
-- Run in Supabase SQL Editor or via CLI: supabase db push

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------
create type public.theme_preference as enum ('light', 'dark', 'system');

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  email text not null,
  avatar_url text,
  theme_preference public.theme_preference not null default 'dark',
  notification_preferences jsonb not null default jsonb_build_object(
    'push_enabled', true,
    'email_enabled', true,
    'reminders_enabled', true
  ),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint profiles_email_lowercase check (email = lower(email)),
  constraint profiles_notification_preferences_object check (
    jsonb_typeof(notification_preferences) = 'object'
  )
);

comment on table public.profiles is 'App user profile; one row per auth.users.';
comment on column public.profiles.deleted_at is 'Soft delete; null means active.';

create index profiles_email_idx on public.profiles (email);
create index profiles_deleted_at_idx on public.profiles (deleted_at)
  where deleted_at is null;

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Create profile on sign-up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    lower(coalesce(new.email, ''))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles
  for select
  to authenticated
  using (
    auth.uid() = id
    and deleted_at is null
  );

create policy "Profiles are insertable by owner"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id and deleted_at is null)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- Optional: keep email in sync when auth.users.email changes
-- ---------------------------------------------------------------------------
create or replace function public.sync_profile_email_from_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set email = lower(new.email)
  where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function public.sync_profile_email_from_auth();
