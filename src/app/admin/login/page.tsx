'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  KeyRound,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@ylcccommerce.in');
  const [password, setPassword] = useState('YLCCAdmin#2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid administrative credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#192538] via-[#141E2E] to-[#0F172A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#D4C5AD] shadow-2xl p-8 sm:p-10 space-y-6">
        {/* Emblem Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#192538] text-white flex items-center justify-center font-serif text-2xl font-bold mx-auto border-2 border-[#8C6527] shadow-md">
            YL
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C6527]">
            Yukti Ledger & Commerce Centre
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#192538]">
            Administrative Portal
          </h1>
          <p className="text-xs text-[#6B6357]">
            Authorized personnel only. All access is logged and audited.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C6527] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ylcccommerce.in"
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C6527] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#192538]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#E2D7C3] text-[11px] text-[#57534E] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#8C6527]">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Default Credentials (Pre-filled for Testing):</span>
            </div>
            <div>User: <code>admin@ylcccommerce.in</code></div>
            <div>Pass: <code>YLCCAdmin#2026!</code></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8C6527] hover:bg-[#74511D] text-white py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Suite</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-[#78716C] hover:text-[#192538] hover:underline"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
