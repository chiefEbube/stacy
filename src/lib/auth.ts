import { supabase } from '@/lib/supabase';
import type { Profile, ProfileUpdate, ThemePreference } from '@/types/profile';
import type { Session, User } from '@supabase/supabase-js';

export type SignUpInput = {
  fullName: string;
  email: string;
  password: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) throw error;
  return data as Profile | null;
}

export async function signUp({ fullName, email, password }: SignUpInput) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: { full_name: fullName.trim() },
    },
  });

  if (error) throw error;
  return data;
}

export async function signIn({ email, password }: SignInInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function updateProfile(userId: string, patch: ProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', userId)
    .is('deleted_at', null)
    .select('*')
    .single();

  if (error) throw error;
  return data as Profile;
}

export function themePreferenceToMode(preference: ThemePreference): 'light' | 'dark' {
  if (preference === 'light') return 'light';
  return 'dark';
}

export function getDisplayName(user: User | null, profile: Profile | null | undefined) {
  if (profile?.full_name?.trim()) return profile.full_name.trim();
  const meta = user?.user_metadata?.full_name;
  if (typeof meta === 'string' && meta.trim()) return meta.trim();
  return user?.email?.split('@')[0] ?? 'User';
}
