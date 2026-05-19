# Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` values into `.env` (or set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`).
3. Open **SQL Editor** and run the full script in `migrations/001_profiles.sql`.
4. In **Authentication → Providers**, enable Email and disable email confirmation if you want instant sign-in during development.

The `profiles` table is created automatically for each new user via `handle_new_user()`.
