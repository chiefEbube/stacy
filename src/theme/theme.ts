export const palette = {
  purple50: '#FAF5FF',
  purple100: '#F3E8FF',
  purple200: '#E9D5FF',
  purple300: '#D8B4FE',
  purple400: '#C084FC',
  purple500: '#A855F7',
  purple600: '#9333EA',
  purple700: '#7E22CE',
  pink50: '#FDF2F8',
  pink100: '#FCE7F3',
  pink200: '#FBCFE8',
  pink300: '#F9A8D4',
  pink400: '#F472B6',
  pink500: '#EC4899',
  roseGold: '#E8B4B8',
  champagne: '#F7E7CE',
  white: '#FFFFFF',
  black: '#0F0A14',
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray300: '#D4D4D8',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray600: '#52525B',
  gray700: '#3F3F46',
  gray800: '#27272A',
  gray900: '#18181B',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  critical: '#EF4444',
} as const;

export type ThemePriority = {
  low: string;
  medium: string;
  high: string;
  critical: string;
};

export type AppTheme = {
  background: string;
  backgroundGradient: readonly [string, string, string];
  surface: string;
  surfaceSolid: string;
  glassFill: string;
  inputBackground: string;
  modalSheet: string;
  glassBorder: string;
  glassHighlight: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryLight: string;
  accent: string;
  accentSoft: string;
  border: string;
  shadow: string;
  tabBar: string;
  overlay: string;
  priority: ThemePriority;
  chart: readonly string[];
  success: string;
};

export const lightTheme: AppTheme = {
  background: '#F5F0FF',
  backgroundGradient: ['#EDE9FE', '#DDD6FE', '#C4B5FD'],
  surface: 'rgba(255, 255, 255, 0.72)',
  surfaceSolid: '#FFFFFF',
  glassFill: 'rgba(255, 255, 255, 0.32)',
  inputBackground: 'rgba(255, 255, 255, 0.55)',
  modalSheet: 'rgba(252, 248, 255, 0.97)',
  glassBorder: 'rgba(255, 255, 255, 0.55)',
  glassHighlight: 'rgba(255, 255, 255, 0.9)',
  text: '#1A1025',
  textSecondary: '#6B5B7A',
  textMuted: '#9B8AA8',
  primary: palette.purple600,
  primaryLight: palette.purple400,
  accent: palette.purple700,
  accentSoft: palette.purple100,
  border: 'rgba(167, 139, 250, 0.2)',
  shadow: 'rgba(126, 34, 206, 0.12)',
  tabBar: 'rgba(255, 255, 255, 0.85)',
  overlay: 'rgba(26, 16, 37, 0.4)',
  priority: {
    low: '#94A3B8',
    medium: '#A78BFA',
    high: palette.purple500,
    critical: '#EF4444',
  },
  chart: [palette.purple500, palette.purple400, palette.purple600, palette.purple300],
  success: palette.success,
};

export const darkTheme: AppTheme = {
  background: '#0D0D12',
  backgroundGradient: ['#4A1570', '#1A1028', '#0D0D12'],
  surface: 'rgba(30, 20, 45, 0.75)',
  surfaceSolid: '#1E1428',
  glassFill: 'rgba(45, 32, 68, 0.38)',
  inputBackground: 'rgba(45, 32, 68, 0.75)',
  modalSheet: 'rgba(28, 18, 42, 0.97)',
  glassBorder: 'rgba(167, 139, 250, 0.28)',
  glassHighlight: 'rgba(255, 255, 255, 0.14)',
  text: '#F8F4FC',
  textSecondary: '#C4B5D0',
  textMuted: '#8B7A9E',
  primary: palette.purple500,
  primaryLight: palette.purple400,
  accent: palette.purple700,
  accentSoft: 'rgba(126, 34, 206, 0.22)',
  border: 'rgba(167, 139, 250, 0.12)',
  shadow: 'rgba(0, 0, 0, 0.4)',
  tabBar: 'rgba(20, 12, 30, 0.92)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  priority: {
    low: '#64748B',
    medium: '#C084FC',
    high: palette.purple400,
    critical: '#F87171',
  },
  chart: [palette.purple500, palette.purple400, palette.purple600, palette.purple300],
  success: palette.success,
};
