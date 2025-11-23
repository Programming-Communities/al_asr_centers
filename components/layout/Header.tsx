'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Logo from '../shared/Logo';
import Navigation from './Navigation';
import ThemeToggle from '../shared/ThemeToggle';
import SearchBar from '../shared/SearchBar';
import MobileMenu from '../shared/MobileMenu';
import CategoriesNavbar from './CategoriesNavbar';
import SidebarMenu from './SidebarMenu';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simple canvas background setup (no animation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Fill background gradient (static, lightweight)
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(127, 29, 29, 0.15)');
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0.08)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const handleSidebarClose = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <header className="relative bg-red-950 text-white overflow-hidden">
      {/* Canvas for static background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Main Header */}
        <div className="py-8 px-5 md:px-12 lg:px-28">
          <div className="flex justify-between items-center">
            <Logo />
            <Navigation />
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <SearchBar />
              </div>

              {/* Sidebar Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="hidden md:flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 min-h-11"
                aria-label="Open main menu"
                aria-expanded={isSidebarOpen}
                aria-controls="sidebar-menu"
              >
                <Menu className="w-4 h-4" />
                <span className="text-sm font-medium">Menu</span>
              </button>

              <MobileMenu />
              <ThemeToggle />
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-center my-12">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
              Al-Asr Islamic Service
            </h1>
            <p className="mt-6 max-w-[740px] mx-auto text-lg leading-relaxed text-red-100">
              Islamic services, calendar events, and community programs. Stay updated
              with the latest from Al-Asr Islamic Service.
            </p>
            <div className="flex justify-center mt-8">
              <div className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl shadow-xl border border-white/30 transform hover:scale-105 transition-all duration-300">
                <p className="font-bold text-base">
                  Islamic Calendar • Services • Community
                </p>
              </div>
            </div>
          </div>
        </div>

        <CategoriesNavbar />

        <SidebarMenu
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />
      </div>
    </header>
  );
};

export default Header;
