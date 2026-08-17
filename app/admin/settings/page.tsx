'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  LogOut,
} from 'lucide-react';
import { LogoWithText } from '@/components/Logo';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] =
    useState('');

  const [newPassword, setNewPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const passwordChecks = {
    length: newPassword.length >= 12,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const strongPassword = Object.values(
    passwordChecks
  ).every(Boolean);

  const passwordsMatch =
    newPassword.length > 0 &&
    newPassword === confirmPassword;

  const handleChangePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSuccess(false);

    if (!currentPassword) {
      toast.error('Enter your current password.');
      return;
    }

    if (!strongPassword) {
      toast.error(
        'Please choose a stronger password.'
      );
      return;
    }

    if (!passwordsMatch) {
      toast.error('New passwords do not match.');
      return;
    }

    if (
      currentPassword === newPassword
    ) {
      toast.error(
        'Your new password must be different.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        '/api/admin/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error(
            'Your current password is incorrect or your session has expired.'
          );
        } else {
          toast.error(
            data.error ||
              'Unable to change password.'
          );
        }

        return;
      }

      setSuccess(true);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      toast.success(
        'Password changed successfully!'
      );

      /*
       * The current JWT was created using the old
       * password only indirectly, so it remains valid
       * until its expiry. We log the admin out anyway
       * so the new credentials are required.
       */

      setTimeout(async () => {
        await fetch('/api/admin/login', {
          method: 'DELETE',
        });

        router.push('/admin');
      }, 1800);
    } catch (error) {
      console.error(
        '[Change Password]',
        error
      );

      toast.error(
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', {
      method: 'DELETE',
    });

    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-primary-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-forest/30 border-r border-gold/10 p-6 flex flex-col">
        <LogoWithText className="mb-8" />

        <nav className="space-y-2 flex-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-cream/70 hover:text-gold hover:bg-gold/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>

          <Link
            href="/admin/contacts"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-cream/70 hover:text-gold hover:bg-gold/10 transition-all"
          >
            Contacts
          </Link>

          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-cream/70 hover:text-gold hover:bg-gold/10 transition-all"
          >
            Projects
          </Link>

          <Link
            href="/admin/testimonials"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-cream/70 hover:text-gold hover:bg-gold/10 transition-all"
          >
            Testimonials
          </Link>

          <Link
            href="/admin/blog"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-cream/70 hover:text-gold hover:bg-gold/10 transition-all"
          >
            Blog
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gold bg-gold/10 transition-all"
          >
            <Lock className="w-4 h-4" />
            Settings
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-cream/50 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl">
          <div className="mb-8">
            <p className="text-gold text-sm uppercase tracking-[0.2em] mb-2">
              Admin
            </p>

            <h1 className="font-display text-3xl font-bold text-cream">
              Settings
            </h1>

            <p className="text-cream/50 mt-2">
              Manage your administrator account.
            </p>
          </div>

          {/* Success */}
          {success && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-400/20 bg-green-400/10 p-4">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />

              <div>
                <p className="text-green-400 font-medium">
                  Password changed successfully.
                </p>

                <p className="text-cream/50 text-sm mt-1">
                  You will be logged out and asked
                  to sign in with your new password.
                </p>
              </div>
            </div>
          )}

          {/* Password Card */}
          <section className="bg-forest/30 border border-gold/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-gold" />
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-cream">
                  Change Password
                </h2>

                <p className="text-sm text-cream/50">
                  Update your administrator password.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleChangePassword}
              className="space-y-5"
            >
              {/* Current */}
              <div>
                <label className="block text-sm text-cream/70 mb-2">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showCurrent
                        ? 'text'
                        : 'password'
                    }
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(
                        e.target.value
                      )
                    }
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 bg-primary-dark border border-gold/20 rounded-lg text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50"
                    placeholder="Enter current password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrent(
                        !showCurrent
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold"
                    aria-label={
                      showCurrent
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showCurrent ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New */}
              <div>
                <label className="block text-sm text-cream/70 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showNew
                        ? 'text'
                        : 'password'
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 bg-primary-dark border border-gold/20 rounded-lg text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50"
                    placeholder="Create a strong password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold"
                    aria-label={
                      showNew
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showNew ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password rules */}
              {newPassword && (
                <div className="rounded-xl border border-gold/10 bg-primary-dark/50 p-4">
                  <p className="text-xs text-cream/50 mb-3">
                    Password requirements
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <PasswordRule
                      valid={passwordChecks.length}
                      text="At least 12 characters"
                    />

                    <PasswordRule
                      valid={passwordChecks.uppercase}
                      text="One uppercase letter"
                    />

                    <PasswordRule
                      valid={passwordChecks.lowercase}
                      text="One lowercase letter"
                    />

                    <PasswordRule
                      valid={passwordChecks.number}
                      text="One number"
                    />

                    <PasswordRule
                      valid={passwordChecks.special}
                      text="One special character"
                    />
                  </div>
                </div>
              )}

              {/* Confirm */}
              <div>
                <label className="block text-sm text-cream/70 mb-2">
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirm
                        ? 'text'
                        : 'password'
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 bg-primary-dark border border-gold/20 rounded-lg text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50"
                    placeholder="Repeat your new password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(
                        !showConfirm
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold"
                    aria-label={
                      showConfirm
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showConfirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {confirmPassword &&
                  !passwordsMatch && (
                    <p className="text-red-400 text-xs mt-2">
                      Passwords do not match.
                    </p>
                  )}
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />

                <p className="text-sm text-cream/60">
                  After changing your password,
                  you'll be logged out and need to
                  sign in again using the new
                  password.
                </p>
              </div>

              <Button
                type="submit"
                loading={loading}
                disabled={
                  loading ||
                  !strongPassword ||
                  !passwordsMatch ||
                  !currentPassword
                }
                className="w-full md:w-auto"
              >
                Change Password
              </Button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {valid ? (
        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5 text-cream/30" />
      )}

      <span
        className={
          valid
            ? 'text-green-400'
            : 'text-cream/40'
        }
      >
        {text}
      </span>
    </div>
  );
}