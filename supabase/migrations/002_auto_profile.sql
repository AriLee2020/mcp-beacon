-- ============================================================================
-- Migration 002: Auto-create profile on user signup
-- ============================================================================

-- Function: Create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger: Call handle_new_user after each auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill: Create profiles for existing users that don't have one
insert into public.profiles (id, email, full_name)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1))
from auth.users
where id not in (select id from public.profiles)
on conflict (id) do nothing;
