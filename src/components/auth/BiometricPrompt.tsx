import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CustomButton } from '@/components/ui/CustomButton';

interface BiometricPromptProps {
  onAuthenticate: () => void;
  isOpen: boolean;
}

export const BiometricPrompt: React.FC<BiometricPromptProps> = ({ onAuthenticate, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#4A3B32]/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-sm text-center flex flex-col items-center gap-6 p-8">
        {/* Fingerprint/Face ID Icon */}
        <div className="w-20 h-20 rounded-full neumorphic-card-inset flex items-center justify-center text-[#D49B86]">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.115 6.845l.088-.135A18.89 18.89 0 0016 11.237a6 6 0 00-12 0c0 1.765.367 3.445 1.033 4.965" />
          </svg>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#4A3B32] mb-2">Unlock Lumi</h3>
          <p className="text-xs text-[#8C7A70] leading-relaxed">
            Verify your identity using your device biometrics (Touch ID / Face ID) to access your secure chats.
          </p>
        </div>

        <CustomButton onClick={onAuthenticate} variant="primary">
          Verify Biometrics
        </CustomButton>
      </GlassCard>
    </div>
  );
};
