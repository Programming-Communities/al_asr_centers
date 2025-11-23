'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type CookiePreference = {
  necessary: boolean;
  functional: boolean;
  performance: boolean;
  targeting: boolean;
  timestamp: number;
};

export type CookieCategory = keyof Omit<CookiePreference, 'timestamp'>;

export const DEFAULT_COOKIE_PREFERENCES: CookiePreference = {
  necessary: true,
  functional: false,
  performance: false,
  targeting: false,
  timestamp: 0
};

interface CookieContextType {
  preferences: CookiePreference;
  showBanner: boolean;
  updatePreference: (category: CookieCategory, enabled: boolean) => void;
  savePreferences: (customPreferences?: Partial<CookiePreference>) => void;
  rejectAll: () => void;
  acceptAll: () => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreference>(DEFAULT_COOKIE_PREFERENCES);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedPreferences = getCookiePreferences();
    setPreferences(savedPreferences);

    if (!hasCookieConsent()) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const updatePreference = (category: CookieCategory, enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: enabled
    }));
  };

  const savePreferences = (customPreferences?: Partial<CookiePreference>) => {
    const newPreferences = customPreferences 
      ? { ...preferences, ...customPreferences, timestamp: Date.now() }
      : { ...preferences, timestamp: Date.now() };

    setCookiePreferences(newPreferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const rejectedPreferences: CookiePreference = {
      necessary: true,
      functional: false,
      performance: false,
      targeting: false,
      timestamp: Date.now()
    };
    
    setPreferences(rejectedPreferences);
    savePreferences(rejectedPreferences);
  };

  const acceptAll = () => {
    const acceptedPreferences: CookiePreference = {
      necessary: true,
      functional: true,
      performance: true,
      targeting: true,
      timestamp: Date.now()
    };
    
    setPreferences(acceptedPreferences);
    savePreferences(acceptedPreferences);
  };

  return (
    <CookieContext.Provider value={{
      preferences,
      showBanner,
      updatePreference,
      savePreferences,
      rejectAll,
      acceptAll,
      showSettings,
      setShowSettings
    }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

// Cookie utilities
function getCookiePreferences(): CookiePreference {
  if (typeof window === 'undefined') return DEFAULT_COOKIE_PREFERENCES;

  try {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('al-asr-cookie-consent='));
    
    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  } catch (error) {
    console.error('Error reading cookie preferences:', error);
  }
  
  return DEFAULT_COOKIE_PREFERENCES;
}

function setCookiePreferences(preferences: CookiePreference): void {
  if (typeof window === 'undefined') return;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 365);

  const cookieValue = encodeURIComponent(JSON.stringify(preferences));
  document.cookie = `al-asr-cookie-consent=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
}

function hasCookieConsent(): boolean {
  const preferences = getCookiePreferences();
  return preferences.timestamp > 0;
}