import { PlaceholderCard, ScreenShell } from '@/components/screens/ScreenShell';
import React from 'react';

export default function ScheduleScreen() {
  return (
    <ScreenShell
      title="Schedule"
      subtitle="Plan your day with clarity and calm."
    >
      <PlaceholderCard
        badge="Calendar"
        title="Week view"
        description="Your calendar timeline and event blocks will render here."
      />
      <PlaceholderCard
        badge="Next up"
        title="Upcoming events"
        description="Meetings, routines, and reminders in chronological order."
      />
    </ScreenShell>
  );
}
