import React from 'react';

export function PixelPlexoCoin({
  size = 160,
  variant = 'gold-p', // 'gold-p' | 'red-p' | 'smiley' | 'star'
  className = '',
  style = {}
}) {
  const isRed = variant === 'red-p';

  const bodyColor = isRed ? '#E52320' : '#FFC800';
  const highlightColor = isRed ? '#FF7A78' : '#FFF490';
  const shadowColor = isRed ? '#9B1311' : '#B37800';
  const innerRingColor = isRed ? '#6E0B09' : '#7A4D00';

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        filter: 'drop-shadow(6px 8px 0px #0F0F0F)',
        imageRendering: 'pixelated',
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
        aria-hidden="true"
      >
        {/* Pixel Coin Outer Black Border */}
        <rect x="10" y="2" width="12" height="2" fill="#0F0F0F" />
        <rect x="6" y="4" width="4" height="2" fill="#0F0F0F" />
        <rect x="22" y="4" width="4" height="2" fill="#0F0F0F" />
        <rect x="4" y="6" width="2" height="4" fill="#0F0F0F" />
        <rect x="26" y="6" width="2" height="4" fill="#0F0F0F" />
        <rect x="2" y="10" width="2" height="12" fill="#0F0F0F" />
        <rect x="28" y="10" width="2" height="12" fill="#0F0F0F" />
        <rect x="4" y="22" width="2" height="4" fill="#0F0F0F" />
        <rect x="26" y="22" width="2" height="4" fill="#0F0F0F" />
        <rect x="6" y="26" width="4" height="2" fill="#0F0F0F" />
        <rect x="22" y="26" width="4" height="2" fill="#0F0F0F" />
        <rect x="10" y="28" width="12" height="2" fill="#0F0F0F" />

        {/* Coin Main Body Background */}
        <rect x="10" y="4" width="12" height="24" fill={bodyColor} />
        <rect x="6" y="6" width="20" height="20" fill={bodyColor} />
        <rect x="4" y="10" width="24" height="12" fill={bodyColor} />

        {/* Pixel Highlight (Top-Left) */}
        <rect x="10" y="4" width="10" height="2" fill={highlightColor} />
        <rect x="6" y="6" width="4" height="4" fill={highlightColor} />
        <rect x="4" y="10" width="2" height="8" fill={highlightColor} />
        <rect x="6" y="10" width="2" height="4" fill={highlightColor} />

        {/* Pixel Shadow (Bottom-Right) */}
        <rect x="12" y="26" width="10" height="2" fill={shadowColor} />
        <rect x="22" y="22" width="4" height="4" fill={shadowColor} />
        <rect x="26" y="14" width="2" height="8" fill={shadowColor} />
        <rect x="24" y="18" width="2" height="4" fill={shadowColor} />

        {/* Inner Pixel Circle Ring */}
        <rect x="12" y="7" width="8" height="1" fill={innerRingColor} />
        <rect x="9" y="9" width="3" height="1" fill={innerRingColor} />
        <rect x="20" y="9" width="3" height="1" fill={innerRingColor} />
        <rect x="7" y="12" width="1" height="8" fill={innerRingColor} />
        <rect x="24" y="12" width="1" height="8" fill={innerRingColor} />
        <rect x="9" y="22" width="3" height="1" fill={innerRingColor} />
        <rect x="20" y="22" width="3" height="1" fill={innerRingColor} />
        <rect x="12" y="24" width="8" height="1" fill={innerRingColor} />

        {/* CENTER EMBLEM BASED ON VARIANT */}
        {(variant === 'gold-p' || variant === 'red-p') && (
          <>
            {/* Pixelated PLEXO 'P' Monogram */}
            <rect x="12" y="10" width="3" height="12" fill={isRed ? "#FFFFFF" : "#0F0F0F"} />
            <rect x="15" y="10" width="5" height="3" fill={isRed ? "#FFFFFF" : "#0F0F0F"} />
            <rect x="19" y="12" width="3" height="4" fill={isRed ? "#FFFFFF" : "#0F0F0F"} />
            <rect x="15" y="15" width="5" height="3" fill={isRed ? "#FFFFFF" : "#0F0F0F"} />
            {/* Inner cutout of P */}
            <rect x="15" y="13" width="2" height="1" fill={bodyColor} />
          </>
        )}

        {variant === 'smiley' && (
          <>
            {/* Pixelated Eyes */}
            <rect x="11" y="11" width="2" height="3" fill="#0F0F0F" />
            <rect x="19" y="11" width="2" height="3" fill="#0F0F0F" />
            {/* Pixelated Smile */}
            <rect x="10" y="17" width="2" height="2" fill="#0F0F0F" />
            <rect x="20" y="17" width="2" height="2" fill="#0F0F0F" />
            <rect x="12" y="19" width="8" height="2" fill="#0F0F0F" />
          </>
        )}

        {variant === 'star' && (
          <>
            {/* Pixelated Star */}
            <rect x="15" y="9" width="2" height="3" fill="#0F0F0F" />
            <rect x="14" y="12" width="4" height="2" fill="#0F0F0F" />
            <rect x="10" y="13" width="12" height="2" fill="#0F0F0F" />
            <rect x="12" y="15" width="8" height="3" fill="#0F0F0F" />
            <rect x="11" y="18" width="3" height="3" fill="#0F0F0F" />
            <rect x="18" y="18" width="3" height="3" fill="#0F0F0F" />
          </>
        )}
      </svg>
    </div>
  );
}
