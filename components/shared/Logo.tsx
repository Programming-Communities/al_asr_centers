'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-[130px] sm:w-40 h-[60px]">
      {mounted ? (
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Al-Asr (Islamic Service)"
            width={100}
            height={50}
            className="cursor-pointer hover:opacity-90 transition-opacity w-full h-full object-contain" // Fixed
            priority
            style={{ 
              width: 'auto', 
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </Link>
      ) : (
        <div className="w-full h-full bg-gray-200 rounded animate-pulse"></div>
      )}
    </div>
  );
};

export default Logo;