'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TimeInForm() {
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) {
      setError('Employee ID is required.');
      return;
    }
    if (!/^[A-Za-z0-9]{3,10}$/.test(id)) {
      setError('ID must be 3–10 alphanumeric chars.');
      return;
    }
    setError('');
    console.log('Time-in for', id);
    setId('');
    // Example: navigate or optimistically update UI
    router.push('/time-in');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white border-2 border-gray-900 rounded-3xl p-6 shadow-lg flex flex-col space-y-6"
      noValidate
    >
      <label htmlFor="emp-id" className="font-medium text-black">
        Employee ID
      </label>
      <input
        id="emp-id"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} // sanitize
        placeholder="3–10 chars"
        className="w-full text-center py-3 text-lg border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 text-black"
        aria-invalid={!!error}
        aria-describedby={error ? 'id-error' : undefined}
      />
      {error && (
        <p id="id-error" className="text-red-600 font-medium">
          {error}
        </p>
      )}
      <button
        type="submit"
        onClick={handleSubmit}
        className="py-3 text-lg font-semibold text-gray-900 bg-pink-300 rounded-2xl border-2 border-gray-900 shadow hover:bg-pink-400 transition"
      >
        Time-in
      </button>
    </form>
  );
}