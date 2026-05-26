export function PeacockFeather({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 400"
      className={`opacity-50 ${className}`}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="featherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c9a227" />
          <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1a0a2e" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M60 10 Q45 120 55 200 Q65 280 60 390"
        stroke="url(#featherGrad)"
        strokeWidth="2"
        fill="none"
      />
      <ellipse cx="60" cy="80" rx="22" ry="35" fill="#1a0a2e" stroke="#c9a227" strokeWidth="0.8" />
      <circle cx="60" cy="80" r="10" fill="#0a0612" stroke="#e8d48b" strokeWidth="1" />
    </svg>
  );
}
