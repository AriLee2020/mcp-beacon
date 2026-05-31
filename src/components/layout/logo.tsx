export function MCPBeaconLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#2563EB" />
      <path
        d="M16 4L28 16L16 28L4 16L16 4Z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="#3B82F6"
      />
      <circle cx="16" cy="16" r="4" fill="white" />
      <circle cx="16" cy="16" r="1.5" fill="#2563EB" />
      <line x1="16" y1="8" x2="16" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="20" x2="16" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="16" x2="20" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="16" x2="8" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
