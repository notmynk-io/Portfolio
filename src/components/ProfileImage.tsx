import React from 'react';
import { BookOpen } from 'lucide-react';

interface ProfileImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  alt?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  className = '',
  size = 'md',
  alt = 'Mayank Kumar Gupta - AI Engineer & Developer',
}) => {
  // Official embedded profile picture for Mayank Kumar Gupta
  // High-resolution photo matching Mayank's tech engineer profile (glasses, dark hair, beard, burgundy shirt)
  const OFFICIAL_PROFILE_URL = "/profile.jpg";

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-24 h-24 text-xl',
    xl: 'w-36 h-36 sm:w-44 sm:h-44 text-3xl',
    hero: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 text-4xl',
  };

  return (
    <div
      className={`relative inline-block ${sizeClasses[size]} ${className}`}
      aria-label={alt}
    >
      {/* Outer Border & Glow Frame */}
      <div className="w-full h-full rounded-full p-1 bg-gradient-to-br from-cyan-400 via-purple-500 to-emerald-400 shadow-xl shadow-cyan-500/20 relative overflow-hidden flex items-center justify-center">
        <img
          src={OFFICIAL_PROFILE_URL}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};
