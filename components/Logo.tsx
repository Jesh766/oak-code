export function Logo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Oak & Code Logo"
    >
      <path
        d="M24 4C24 4 14 12 14 22C14 28 18 32 24 32C30 32 34 28 34 22C34 12 24 4 24 4Z"
        fill="#D4AF37"
        opacity="0.9"
      />
      <path
        d="M24 32V44"
        stroke="#8B5E3C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 36C20 36 18 38 16 40"
        stroke="#8B5E3C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M28 36C28 36 30 38 32 40"
        stroke="#8B5E3C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 18L18 24L24 30L30 24L24 18Z"
        stroke="#0D1F0D"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20 24H28"
        stroke="#0D1F0D"
        strokeWidth="1.5"
      />
      <path
        d="M24 20V28"
        stroke="#0D1F0D"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function LogoWithText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo className="w-9 h-9" />
      <div className="flex flex-col">
        <span className="font-display text-lg font-bold leading-tight text-white">
          Oak & Code
        </span>
        <span className="text-[10px] text-gold leading-tight hidden sm:block">
          Rooted in Strategy
        </span>
      </div>
    </div>
  );
}
