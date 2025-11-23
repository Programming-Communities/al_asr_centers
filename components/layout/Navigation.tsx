'use client';
import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        Home
      </Link>
      {/* ❌ Categories link REMOVED */}
      <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        About
      </Link>
      <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        Services
      </Link>
      <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        Contact
      </Link>
    </nav>
  );
};

export default Navigation;