/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, Film } from 'lucide-react';

interface CinematicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  shotCode?: string;
  aspectRatioClass?: string;
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  shotCode,
  aspectRatioClass = 'aspect-[16/9]',
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasTriedFallback, setHasTriedFallback] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleError = () => {
    if (!hasTriedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div 
        className={`relative w-full ${aspectRatioClass} bg-[#121218] border border-zinc-800 rounded-lg overflow-hidden flex flex-col items-center justify-center p-4 text-center select-none`}
        role="img"
        aria-label={alt}
      >
        {/* Cinema Viewfinder Grid Lines */}
        <div className="absolute inset-2 border border-zinc-700/50 rounded pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-800/60 pointer-events-none" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800/60 pointer-events-none" />

        {/* Viewfinder Corner Reticles */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-rose-500/80 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-rose-500/80 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-rose-500/80 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-rose-500/80 pointer-events-none" />

        {/* HUD Info */}
        <div className="relative z-10 space-y-1.5 flex flex-col items-center max-w-[85%]">
          <div className="p-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-rose-400">
            <Camera className="w-5 h-5" />
          </div>
          {shotCode && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-600/30 text-rose-300 border border-rose-500/40">
              {shotCode}
            </span>
          )}
          <p className="text-xs font-medium text-zinc-300 truncate max-w-full font-sans">
            {alt}
          </p>
          <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 pt-0.5">
            <Film className="w-3 h-3 text-pink-400" />
            <span>2.39:1 CINEMASCOPE PREVIEW</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatioClass} bg-[#0e0e13] overflow-hidden`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        {...rest}
      />
    </div>
  );
};
