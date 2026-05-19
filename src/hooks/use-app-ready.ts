import { useThemeStore } from '@/stores/theme.store';
import { useEffect, useState } from 'react';

const MIN_SPLASH_MS = 1400;

export function useAppReady() {
  const [ready, setReady] = useState(false);
  const [splashExiting, setSplashExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function prepare() {
      const hydration = useThemeStore.persist.hasHydrated()
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            const unsub = useThemeStore.persist.onFinishHydration(() => {
              unsub();
              resolve();
            });
          });

      const minDisplay = new Promise<void>((resolve) => {
        setTimeout(resolve, MIN_SPLASH_MS);
      });

      await Promise.all([hydration, minDisplay]);
      if (cancelled) return;

      setSplashExiting(true);
      await new Promise<void>((resolve) => setTimeout(resolve, 400));
      if (cancelled) return;

      setReady(true);
    }

    prepare();

    return () => {
      cancelled = true;
    };
  }, []);

  return { ready, splashExiting };
}
