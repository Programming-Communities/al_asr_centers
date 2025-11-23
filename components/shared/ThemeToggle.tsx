'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so we can avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme options with icons and labels
  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return (
      <Button 
        variant="outline" 
        size="icon" 
        className="w-10 h-10 relative"
        aria-label="Toggle theme"
      >
        <div className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const currentTheme = themeOptions.find(option => option.value === theme) || themeOptions[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={cn(
            "w-10 h-10 relative transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "border-2 hover:border-primary"
          )}
          aria-label={`Current theme: ${currentTheme.label}. Click to change theme`}
        >
          {/* Sun Icon for Light Theme */}
          <Sun className={cn(
            "h-[1.2rem] w-[1.2rem] absolute transition-all duration-300",
            "rotate-0 scale-100 text-amber-500",
            "dark:-rotate-90 dark:scale-0"
          )} />
          
          {/* Moon Icon for Dark Theme */}
          <Moon className={cn(
            "h-[1.2rem] w-[1.2rem] absolute transition-all duration-300",
            "rotate-90 scale-0 text-slate-400",
            "dark:rotate-0 dark:scale-100 dark:text-blue-400"
          )} />
          
          {/* Ripple Effect - Fixed gradient classes */}
          <span className={cn(
            "absolute inset-0 rounded-md transition-all duration-300",
            "bg-amber-200/0",
            "group-hover:bg-amber-200/20",
            "dark:group-hover:bg-blue-200/20"
          )} />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 p-2 backdrop-blur-sm bg-background/95 border-2"
      >
        <div className="px-2 py-1.5 text-sm font-semibold text-foreground/70">
          Theme
        </div>
        
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.value;
          
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                "flex items-center justify-between gap-3 px-3 py-2.5",
                "rounded-md cursor-pointer transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground font-medium"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "h-4 w-4 transition-colors",
                  option.value === 'light' && "text-amber-500",
                  option.value === 'dark' && "text-blue-400",
                  option.value === 'system' && "text-green-500"
                )} />
                <span className="text-sm">{option.label}</span>
              </div>
              
              {isActive && (
                <Check className="h-4 w-4 text-primary animate-in fade-in duration-200" />
              )}
            </DropdownMenuItem>
          );
        })}
        
        {/* Current Theme Info */}
        <div className="px-3 py-2 mt-2 text-xs text-foreground/50 border-t">
          Current: {currentTheme.label}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple version without dropdown - Just toggle between light/dark
export function SimpleThemeSwitch() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-10 h-10">
        <div className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 relative transition-all duration-300",
        "hover:scale-105 active:scale-95",
        "border-2 hover:border-primary"
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <Sun className={cn(
        "h-[1.2rem] w-[1.2rem] absolute transition-all duration-300",
        "rotate-0 scale-100 text-amber-500",
        "dark:-rotate-90 dark:scale-0"
      )} />
      
      <Moon className={cn(
        "h-[1.2rem] w-[1.2rem] absolute transition-all duration-300",
        "rotate-90 scale-0 text-slate-400",
        "dark:rotate-0 dark:scale-100 dark:text-blue-400"
      )} />
    </Button>
  );
}

export default ThemeToggle;