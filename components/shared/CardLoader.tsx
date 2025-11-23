'use client';
import React from 'react';

interface CardLoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

export const CardLoader: React.FC<CardLoaderProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 backdrop-blur-sm rounded-xl">
      <div className="flex flex-col items-center space-y-2">
        <div className={`${sizeClasses[size]} border-3 border-white/30 border-t-white rounded-full animate-spin`}></div>
        <p className="text-white text-xs font-medium">Loading...</p>
      </div>
    </div>
  );
};