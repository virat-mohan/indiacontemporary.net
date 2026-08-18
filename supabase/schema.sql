-- India Contemporary — Artist Onboarding schema
--
-- Run this once in your Supabase project's SQL Editor (Dashboard -> SQL
-- Editor -> New query -> paste -> Run). Safe to re-run: uses IF NOT EXISTS
-- / CREATE OR REPLACE throughout.
--
-- Auth: artists sign up with email + password via Supabase Auth
-- (auth.users). `artist_profiles.id` is the same UUID as auth.users.id.
-- Admins are just auth.users whose email appears in `admins` below — no
-- separate password system.

-- ============================================================
-- 1. Admins allow-list
-- ============================================================
create table if not exists admins (
  email text primary key
);

-- Seed the four people who should have admin access. Edit/add rows as
-- needed later — anyone can be added by inserting their email here, they
-- just need to sign up for an account with that email first.
insert into admins (email) values
  ('viratmohan@gmail.com'),
  ('vijit.hooda@gmail.com'),
  ('portfolio@indiacontemporary.net'),
  ('udithooda@gmail.com')
on conflict (email) do nothing;

-- ============================================================
-- 2. Artist profiles (one per artist account)
-- ============================================================
create table if not exists artist_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  address text,
  city text,
  bio text,
  statement text, -- artist statement / "story of the work"
  photo_url text,
  instagram text,
  website text,
  -- Set by an admin during review. Percent the CURATOR keeps (30-40 per
  -- the agreement) — the artist's share is 100 - commission_percent.
  commission_percent numeric,
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'approved', 'rejected')),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  reviewed_at timestamptz,
  reviewed_by text,
  rejection_note text
);

-- ============================================================
-- 3. Artworks (each artist can submit multiple)
-- ============================================================
create table if not exists artworks (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references artist_profiles(id) on delete cascade,
  title text,
  medium text,
  size text,
  year int,
  description text,
  image_url text,
  reserve_price numeric,
  currency text not null default 'EUR',
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'approved', 'rejected')),
  published boolean not null default false,
  sold boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists artworks_artist_id_idx on artworks(artist_id);

-- ============================================================
-- 4. Signed contracts (one per artist, generated + signed at submission)
-- ============================================================
create table if not exists contracts (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references artist_profiles(id) on delete cascade,
  pdf_path text not null, -- path within the `contracts` storage bucket
  signed_name text not null,
  signed_at timestamptz not null default now(),
  ip_address text,
  user_agent text,
  commission_percent_snapshot numeric not null,
  artwork_ids uuid[] not null default '{}', -- annexure snapshot
  created_at timestamptz not null default now()
);

-- ============================================================
-- 5. Row Level Security
-- ============================================================
alter table artist_profiles enable row level security;
alter table artworks enable row level security;
alter table contracts enable row level security;

-- Artists can see & edit their own profile.
drop policy if exists "artist reads own profile" on artist_profiles;
create policy "artist reads own profile" on artist_profiles
  for select using (auth.uid() = id);

drop policy if exists "artist updates own profile" on artist_profiles;
create policy "artist updates own profile" on artist_profiles
  for update using (auth.uid() = id);

drop policy if exists "artist inserts own profile" on artist_profiles;
create policy "artist inserts own profile" on artist_profiles
  for insert with check (auth.uid() = id);

-- Public can read published, approved profiles (for the live site).
drop policy if exists "public reads published profiles" on artist_profiles;
create policy "public reads published profiles" on artist_profiles
  for select using (published = true and status = 'approved');

-- Admins can read/update everything.
drop policy if exists "admins read all profiles" on artist_profiles;
create policy "admins read all profiles" on artist_profiles
  for select using (auth.jwt() ->> 'email' in (select email from admins));

drop policy if exists "admins update all profiles" on artist_profiles;
create policy "admins update all profiles" on artist_profiles
  for update using (auth.jwt() ->> 'email' in (select email from admins));

-- Artworks: artist manages their own; public sees published+approved;
-- admins see/manage everything.
drop policy if exists "artist manages own artworks" on artworks;
create policy "artist manages own artworks" on artworks
  for all using (auth.uid() = artist_id) with check (auth.uid() = artist_id);

drop policy if exists "public reads published artworks" on artworks;
create policy "public reads published artworks" on artworks
  for select using (published = true and status = 'approved');

drop policy if exists "admins manage all artworks" on artworks;
create policy "admins manage all artworks" on artworks
  for all using (auth.jwt() ->> 'email' in (select email from admins));

-- Contracts: artist can read their own (not insert/update directly —
-- only the server, using the service role key, writes these, so the
-- signed_at/ip/commission snapshot can't be tampered with client-side).
drop policy if exists "artist reads own contract" on contracts;
create policy "artist reads own contract" on contracts
  for select using (auth.uid() = artist_id);

drop policy if exists "admins read all contracts" on contracts;
create policy "admins read all contracts" on contracts
  for select using (auth.jwt() ->> 'email' in (select email from admins));

-- admins table itself: readable by anyone signed in (needed for the
-- policies above to evaluate), not writable by anyone via the API.
alter table admins enable row level security;
drop policy if exists "anyone signed in reads admins" on admins;
create policy "anyone signed in reads admins" on admins
  for select using (auth.role() = 'authenticated');

-- ============================================================
-- 6. Storage buckets
-- Run these once too — Supabase Storage buckets aren't plain SQL tables,
-- but this works from the SQL Editor because storage is backed by
-- Postgres under the hood.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('artist-photos', 'artist-photos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('artwork-images', 'artwork-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('contracts', 'contracts', false)
on conflict (id) do nothing;

-- Public buckets: anyone can read; only the owning artist (or admin, via
-- service role which bypasses RLS entirely) can write.
drop policy if exists "public reads artist photos" on storage.objects;
create policy "public reads artist photos" on storage.objects
  for select using (bucket_id = 'artist-photos');

drop policy if exists "artist uploads own photo" on storage.objects;
create policy "artist uploads own photo" on storage.objects
  for insert with check (
    bucket_id = 'artist-photos' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "public reads artwork images" on storage.objects;
create policy "public reads artwork images" on storage.objects
  for select using (bucket_id = 'artwork-images');

drop policy if exists "artist uploads own artwork images" on storage.objects;
create policy "artist uploads own artwork images" on storage.objects
  for insert with check (
    bucket_id = 'artwork-images' and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Contracts bucket is private: only the owning artist reads their own,
-- everything else (writing, admin reading) happens server-side with the
-- service role key, which bypasses RLS entirely.
drop policy if exists "artist reads own contract pdf" on storage.objects;
create policy "artist reads own contract pdf" on storage.objects
  for select using (
    bucket_id = 'contracts' and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Admins can upload into ANY artist's folder in these two public buckets —
-- needed so an admin can manually create an artist profile (with photo and
-- artwork images) on someone's behalf, not just review self-submitted ones.
drop policy if exists "admins upload any artist photo" on storage.objects;
create policy "admins upload any artist photo" on storage.objects
  for insert with check (
    bucket_id = 'artist-photos' and auth.jwt() ->> 'email' in (select email from admins)
  );

drop policy if exists "admins upload any artwork image" on storage.objects;
create policy "admins upload any artwork image" on storage.objects
  for insert with check (
    bucket_id = 'artwork-images' and auth.jwt() ->> 'email' in (select email from admins)
  );
