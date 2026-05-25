import { useBlurTarget } from '@/contexts/blur-target-context';
import { useAppTheme } from '@/providers/ThemeProvider';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabIconName = NonNullable<SymbolViewProps['name']>;

const TAB_META: Record<string, { label: string; icon: TabIconName }> = {
  index: {
    label: 'Home',
    icon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  tasks: {
    label: 'Tasks',
    icon: { ios: 'checklist', android: 'checklist', web: 'checklist' },
  },
  schedule: {
    label: 'Schedule',
    icon: { ios: 'calendar', android: 'calendar_today', web: 'calendar_today' },
  },
  insights: {
    label: 'Insights',
    icon: { ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' },
  },
  settings: {
    label: 'Settings',
    icon: { ios: 'gearshape.fill', android: 'settings', web: 'settings' },
  },
};

export function GlassTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { theme } = useAppTheme();
  const blurTarget = useBlurTarget();
  const insets = useSafeAreaInsets();
  const androidBlurMethod =
    blurTarget != null ? ('dimezisBlurViewSdk31Plus' as const) : ('none' as const);

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={[styles.barOuter, { shadowColor: theme.shadow, borderColor: theme.glassBorder }]}>
        <BlurView
          blurTarget={blurTarget ?? undefined}
          blurMethod={Platform.OS === 'android' ? androidBlurMethod : undefined}
          intensity={72}
          blurReductionFactor={3}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.tint, { backgroundColor: theme.tabBar }]}
        />
        <View style={styles.tabsRow}>
          {state.routes.map((route, index) => {
            const meta = TAB_META[route.name] ?? {
              label: route.name,
              icon: 'circle' as TabIconName,
            };
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];
            const label = options.title ?? meta.label;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={({ pressed }) => [
                  styles.tab,
                  isFocused && [styles.tabActive, { backgroundColor: theme.accentSoft }],
                  pressed && styles.tabPressed,
                ]}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={label}
              >
                <SymbolView
                  name={meta.icon}
                  size={20}
                  tintColor={isFocused ? theme.primary : theme.textMuted}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? theme.primary : theme.textMuted },
                    isFocused && styles.tabLabelActive,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
  },
  barOuter: {
    borderRadius: 28,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  tint: {
    opacity: 0.88,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tabActive: {
    transform: [{ scale: 1.02 }],
  },
  tabPressed: {
    opacity: 0.85,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontWeight: '700',
  },
});
