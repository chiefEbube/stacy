export type ThemePreference = 'light' | 'dark' | 'system';

export type NotificationPreferences = {
  push_enabled: boolean;
  email_enabled: boolean;
  reminders_enabled: boolean;
};

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  theme_preference: ThemePreference;
  notification_preferences: NotificationPreferences;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ProfileUpdate = Partial<
  Pick<
    Profile,
    'full_name' | 'avatar_url' | 'theme_preference' | 'notification_preferences'
  >
>;
