import { PlaceholderCard, ScreenShell } from '@/components/screens/ScreenShell';
import React from 'react';

export default function InsightsScreen() {
  return (
    <ScreenShell
      title="Insights"
      subtitle="Trends and progress, distilled into action."
    >
      <PlaceholderCard
        badge="Analytics"
        title="Performance chart"
        description="Weekly productivity and completion trends."
      />
      <PlaceholderCard
        badge="Streaks"
        title="Habit metrics"
        description="Consistency scores and focus-time summaries."
      />
    </ScreenShell>
  );
}
