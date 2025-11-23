'use client';
import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Type, Sun, Moon, Settings } from 'lucide-react';

interface ReadingControlsProps {
  onFontSizeChange?: (size: number) => void;
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

const ReadingControls: React.FC<ReadingControlsProps> = ({
  onFontSizeChange,
  onThemeChange
}) => {
  const [fontSize, setFontSize] = useState(100);
  const [isOpen, setIsOpen] = useState(false);
  const [readingTheme, setReadingTheme] = useState<'light' | 'dark'>('light');
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null);

  const fontSizes = [
    { label: 'A', value: 90, level: 'Small' },
    { label: 'A', value: 100, level: 'Normal' },
    { label: 'A+', value: 115, level: 'Large' },
    { label: 'A++', value: 130, level: 'X-Large' }
  ];

  // Auto close after 5 seconds of inactivity
  const startAutoCloseTimer = () => {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
    setAutoCloseTimer(timer);
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    onFontSizeChange?.(newSize);
    localStorage.setItem('readingFontSize', newSize.toString());
    startAutoCloseTimer(); // Reset timer on interaction
  };

  const handleThemeToggle = () => {
    const newTheme = readingTheme === 'light' ? 'dark' : 'light';
    setReadingTheme(newTheme);
    onThemeChange?.(newTheme);
    localStorage.setItem('readingTheme', newTheme);
    startAutoCloseTimer(); // Reset timer on interaction
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.findIndex(size => size.value === fontSize);
    if (currentIndex > 0) {
      handleFontSizeChange(fontSizes[currentIndex - 1].value);
    }
  };

  const increaseFontSize = () => {
    const currentIndex = fontSizes.findIndex(size => size.value === fontSize);
    if (currentIndex < fontSizes.length - 1) {
      handleFontSizeChange(fontSizes[currentIndex + 1].value);
    }
  };

  const toggleControls = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      startAutoCloseTimer();
    } else if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
  };

  // Load saved preferences
  useEffect(() => {
    const savedFontSize = localStorage.getItem('readingFontSize');
    const savedTheme = localStorage.getItem('readingTheme') as 'light' | 'dark';
    
    if (savedFontSize) {
      setFontSize(Number(savedFontSize));
    }
    if (savedTheme) {
      setReadingTheme(savedTheme);
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
    };
  }, [autoCloseTimer]);

  const currentFontSize = fontSizes.find(size => size.value === fontSize) || fontSizes[1];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Controls Panel */}
      {isOpen && (
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 mb-3 animate-in fade-in duration-300 slide-in-from-bottom-4"
          onMouseEnter={() => {
            if (autoCloseTimer) clearTimeout(autoCloseTimer);
          }}
          onMouseLeave={startAutoCloseTimer}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Reading Settings
            </h3>
            <div className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
              Auto-close in 5s
            </div>
          </div>

          {/* Font Size Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Text Size
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {currentFontSize.level}
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize === fontSizes[0].value}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-12 min-h-12"
                aria-label="Decrease font size"
              >
                <ZoomOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Font Size Indicators */}
              <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-900 rounded-xl p-1 flex-1 justify-center">
                {fontSizes.map((size, index) => (
                  <button
                    key={size.value}
                    onClick={() => handleFontSizeChange(size.value)}
                    className={`px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 min-w-14 min-h-12 flex items-center justify-center ${
                      fontSize === size.value
                        ? 'bg-red-600 text-white shadow-lg scale-105'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
                    }`}
                    aria-label={`Set font size to ${size.level}`}
                  >
                    {size.label}
                    {index > 1 && <sup className="text-xs">+</sup>}
                    {index > 2 && <sup className="text-xs">+</sup>}
                  </button>
                ))}
              </div>

              <button
                onClick={increaseFontSize}
                disabled={fontSize === fontSizes[fontSizes.length - 1].value}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-12 min-h-12"
                aria-label="Increase font size"
              >
                <ZoomIn className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Reading Theme
            </span>
            <button
              onClick={handleThemeToggle}
              className="relative inline-flex items-center p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 min-w-16 min-h-12 group"
              aria-label={`Switch to ${readingTheme === 'light' ? 'dark' : 'light'} theme`}
            >
              <div className="flex items-center gap-2">
                <Sun className={`w-4 h-4 transition-all duration-300 ${
                  readingTheme === 'light' 
                    ? 'text-orange-500 scale-110' 
                    : 'text-gray-400 scale-100'
                }`} />
                <div className="relative w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300">
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-lg ${
                    readingTheme === 'light' ? 'left-1' : 'left-5'
                  }`} />
                </div>
                <Moon className={`w-4 h-4 transition-all duration-300 ${
                  readingTheme === 'dark' 
                    ? 'text-blue-400 scale-110' 
                    : 'text-gray-400 scale-100'
                }`} />
              </div>
            </button>
          </div>

          {/* Current Settings Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-center text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Size:</span>
                <span className="font-medium">{currentFontSize.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Theme:</span>
                <span className="font-medium capitalize">{readingTheme}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={toggleControls}
        className={`bg-red-600 hover:bg-red-700 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen 
            ? 'rotate-45 scale-110 bg-red-700' 
            : 'hover:scale-110 hover:shadow-3xl'
        } min-w-14 min-h-14 flex items-center justify-center group relative`}
        aria-label={isOpen ? "Close reading settings" : "Open reading settings"}
      >
        {isOpen ? (
          <Settings className="w-6 h-6 animate-spin-once" />
        ) : (
          <Type className="w-6 h-6" />
        )}
        
        {/* Notification dot for active settings */}
        {(fontSize !== 100 || readingTheme !== 'light') && !isOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
        )}
      </button>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes spin-once {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(180deg); }
        }
        .animate-spin-once {
          animation: spin-once 0.3s ease-in-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ReadingControls;