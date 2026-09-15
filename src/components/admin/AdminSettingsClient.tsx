'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { InstituteSettings } from '@/types';

interface AdminSettingsClientProps {
  initialSettings: InstituteSettings;
}

export default function AdminSettingsClient({ initialSettings }: AdminSettingsClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<InstituteSettings>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to update settings');
      }

      setSuccess('Institute information & statistics successfully updated!');
      router.refresh();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Error updating settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Institute Identity */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <h2 className="text-base font-serif font-bold text-[#2A1810] border-b border-[#EFE6DD] pb-3">
          1. Institute Identity & Branding
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Short Name *</label>
            <input
              type="text"
              required
              value={settings.instituteName}
              onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Full Form of YLCC *</label>
            <input
              type="text"
              required
              value={settings.fullForm}
              onChange={(e) => setSettings({ ...settings, fullForm: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Institute Tagline *</label>
          <input
            type="text"
            required
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Institute Type</label>
            <input
              type="text"
              value={settings.instituteType}
              onChange={(e) => setSettings({ ...settings, instituteType: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Location City / State</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>
        </div>
      </div>

      {/* 2. Contact Coordinates */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <h2 className="text-base font-serif font-bold text-[#2A1810] border-b border-[#EFE6DD] pb-3">
          2. Contact Details & Official Coordinates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Phone Number *</label>
            <input
              type="text"
              required
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">WhatsApp Number *</label>
            <input
              type="text"
              required
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Official Email *</label>
            <input
              type="email"
              required
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Full Campus Address *</label>
          <input
            type="text"
            required
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Office & Lab Timings</label>
          <input
            type="text"
            value={settings.officeHours}
            onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
          />
        </div>
      </div>

      {/* 3. Website Statistics Counters */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <h2 className="text-base font-serif font-bold text-[#2A1810] border-b border-[#EFE6DD] pb-3">
          3. Live Statistics Counters (Rendered on Homepage)
        </h2>
        <p className="text-xs text-[#78716C]">
          Update these numbers as new batches graduate or new projects are added to avoid fixed claims.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Students Trained</label>
            <input
              type="number"
              value={settings.stats?.studentsTrained || 4200}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, studentsTrained: Number(e.target.value) },
                })
              }
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Practical Projects</label>
            <input
              type="number"
              value={settings.stats?.practicalProjectsCount || 16}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, practicalProjectsCount: Number(e.target.value) },
                })
              }
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Training Modules</label>
            <input
              type="number"
              value={settings.stats?.trainingModulesCount || 48}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, trainingModulesCount: Number(e.target.value) },
                })
              }
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Years Experience</label>
            <input
              type="number"
              value={settings.stats?.yearsExperience || 14}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, yearsExperience: Number(e.target.value) },
                })
              }
              className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
            />
          </div>
        </div>
      </div>

      {/* 4. Notice & Announcement Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <h2 className="text-base font-serif font-bold text-[#2A1810] border-b border-[#EFE6DD] pb-3">
          4. Top Announcement Bar Text
        </h2>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">
            Announcement Text (Shown in Top Navigation)
          </label>
          <input
            type="text"
            value={settings.announcementBarText || ''}
            onChange={(e) => setSettings({ ...settings, announcementBarText: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Institute Settings</span>
        </button>
      </div>
    </form>
  );
}
