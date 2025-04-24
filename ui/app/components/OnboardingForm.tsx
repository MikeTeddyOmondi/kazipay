'use client';
import React, { useState } from 'react';

export default function OnboardingForm() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Simple regex: digits only, length 10-15
  const phonePattern = /^\d{10,15}$/;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Phone number is required.');
      return;
    }
    if (!phonePattern.test(phone)) {
      setError('Enter a valid phone (10–15 digits).');
      return;
    }
    setError('');
    // TODO: send to API / server for optional server-side validation
    console.log('Onboarding with', phone);
    setPhone('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white border-2 border-gray-900 rounded-3xl p-6 shadow-lg flex flex-col space-y-6"
      noValidate  // disable browser default tooltips
    >
      <label htmlFor="phone" className="font-medium text-black">
        Phone Number
      </label>
      <input
        id="phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}  // sanitize digits only
        placeholder="e.g. 0712345678"
        className="w-full text-center py-3 text-lg border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 text-black"
        aria-invalid={!!error}
        aria-describedby={error ? 'phone-error' : undefined}
      />
      {error && (
        <p id="phone-error" className="text-red-600 font-medium">
          {error}
        </p>
      )}
      <button
        type="submit"
        onClick={handleSubmit}
        className="py-3 text-lg font-semibold text-gray-900 bg-pink-300 rounded-2xl border-2 border-gray-900 shadow hover:bg-pink-400 transition"
      >
        Onboard
      </button>
    </form>
  );
}