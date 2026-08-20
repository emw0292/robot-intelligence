-- Robot Intelligence: public.trends initial schema
-- Run this file in Supabase SQL Editor as one query.

create table if not exists public.trends (
  id text primary key,
  title text not null,
  summary text,
  content text,
  category text not null
    constraint trends_category_check
    check (category in ('policy', 'industry', 'technology', 'rnd', 'standards')),
  subcategory text,
  country text not null
    constraint trends_country_check
    check (country in ('대한민국', '미국', '중국', '일본', 'EU')),
  organization text,
  published_at timestamptz,
  importance text not null
    constraint trends_importance_check
    check (importance in ('A', 'B', 'C')),
  keywords text[] not null default '{}'::text[],
  implication text,
  source_name text,
  source_url text,
  status text not null default 'draft'
    constraint trends_status_check
    check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The app always filters by status and sorts by published_at descending.
create index if not exists trends_published_at_idx
  on public.trends (published_at desc);

create index if not exists trends_published_listing_idx
  on public.trends (published_at desc)
  where status = 'published';

create index if not exists trends_published_category_idx
  on public.trends (category, published_at desc)
  where status = 'published';

create index if not exists trends_published_country_idx
  on public.trends (country, published_at desc)
  where status = 'published';

create index if not exists trends_published_importance_idx
  on public.trends (importance, published_at desc)
  where status = 'published';

-- Keep updated_at current for dashboard/API writes.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trends_set_updated_at on public.trends;
create trigger trends_set_updated_at
before update on public.trends
for each row
execute function public.set_updated_at();

-- Public clients may read only published rows. No client-side write policy is
-- created, so inserts, updates, and deletes remain denied under RLS.
alter table public.trends enable row level security;

drop policy if exists "Public can read published trends" on public.trends;
create policy "Public can read published trends"
on public.trends
for select
to anon, authenticated
using (status = 'published');

grant usage on schema public to anon, authenticated;
grant select on table public.trends to anon, authenticated;
revoke insert, update, delete, truncate, references, trigger
  on table public.trends from anon, authenticated;

