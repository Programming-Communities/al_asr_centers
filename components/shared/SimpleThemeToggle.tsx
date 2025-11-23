'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sun, Moon, Monitor, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SimpleThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  // Theme options with enhanced data
  const themeOptions = [
    { 
      value: 'light' as const, 
      label: 'Light', 
      icon: Sun,
      description: 'Light theme',
      color: 'text-amber-500'
    },
    { 
      value: 'dark' as const, 
      label: 'Dark', 
      icon: Moon,
      description: 'Dark theme',
      color: 'text-blue-400'
    },
    { 
      value: 'system' as const, 
      label: 'System', 
      icon: Monitor,
      description: 'Follow system preference',
      color: 'text-green-500'
    },
  ];

  // Get current theme data
  const currentTheme = themeOptions.find(option => option.value === theme) || themeOptions[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "flex items-center gap-2 px-3 py-2 h-9",
            "transition-all duration-200",
            "hover:scale-105 hover:shadow-md",
            "active:scale-95",
            "border-2 border-muted-foreground/20",
            "bg-background hover:bg-accent",
            "group"
          )}
        >
          <div className={cn(
            "flex items-center gap-2",
            currentTheme.color
          )}>
            <currentTheme.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="text-sm font-medium hidden sm:inline-block">
              {currentTheme.label}
            </span>
          </div>
          <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:opacity-80 group-data-[state=open]:rotate-180" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2 backdrop-blur-sm bg-background/95 border-2 shadow-xl"
      >
        {/* Custom Dropdown Menu Label */}
        <div className="px-2 py-1.5 text-sm font-semibold flex items-center gap-2 border-b border-border pb-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Theme Preferences
        </div>
        
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.value;
          const isSystemTheme = option.value === 'system' && theme === 'system';
          
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                "flex items-center justify-between gap-3 px-3 py-3",
                "rounded-md cursor-pointer transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
                "focus:bg-accent focus:text-accent-foreground",
                "group/item",
                isActive && "bg-accent text-accent-foreground font-semibold shadow-inner"
              )}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={cn(
                  "p-1.5 rounded-md transition-all duration-200",
                  "group-hover/item:scale-110 group-hover/item:bg-background",
                  option.color,
                  isActive && "bg-background scale-110"
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground opacity-80">
                    {option.description}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isSystemTheme && systemTheme && (
                  <span className="text-xs text-muted-foreground capitalize">
                    ({systemTheme})
                  </span>
                )}
                {isActive && (
                  <Check className="h-4 w-4 text-primary animate-in zoom-in duration-200" />
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
        
        {/* Custom Separator */}
        <div className="h-px bg-border my-2" />
        
        {/* Current Theme Info */}
        <div className="px-3 py-2 text-xs text-muted-foreground flex items-center justify-between">
          <span>Current Theme:</span>
          <span className="font-medium text-foreground capitalize">
            {theme === 'system' ? `${systemTheme} (System)` : theme}
          </span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Compact version for mobile/small screens
export function CompactThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const themeOptions = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  const currentTheme = themeOptions.find(option => option.value === theme) || themeOptions[2];
  const Icon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9 relative group"
        >
          <Icon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        {themeOptions.map((option) => {
          const OptionIcon = option.icon;
          const isActive = theme === option.value;
          
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                "flex items-center gap-3",
                isActive && "bg-accent font-medium"
              )}
            >
              <OptionIcon className="h-4 w-4" />
              <span>{option.label}</span>
              {isActive && <Check className="h-3 w-3 ml-auto" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SimpleThemeToggle;