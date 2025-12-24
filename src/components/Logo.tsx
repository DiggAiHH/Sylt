import React from "react";

interface LogoProps {
  brandName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({
  brandName,
  size = "md",
  className = "",
}: LogoProps) {
  const sizes = {
    sm: { width: 80, height: 80, fontSize: "text-xs" },
    md: { width: 120, height: 120, fontSize: "text-sm" },
    lg: { width: 160, height: 160, fontSize: "text-base" },
  };

  const { width, height, fontSize } = sizes[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform hover:scale-105"
        aria-label={`${brandName} Logo`}
      >
        {/* Outer circle - Deep Sea Blue */}
        <circle cx="60" cy="60" r="58" stroke="#0A2540" strokeWidth="4" fill="none" />
        
        {/* Inner decorative ring - Rich Gold */}
        <circle cx="60" cy="60" r="50" stroke="#C9A962" strokeWidth="2" fill="none" />
        
        {/* Wave pattern at bottom */}
        <path
          d="M20 75 Q30 65 40 75 Q50 85 60 75 Q70 65 80 75 Q90 85 100 75"
          stroke="#0A2540"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Anchor or fish symbol placeholder */}
        <text
          x="60"
          y="55"
          textAnchor="middle"
          fill="#0A2540"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          className={fontSize}
          style={{ fontSize: "28px" }}
        >
          ⚓
        </text>
        
        {/* Brand initial */}
        <text
          x="60"
          y="40"
          textAnchor="middle"
          fill="#C9A962"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          style={{ fontSize: "18px" }}
        >
          {brandName.charAt(0)}
        </text>
      </svg>
    </div>
  );
}
