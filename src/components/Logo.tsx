import React from "react";

interface LogoProps {
  brandName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Brand-specific symbols
const getBrandSymbol = (brandName: string): string => {
  const name = brandName.toLowerCase();
  if (name.includes("fisch")) return "🐟";
  if (name.includes("seafood")) return "🦐";
  if (name.includes("homes")) return "🏡";
  if (name.includes("long island") || name.includes("house")) return "🏠";
  return "⚓"; // Default anchor for BLUM
};

export default function Logo({
  brandName,
  size = "md",
  className = "",
}: LogoProps) {
  const sizes = {
    sm: { width: 80, height: 80, symbolFontSize: 20, initialFontSize: 14 },
    md: { width: 120, height: 120, symbolFontSize: 28, initialFontSize: 18 },
    lg: { width: 160, height: 160, symbolFontSize: 36, initialFontSize: 24 },
  };

  const { width, height, symbolFontSize, initialFontSize } = sizes[size];
  const symbol = getBrandSymbol(brandName);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 hover:scale-105 drop-shadow-lg"
        aria-label={`${brandName} Logo`}
      >
        {/* Background circle with gradient effect */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A2540" />
            <stop offset="100%" stopColor="#081E34" />
          </linearGradient>
        </defs>
        
        {/* Filled background circle with fallback color */}
        <circle cx="60" cy="60" r="58" fill="#0A2540" />
        <circle cx="60" cy="60" r="58" fill="url(#logoGradient)" />
        
        {/* Inner decorative ring - Rich Gold */}
        <circle cx="60" cy="60" r="50" stroke="#C9A962" strokeWidth="2" fill="none" />
        
        {/* Wave pattern at bottom */}
        <path
          d="M20 80 Q30 70 40 80 Q50 90 60 80 Q70 70 80 80 Q90 90 100 80"
          stroke="#C9A962"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Brand symbol */}
        <text
          x="60"
          y="58"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          style={{ fontSize: `${symbolFontSize}px` }}
        >
          {symbol}
        </text>
        
        {/* Brand initial at top */}
        <text
          x="60"
          y="30"
          textAnchor="middle"
          fill="#C9A962"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          style={{ fontSize: `${initialFontSize}px` }}
        >
          {brandName.charAt(0)}
        </text>
      </svg>
    </div>
  );
}
