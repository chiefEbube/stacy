export const queryKeys = {
  auth: {
    session: ['auth', 'session'] as const,
  },
  profile: {
    me: ['profile', 'me'] as const,
  },
} as const;
