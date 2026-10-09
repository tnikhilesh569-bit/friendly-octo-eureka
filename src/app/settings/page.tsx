'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CustomButton } from '@/components/ui/CustomButton';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <main className="min-h-screen pb-32 pt-6 px-4 max-w-2xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <GlassCard className="py-4">
        <h1 className="text-xl font-bold text-[#4A3B32]">Settings & Security</h1>
        <p className="text-xs text-[#8C7A70]">Manage your luxury profile and encrypted preferences</p>
      </GlassCard>

      {/* Profile Section */}
      <GlassCard className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-[#4A3B32] uppercase tracking-wider">Profile Information</h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full neumorphic-card-inset flex items-center justify-center text-[#D49B86] font-bold text-xl">
            {user?.name?.[0] || 'N'}
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#4A3B32]">{user?.name || 'Nikhil Tiwari'}</h3>
            <p className="text-xs text-[#8C7A70]">{user?.email || 'nikhil@lumi.app'}</p>
          </div>
        </div>
      </GlassCard>

      {/* Security & Biometrics */}
      <GlassCard className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-[#4A3B32] uppercase tracking-wider">Security & Privacy</h2>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-[#4A3B32]">Biometric Lock (FaceID / TouchID)</p>
            <p className="text-xs text-[#8C7A70]">Require authentication when opening app</p>
          </div>
          <input
            type="checkbox"
            checked={biometricEnabled}
            onChange={() => setBiometricEnabled(!biometricEnabled)}
            className="w-5 h-5 accent-[#E2B8A8] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2 border-t border-[#e3d5cd]">
          <div>
            <p className="text-sm font-medium text-[#4A3B32]">Push Notifications</p>
            <p className="text-xs text-[#8C7A70]">Receive real-time alerts for secure chats</p>
          </div>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="w-5 h-5 accent-[#E2B8A8] cursor-pointer"
          />
        </div>
      </GlassCard>

      {/* Logout Action */}
      <CustomButton variant="secondary" onClick={handleLogout} className="text-red-600 hover:bg-red-50">
        Sign Out of Lumi
      </CustomButton>

      <NavigationBar />
    </main>
  );
}
