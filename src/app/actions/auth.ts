'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';

// ============================================================
// Auth Action Schemas
// ============================================================

const LoginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const SignupSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name required'),
  mobileNumber: z.string().optional(),
});

export type ActionResult = {
  success: boolean;
  message?: string;
  error?: string;
  data?: unknown;
};

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(
    url &&
    !url.includes('placeholder') &&
    !url.includes('your-project-id')
  );
}

// ============================================================
// LOGIN with email + password
// ============================================================
export async function loginAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Invalid credentials' };
  }

  if (!isSupabaseConfigured()) {
    // Local Demo / Offline Testing Fallback
    let role = 'team_leader';
    if (parsed.data.email.toLowerCase().includes('admin')) {
      role = 'admin';
    } else if (parsed.data.email.toLowerCase().includes('judge')) {
      role = 'judge';
    }
    const cookieStore = await cookies();
    cookieStore.set('demo_user', role, { path: '/', maxAge: 86400 });
    return {
      success: true,
      message: 'Demo login successful! (Local preview mode)',
      data: { role },
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Fetch user role to redirect appropriately
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    const role = profile?.role || 'participant';

    return { success: true, data: { role } };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Authentication network request failed';
    return { success: false, error: message };
  }
}

// ============================================================
// SIGNUP with email + password
// ============================================================
export async function signupAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
    mobileNumber: formData.get('mobileNumber') as string,
  };

  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation error' };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: 'Demo Mode: Account registered! You can now log in with your credentials.',
      data: { userId: 'demo-user-' + Date.now() },
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: {
          full_name: parsed.data.fullName,
          mobile_number: parsed.data.mobileNumber,
          role: 'participant',
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: 'Account created! Check your email to verify your address.',
      data: { userId: data.user?.id },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Signup request failed';
    return { success: false, error: message };
  }
}

// ============================================================
// LOGOUT
// ============================================================
export async function logoutAction(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('demo_user');
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      await supabase.auth.signOut();
    }
  } catch {
    // Continue redirect even if signout network fails
  }
  redirect('/login');
}

// ============================================================
// SEND OTP (magic link / email OTP)
// ============================================================
export async function sendOtpAction(email: string): Promise<ActionResult> {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Valid email address is required' };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: 'Demo Mode: OTP sent! Use verification code 123456 to log in.',
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
        shouldCreateUser: false, // Only allow existing registered users via OTP
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: 'OTP sent to your email. Please check your inbox.',
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'OTP dispatch failed';
    return { success: false, error: message };
  }
}

// ============================================================
// VERIFY OTP token
// ============================================================
export async function verifyOtpAction(
  email: string,
  token: string
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    if (token === '123456' || token.length === 6) {
      let role = 'team_leader';
      if (email.toLowerCase().includes('admin')) {
        role = 'admin';
      } else if (email.toLowerCase().includes('judge')) {
        role = 'judge';
      }
      const cookieStore = await cookies();
      cookieStore.set('demo_user', role, { path: '/', maxAge: 86400 });
      return { success: true, data: { role } };
    }
    return {
      success: false,
      error: 'Invalid OTP code. Please enter 123456 for demo verification.',
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      return { success: false, error: 'Invalid or expired OTP. Please try again.' };
    }

    // Get role for redirect
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user?.id)
      .single();

    return { success: true, data: { role: profile?.role || 'participant' } };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'OTP verification failed';
    return { success: false, error: message };
  }
}

// ============================================================
// GET CURRENT USER PROFILE
// ============================================================
export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return profile;
  } catch {
    return null;
  }
}

// ============================================================
// GET USER'S TEAM
// ============================================================
export async function getMyTeam() {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: team } = await supabase
    .from('teams')
    .select(`
      *,
      team_members (*)
    `)
    .eq('leader_id', user.id)
    .single();

  // Also check if user is a member of another team
  if (!team) {
    const { data: membership } = await supabase
      .from('team_members')
      .select(`
        team_id,
        teams (
          *,
          team_members (*)
        )
      `)
      .eq('profile_id', user.id)
      .single();

    return membership?.teams || null;
  }
    return team;
  } catch {
    return null;
  }
}
