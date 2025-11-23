'use client';
import React from 'react';

const LanguageSwitcher: React.FC = () => {
  return (
    <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500">
      <option value="en">English</option>
      <option value="ur">Urdu</option>
      <option value="ar">Arabic</option>
    </select>
  );
};

export default LanguageSwitcher;