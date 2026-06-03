-- ============================================================================
-- MCP Beacon — Migration 002: Auto-create profiles on user signup
-- ============================================================================
-- PROBLEM: Magic Link auth creates auth.users but NOT public.profiles.
-- FIX: Trigger that auto-creates profiles row when auth.users is inserted.
-- ============================================================================

create or replace function public.handle_new_user_profile()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Drop if exists (safe re-run)
drop trigger if exists on_auth_user_created_profile on auth.users;

create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();
