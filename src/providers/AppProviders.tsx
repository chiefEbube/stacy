import { useAuthListener } from '@/hooks/use-auth';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

function AuthSync({ children }: { children: React.ReactNode }) {
  useAuthListener();
  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthSync>{children}</AuthSync>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
