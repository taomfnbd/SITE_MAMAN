-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: site_content
-- Stores general content for pages (text blocks, images, etc.)
create table public.site_content (
  key text primary key,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: articles
-- Stores blog posts, events, books, etc.
create table public.articles (
  id uuid primary key default uuid_generate_v4(),
  type text not null, -- 'blog', 'actu', 'book', 'link', 'stage'
  title text,
  data jsonb not null, -- Stores the rest of the content (author, excerpt, content, etc.)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.site_content enable row level security;
alter table public.articles enable row level security;

-- Policies for site_content
-- Everyone can read
create policy "Enable read access for all users" on public.site_content
  for select using (true);

-- Only authenticated users can insert/update/delete
create policy "Enable insert for authenticated users only" on public.site_content
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.site_content
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.site_content
  for delete using (auth.role() = 'authenticated');

-- Policies for articles
-- Everyone can read
create policy "Enable read access for all users" on public.articles
  for select using (true);

-- Only authenticated users can insert/update/delete
create policy "Enable insert for authenticated users only" on public.articles
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.articles
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.articles
  for delete using (auth.role() = 'authenticated');

-- Storage Bucket for Images
-- You need to create a bucket named 'images' in your Supabase Storage settings
-- And set the policy to public read, authenticated insert/update/delete
