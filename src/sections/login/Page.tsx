'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

/* ── Icons ─────────────────────────────────────────────────── */

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M4.16663 10H15.8333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 4.16669L15.8333 10L10 15.8334"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22C55E"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M15.8334 10H4.16669"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 15.8334L4.16669 10L10 4.16669"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Step 1: Phone Number ──────────────────────────────────── */

interface Step1Props {
  phone: string;
  onPhoneChange: (val: string) => void;
  onSubmit: () => void;
}

function Step1({ phone, onPhoneChange, onSubmit }: Step1Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2
          style={{
            color: '#FFF',
            fontFamily: '"Gabarito", sans-serif',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
          }}
        >
          Login or Sign Up
        </h2>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
        >
          Enter your phone number to continue
        </p>
      </div>

      {/* Phone Input */}
      <div className="flex flex-col gap-3">
        <div
          className="flex items-center w-full focus-within:border-[#F7941D]/60 transition-colors"
          style={{
            padding: '0 4px 0 0',
            borderRadius: '18px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            background: '#1D1D1F',
          }}
        >
          <span
            className="shrink-0 text-white select-none"
            style={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '20px',
              padding: '16px 20px 16px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRight: '1px solid rgba(255, 255, 255, 0.0)',
              borderTopLeftRadius: '17px',
              borderBottomLeftRadius: '17px',
            }}
          >
            +880
          </span>
          <input
            type="tel"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
            style={{
              padding: '16px 4px 16px 12px',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '20px',
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={phone.length < 10}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] cursor-pointer transition-all duration-300 hover:bg-[#d87c12] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F7941D]"
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '20px',
          }}
        >
          Continue
          <ArrowRightIcon />
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/15" />
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.40)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          or
        </span>
        <div className="flex-1 h-px bg-white/15" />
      </div>

      {/* Continue with Google */}
      <button
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-[18px] cursor-pointer transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.25)',
          background: 'transparent',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
          color: '#FFF',
        }}
      >
        <GoogleIcon />
        Continue with Google
      </button>
    </div>
  );
}

/* ── Step 2: OTP Verification ──────────────────────────────── */

interface Step2Props {
  phone: string;
  onVerify: () => void;
  onBack: () => void;
}

function Step2({ phone, onVerify, onBack }: Step2Props) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState(5 * 60); // 5 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return; // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // Take only last character
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = Array(6).fill('');
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    // Focus the last filled input or the next empty one
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }, []);

  const handleResend = () => {
    setTimer(5 * 60);
    setOtp(Array(6).fill(''));
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every((digit) => digit !== '');

  return (
    <div className="flex flex-col gap-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-white/60 hover:text-[#F7941D] transition-colors cursor-pointer self-start"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        <BackArrowIcon />
        Back
      </button>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2
          style={{
            color: '#FFF',
            fontFamily: '"Gabarito", sans-serif',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
          }}
        >
          Verify your Number
        </h2>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
        >
          We sent a 6-digit code to{' '}
          <span style={{ color: '#F7941D' }}>+880 {phone}</span>
        </p>
      </div>

      {/* OTP Input Boxes */}
      <div className="flex gap-3 justify-center" onPaste={handlePaste}>
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="text-center text-white focus:outline-none focus:border-[#F7941D] transition-colors"
            style={{
              width: '52px',
              height: '56px',
              borderRadius: '14px',
              border: digit
                ? '1px solid #F7941D'
                : '1px solid rgba(255, 255, 255, 0.25)',
              background: '#1D1D1F',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '22px',
              fontWeight: 600,
              lineHeight: '28px',
            }}
          />
        ))}
      </div>

      {/* Timer & Resend */}
      <div className="flex items-center justify-between">
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.50)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          Time remaining:{' '}
          <span style={{ color: timer > 60 ? '#F7941D' : '#EF4444', fontWeight: 600 }}>
            {formatTimer(timer)}
          </span>
        </p>
        <button
          onClick={handleResend}
          disabled={timer > 0}
          className="transition-colors cursor-pointer disabled:cursor-not-allowed"
          style={{
            color: timer > 0 ? 'rgba(255, 255, 255, 0.25)' : '#F7941D',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
          }}
        >
          Resend OTP
        </button>
      </div>

      {/* Verify Button */}
      <button
        onClick={onVerify}
        disabled={!isComplete}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] cursor-pointer transition-all duration-300 hover:bg-[#d87c12] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F7941D]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
      >
        Verify
        <ArrowRightIcon />
      </button>
    </div>
  );
}

/* ── Step 3: Full Name (New Users) ─────────────────────────── */

interface Step3Props {
  name: string;
  onNameChange: (val: string) => void;
  onContinue: () => void;
}

function Step3({ name, onNameChange, onContinue }: Step3Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2
          style={{
            color: '#FFF',
            fontFamily: '"Gabarito", sans-serif',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
          }}
        >
          Complete your Profile
        </h2>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
        >
          Tell us your name so we can personalize your experience
        </p>
      </div>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter your Full Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="w-full text-white placeholder:text-white/50 focus:outline-none focus:border-[#F7941D]/60 transition-colors"
        style={{
          display: 'flex',
          padding: '16px 4px 16px 24px',
          alignItems: 'center',
          gap: '24px',
          alignSelf: 'stretch',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          background: '#1D1D1F',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '20px',
        }}
      />

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={name.trim().length < 2}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] cursor-pointer transition-all duration-300 hover:bg-[#d87c12] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F7941D]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
      >
        Continue
        <ArrowRightIcon />
      </button>
    </div>
  );
}

/* ── Main LoginPage Component ──────────────────────────────── */

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate: every other phone number is a "new user"
  const isNewUser = true;

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      setStep(2);
    }
  };

  const handleOtpVerify = () => {
    if (isNewUser) {
      setStep(3);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2500);
    }
  };

  const handleNameContinue = () => {
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 2500);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center font-[family-name:var(--font-opensans)]">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none opacity-95">
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse at center top, rgba(247, 148, 29, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Card Container */}
      <div
        className="relative z-10 w-full max-w-[460px] mx-4"
        style={{
          borderRadius: '24px',
          border: '1px solid rgba(255, 240, 222, 0.1)',
          background: 'rgba(255, 240, 222, 0.03)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="p-8 md:p-10">
          {/* Steps */}
          {step === 1 && (
            <Step1
              phone={phone}
              onPhoneChange={setPhone}
              onSubmit={handlePhoneSubmit}
            />
          )}

          {step === 2 && (
            <Step2
              phone={phone}
              onVerify={handleOtpVerify}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <Step3
              name={name}
              onNameChange={setName}
              onContinue={handleNameContinue}
            />
          )}
        </div>
      </div>

      {/* Success Alert (Toast from top) */}
      {showSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[400px] px-4 animate-in fade-in slide-in-from-top-8 duration-500">
          <Alert
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '14px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px -10px rgba(34, 197, 94, 0.2)'
            }}
          >
            <CheckCircleIcon />
            <AlertTitle
              style={{
                color: '#22C55E',
                fontFamily: '"Gabarito", sans-serif',
                fontWeight: 600,
              }}
            >
              Login Successful!
            </AlertTitle>
            <AlertDescription
              style={{
                color: 'rgba(255, 255, 255, 0.60)',
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '14px',
              }}
            >
              Welcome to PetGo Care. Redirecting you to the homepage...
            </AlertDescription>
          </Alert>
        </div>
      )}
    </section>
  );
}
