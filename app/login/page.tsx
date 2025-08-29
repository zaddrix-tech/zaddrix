'use client'
import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-4xl flex flex-row rounded-3xl shadow-xl overflow-hidden border border-teal-400">
        {/* Left: Google Login Button */}
        <div className="flex flex-col justify-center items-center flex-1 px-12 py-16 bg-white">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Welcome back</h1>
          <button
            className="w-full max-w-xs flex items-center justify-center gap-3 py-4 rounded-full bg-black text-white font-semibold text-lg mt-4 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => window.location.href = '/api/auth/google'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M21.35 11.1H12.18V13.89H17.97C17.44 16.09 15.54 17.7 12.18 17.7C8.64 17.7 5.82 14.88 5.82 11.34C5.82 7.8 8.64 4.98 12.18 4.98C13.74 4.98 15.13 5.54 16.18 6.5L18.36 4.32C16.68 2.82 14.56 1.9 12.18 1.9C6.84 1.9 2.36 6.38 2.36 11.72C2.36 17.06 6.84 21.54 12.18 21.54C17.52 21.54 22 17.06 22 11.72C22 11.22 21.95 10.66 21.35 11.1Z" fill="#4285F4"></path>
              </g>
            </svg>
            Sign in with Google
          </button>
        </div>
        {/* Right: Quote */}
        <div className="flex flex-col justify-center items-center flex-1 px-12 py-16 bg-black text-white relative">
          <div className="mb-8">
            <div className="rounded-lg p-4 inline-block mb-6 bg-gray-900"> 
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H7z"/></svg>
            </div>
            <p className="text-2xl md:text-3xl font-semibold leading-snug max-w-md">“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”</p>
          </div>
          <div className="flex items-center mt-8">
            <img src="/avatar.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-4 object-cover" />
            <div>
              <div className="font-semibold">Leslie Alexander</div>
              <div className="text-sm text-gray-400">React Developer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
