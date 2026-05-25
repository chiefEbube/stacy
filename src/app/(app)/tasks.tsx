import { PlaceholderCard, ScreenShell } from '@/components/screens/ScreenShell';
import React from 'react';

export default function TasksScreen() {
  return (
    <ScreenShell
      title="Tasks"
      subtitle="Capture, prioritize, and complete what matters."
    >
      <PlaceholderCard
        badge="Inbox"
        title="Task inbox"
        description="Unsorted tasks and quick captures will live here."
      />
      <PlaceholderCard
        badge="Today"
        title="Due today"
        description="A focused list of tasks scheduled for today."
      />
      <PlaceholderCard
        badge="Later"
        title="Upcoming"
        description="Tasks planned for the rest of the week."
      />
    </ScreenShell>
  );
}
