-- Livin' — Storage bucket for CMS image uploads.
-- Run this once in the Supabase SQL Editor (New query → paste → Run).
-- Safe to re-run — every statement is idempotent.

-- 1. Public bucket. Files inside get a stable public URL:
--    https://<project>.supabase.co/storage/v1/object/public/livin-images/<path>
insert into storage.buckets (id, name, public)
values ('livin-images', 'livin-images', true)
on conflict (id) do update set public = excluded.public;

-- 2. RLS: public read, authenticated write.
drop policy if exists "livin-images public read" on storage.objects;
create policy "livin-images public read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'livin-images');

drop policy if exists "livin-images authenticated insert" on storage.objects;
create policy "livin-images authenticated insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'livin-images');

drop policy if exists "livin-images authenticated update" on storage.objects;
create policy "livin-images authenticated update"
on storage.objects for update
to authenticated
using (bucket_id = 'livin-images')
with check (bucket_id = 'livin-images');

drop policy if exists "livin-images authenticated delete" on storage.objects;
create policy "livin-images authenticated delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'livin-images');
