import React from 'react'

export function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" x2="1">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#00d4ff" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="12" fill="#0f1724" />
      <g transform="translate(6,6)">
        <circle cx="26" cy="26" r="22" fill="url(#lg)" opacity="0.95" />
        <path d="M12 28c4-6 12-10 20-8" stroke="#081026" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85"/>
      </g>
    </svg>
  )
}

export default Logo
