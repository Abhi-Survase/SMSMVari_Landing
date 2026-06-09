import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const SendOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // Always 200 by design (anti-enumeration); just flip the UI
      setIsOtpSent(true);
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'OTP verification failed.');
        return;
      }

      // Pass email forward so ResetPassword knows who to reset
      navigate('/admin/reset-password', { state: { email } });
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {isOtpSent ? 'Verify your email' : 'Forgot password'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isOtpSent ? `We sent a code to ${email}` : 'Enter your email to receive a verification code'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input id="email-address" type="email" required disabled={isOtpSent} value={email} onChange={(e) => setEmail(e.target.value)}
                className={`block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${isOtpSent ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                placeholder="you@example.com" />
            </div>

            {isOtpSent && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Verification Code</label>
                  <button type="button" onClick={handleSendOtp} className="text-xs font-medium text-indigo-600 hover:text-indigo-500">Resend Code</button>
                </div>
                <input id="otp" type="text" maxLength="6" required value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-xl font-semibold tracking-widest text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="••••••" />
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className={`flex w-full justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed ${isOtpSent ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
            {loading ? 'Please wait…' : isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          <Link to="/admin" className="font-medium text-indigo-600 hover:text-indigo-500 inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SendOtp;