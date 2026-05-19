import { AuthPrimaryButton } from '@/components/auth/AuthPrimaryButton';
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout';
import { GlassInput } from '@/components/GlassInput';
import { useAuth } from '@/hooks/use-auth';
import { signInSchema, type SignInFormValues } from '@/lib/auth-schemas';
import { useAppTheme } from '@/providers/ThemeProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function getAuthErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: string }).message);
  }
  return 'Something went wrong. Please try again.';
}

export default function LoginScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { signIn, isSigningIn } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await signIn(values);
      router.replace('/(app)');
    } catch (e) {
      setFormError(getAuthErrorMessage(e));
    }
  });

  const onForgotPassword = () => {
    // Intentionally no-op for now
  };

  return (
    <AuthScreenLayout
      title="Welcome Back!"
      subtitle="Sign in to pick up right where you left off."
      footer={
        <Text style={[styles.footerText, { color: theme.textMuted }]}>
          New here?{' '}
          <Text
            style={[styles.link, { color: theme.primary }]}
            onPress={() => router.push('/sign-up')}
            accessibilityRole="link"
          >
            Create account
          </Text>
        </Text>
      }
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <GlassInput
            variant="pill"
            label="Email Address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <GlassInput
            variant="pill"
            label="Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            autoComplete="password"
            textContentType="password"
            error={errors.password?.message}
          />
        )}
      />

      <Pressable onPress={onForgotPassword} style={styles.forgotRow}>
        <Text style={[styles.forgotText, { color: theme.primaryLight }]}>Forgot password?</Text>
      </Pressable>

      {formError ? (
        <Text style={[styles.formError, { color: theme.priority.critical }]}>{formError}</Text>
      ) : null}

      <View style={styles.submitWrap}>
        <AuthPrimaryButton label="Sign in" onPress={onSubmit} loading={isSigningIn} />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
  },
  formError: {
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  submitWrap: {
    marginTop: 4,
  },
  footerText: {
    fontSize: 15,
    textAlign: 'center',
  },
  link: {
    fontWeight: '700',
  },
});
