import {
  fetchProfile,
  getSession,
  signIn,
  signOut,
  signUp,
  themePreferenceToMode,
  type SignInInput,
  type SignUpInput,
} from '@/lib/auth';
import { queryKeys } from '@/lib/query-keys';
import { useThemeStore } from '@/stores/theme.store';
import type { Profile } from '@/types/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

function applyProfileTheme(profile: Profile | null | undefined) {
  if (!profile) return;
  const mode = themePreferenceToMode(profile.theme_preference);
  useThemeStore.getState().setTheme(mode);
}

export function useSessionQuery() {
  return useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: getSession,
    staleTime: Infinity,
  });
}

export function useProfileQuery() {
  const { data: session } = useSessionQuery();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: queryKeys.profile.me,
    queryFn: () => {
      if (!userId) return null;
      return fetchProfile(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 2,
  });
}

/** App-wide auth state: session + profile via TanStack Query */
export function useAuth() {
  const queryClient = useQueryClient();
  const sessionQuery = useSessionQuery();
  const profileQuery = useProfileQuery();

  const session = sessionQuery.data ?? null;
  const profile = profileQuery.data ?? null;
  const isAuthenticated = !!session?.user;
  const isLoading =
    sessionQuery.isPending || (isAuthenticated && profileQuery.isPending);

  useEffect(() => {
    if (profile) applyProfileTheme(profile);
  }, [profile]);

  const signInMutation = useMutation({
    mutationFn: (input: SignInInput) => signIn(input),
    onSuccess: async (data) => {
      queryClient.setQueryData(queryKeys.auth.session, data.session);
      if (data.user) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.profile.me });
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (input: SignUpInput) => signUp(input),
    onSuccess: async (data) => {
      queryClient.setQueryData(queryKeys.auth.session, data.session);
      if (data.user) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.profile.me });
      }
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.session, null);
      queryClient.removeQueries({ queryKey: queryKeys.profile.me });
    },
  });

  return {
    session,
    user: session?.user ?? null,
    profile,
    isAuthenticated,
    isLoading,
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    signIn: signInMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    signInError: signInMutation.error,
    signUpError: signUpMutation.error,
    refetchProfile: profileQuery.refetch,
  };
}

/** Subscribe to Supabase auth changes and keep React Query in sync */
export function useAuthListener() {
  const qc = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      qc.setQueryData(queryKeys.auth.session, session);
      if (session?.user) {
        await qc.invalidateQueries({ queryKey: queryKeys.profile.me });
      } else {
        qc.removeQueries({ queryKey: queryKeys.profile.me });
      }
    });

    return () => subscription.unsubscribe();
  }, [qc]);
}
