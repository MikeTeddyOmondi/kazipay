"use client";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Env
const API_SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export default function TimeInForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  // const _router = useRouter();

  // Simple regex: digits only, length 10-15
  const phonePattern = /^\d{10,15}$/;

  // Env
  const API_SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!phonePattern.test(phone)) {
      setError("Enter a valid phone (10–15 digits).");
      return;
    }
    setError("");
    console.log("Time-in for: ", phone);
    const response = await fetch(`${API_SERVER_URL}/api/v1/time-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: `${"+" + String(phone)}` }),
    });

    const jsonBody = await response.json();
    console.log({ jsonBody });
    setPhone("");
    toast(
      jsonBody?.message
        ? jsonBody?.message
        : "Onboarded successfully. Please use your device to activate!"
    );
    setPhone("");

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white border-2 border-gray-900 rounded-3xl p-6 shadow-lg flex flex-col space-y-6"
      noValidate
    >
      <label htmlFor="emp-id" className="font-medium text-black">
        Worker's Phone Number
      </label>
      <input
        id="emp-id"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))} // sanitize
        placeholder="Phone number"
        className="w-full text-center py-3 text-lg border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 text-black"
        aria-invalid={!!error}
        aria-describedby={error ? "id-error" : undefined}
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
