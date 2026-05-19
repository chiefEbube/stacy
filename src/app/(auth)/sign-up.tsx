import { AuthPrimaryButton } from '@/components/auth/AuthPrimaryButton';
import { AuthScreenLayout } from '@/components/auth/AuthScreenLayout';
import { GlassInput } from '@/components/GlassInput';
import { useAuth } from '@/hooks/use-auth';
import { signUpSchema, type SignUpFormValues } from '@/lib/auth-schemas';
import { useAppTheme } from '@/providers/ThemeProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

function getAuthErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: string }).message);
  }
  return 'Something went wrong. Please try again.';
}

export default function SignUpScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { signUp, isSigningUp } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      const result = await signUp({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      if (result.session) {
        router.replace('/(app)');
      } else {
        setFormError('Check your email to confirm your account, then sign in.');
      }
    } catch (e) {
      setFormError(getAuthErrorMessage(e));
    }
  });

  return (
    <AuthScreenLayout
      title="Get Started"
      subtitle="Create your account in less than 60 seconds."
      footer={
        <Text style={[styles.footerText, { color: theme.textMuted }]}>
          Already have an account?{' '}
          <Text
            style={[styles.link, { color: theme.primary }]}
            onPress={() => router.push('/login')}
            accessibilityRole="link"
          >
            Sign in
          </Text>
        </Text>
      }
    >
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <GlassInput
            variant="pill"
            label="Your Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoComplete="name"
            textContentType="name"
            error={errors.fullName?.message}
          />
        )}
      />

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
            autoComplete="new-password"
            textContentType="newPassword"
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <GlassInput
            variant="pill"
            label="Confirm Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            error={errors.confirmPassword?.message}
          />
        )}
      />

      {formError ? (
        <Text style={[styles.formError, { color: theme.priority.critical }]}>{formError}</Text>
      ) : null}

      <View style={styles.submitWrap}>
        <AuthPrimaryButton label="Sign up" onPress={onSubmit} loading={isSigningUp} />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
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
