"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/shared/AuthModal';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<'invest' | 'raise' | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleInvestClick = () => {
    if (user) {
      router.push('/investor-home');
    } else {
      setAuthAction('invest');
      setShowAuthModal(true);
    }
  };

  const handleRaiseClick = () => {
    if (user) {
      router.push('/raise');
    } else {
      setAuthAction('raise');
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    if (authAction === 'invest') {
      router.push('/investor-home');
    } else if (authAction === 'raise') {
      router.push('/raise');
    }
  };

  const handleJoinWaitlist = () => {
    alert('Thank you for your interest! We will notify you soon.');
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: '#000' }}>
      {/* Header */}
      <header className="flex justify-between items-center px-16 py-6 relative z-10">
        <div className="flex items-center gap-4">
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <div className="flex items-center gap-5">
              <span className="text-sm text-gray-300">Welcome, {user.name}</span>
              <Button
                variant="outline"
                onClick={() => router.push('/portfolio')}
                className="border-[#c79a5f] text-[#c79a5f] hover:bg-[#c79a5f] hover:text-white"
              >
                Portfolio
              </Button>
            </div>
          ) : (
            <button
              onClick={() => window.open('https://discord.gg/your-invite-link', '_blank')}
              className="flex items-center gap-2 bg-transparent hover:opacity-80 transition-opacity"
            >
              <span className="font-inria-sans" style={{ color: '#C2C2C2', fontSize: '20px', fontWeight: 700, lineHeight: 'normal' }}>Join Early User Community</span>
              <Image
                src="/images/Discord.svg"
                alt="Discord"
                width={24}
                height={24}
                className="object-contain"
              />
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-8 py-16 relative">
        {/* Golden ring glow effect behind all elements */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none z-0"
          style={{
            width: '1022px',
            height: '900px',
            borderRadius: '1022px',
            background: 'radial-gradient(50% 50% at 50% 50%, #FFDD0000 20.19%, #B8951833 62.02%, #73737300 100%)',
            flexShrink: 0
          }}
        />
        
        <div className="text-center max-w-4xl z-10 relative">
          {/* Logo */}
          <div className="flex flex-row items-end justify-center gap-4 mb-8">
            <Image 
              src="/images/charon_logo.png" 
              alt="Charon Logo" 
              width={180}
              height={180}
              className="object-contain translate-y-4"
              priority
            />
            <h1 
              className="text-8xl font-extrabold tracking-[0.05em] mb-0"
              style={{ fontFamily: 'var(--font-lalezar)' }}
            >
              CHAR<span className="bg-gradient-to-r from-[#c79a5f] to-[#f4d592] bg-clip-text text-transparent">ON</span>
            </h1>
          </div>
          
          <p className="text-2xl mb-8 font-bold tracking-wide font-inria-sans" style={{ color: '#C6C6C6' }}>
            Raise from users, manage on-chain
          </p>

          <div className="flex gap-8 justify-center mb-8">
            <button
              className="px-20 py-2 text-lg font-bold border-2 border-dashed border-white/60 bg-transparent hover:border-[#c79a5f] hover:bg-[#c79a5f]/20 transition-all tracking-wider rounded-lg min-w-[180px] cursor-default font-inria-sans"
              style={{ color: '#C6C6C6' }}
            >
              Raise
            </button>
            <button
              className="px-20 py-2 text-lg font-bold border-2 border-dashed border-white/60 bg-transparent hover:border-[#c79a5f] hover:bg-[#c79a5f]/20 transition-all tracking-wider rounded-lg min-w-[180px] cursor-default font-inria-sans"
              style={{ color: '#C6C6C6' }}
            >
              Invest
            </button>
          </div>
          
          <Button
            onClick={handleJoinWaitlist}
            size="lg"
            className="px-12 py-6 text-base font-bold bg-gradient-to-br from-[#A0542B] to-[#F4B931] hover:shadow-[0_6px_30px_rgba(199,154,95,0.5)] transition-all tracking-wider font-inria-sans"
            style={{ color: '#FFFFFF' }}
          >
            JOIN WAITLIST
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-16 text-center">
          <div className="text-base font-bold mb-5 tracking-[0.15em] font-inria-sans" style={{ color: '#C2C2C2' }}>Built By</div>
          <div className="flex justify-center items-center gap-10 flex-wrap">
            <Image
              src="/images/Goldman_Sachs.svg"
              alt="Goldman Sachs"
              width={65}
              height={25}
              className="object-contain opacity-100"
            />
            <Image
              src="/images/Circle.svg"
              alt="Circle"
              width={50}
              height={50}
              className="object-contain opacity-100"
            />
            <Image
              src="/images/J_P_Morgan.svg"
              alt="J.P. Morgan"
              width={80}
              height={30}
              className="object-contain opacity-100"
            />
            <Image
              src="/images/Amazon.svg"
              alt="Amazon"
              width={65}
              height={25}
              className="object-contain opacity-100"
            />
            <Image
              src="/images/Salesforce.svg"
              alt="Salesforce"
              width={80}
              height={30}
              className="object-contain opacity-100"
            />
          </div>
        </footer>
      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </div>
  );
}

