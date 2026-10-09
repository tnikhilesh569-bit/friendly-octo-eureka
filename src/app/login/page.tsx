'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeumorphicInput } from '@/components/ui/NeumorphicInput';
import { CustomButton } from '@/components/ui/CustomButton';
import { authenticateWithBiometric, isBiometricSupported } from '@/lib/biometricAuth';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate secure authentication (Supabase / Firebase integration point)
    setTimeout(() => {
      setAuth({ id: '1', email, name: 'Nikhil Tiwari' }, 'mock-jwt-token');
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  const handleBiometricLogin = async () => {
    const supported = await isBiometricSupported();
    if (!supported) {
      alert('Biometric authentication is not supported on this device.');
      return;
    }

    const result = await authenticateWithBiometric();
    if (result.success) {
      setAuth({ id: '1', email: 'nikhil@lumi.app', name: 'Nikhil Tiwari' }, 'mock-biometric-token');
      router.push('/dashboard');
    } else {
      alert(result.error || 'Biometric verification failed.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#F7F0EC]">
      <GlassCard className="w-full max-w-md p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#4A3B32] mb-2 tracking-wide">Lumi</h1>
          <p className="text-xs text-[#8C7A70] uppercase tracking-widest">Luxury Communication Platform</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <NeumorphicInput
            label="Email Address"
            type="email"
            placeholder="nikhil@lumi.app"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <NeumorphicInput
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <CustomButton type="submit" variant="primary" className="mt-2">
            {loading ? 'Authenticating...' : 'Sign In'}
          </CustomButton>
        </form>

        <div className="flex items-center my-2">
          <div className="flex-1 h-[1px] bg-[#e3d5cd]"></div>
          <span className="px-3 text-xs text-[#8C7A70] uppercase">or</span>
          <div className="flex-1 h-[1px] bg-[#e3d5cd]"></div>
        </div>

        <CustomButton type="button" variant="secondary" onClick={handleBiometricLogin}>
          Sign in with Biometrics (FaceID / TouchID)
        </CustomButton>
      </GlassCard>
    </main>
  );
}
