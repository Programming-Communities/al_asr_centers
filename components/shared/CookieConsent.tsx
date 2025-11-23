'use client';
import React from 'react';
import { useCookie } from '@/contexts/CookieContext';

const CookieConsent: React.FC = () => {
  const {
    preferences,
    showBanner,
    updatePreference,
    savePreferences,
    rejectAll,
    acceptAll,
    showSettings,
    setShowSettings
  } = useCookie();

  if (!showBanner) return null;

  const cookieCategories = [
    {
      id: 'necessary' as const,
      title: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function and cannot be disabled.',
      required: true,
      disabled: true
    },
    {
      id: 'functional' as const,
      title: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      required: false,
      disabled: false
    },
    {
      id: 'performance' as const,
      title: 'Performance Cookies',
      description: 'These cookies help us analyze website usage and improve user experience.',
      required: false,
      disabled: false
    },
    {
      id: 'targeting' as const,
      title: 'Targeting Cookies',
      description: 'These cookies are used to deliver relevant advertisements to you.',
      required: false,
      disabled: false
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto p-4">
        {/* Simple View */}
        {!showSettings && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🍪 Cookie Preferences
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We use cookies to enhance your experience. You can choose your preferences.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Preferences
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        )}

        {/* Detailed Settings View */}
        {showSettings && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Below are descriptions of each cookie category. You can enable or disable them according to your preferences.
            </p>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cookieCategories.map(category => (
                <div key={category.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1 mr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category.title}
                      </span>
                      {category.required && (
                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {category.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences[category.id]}
                      onChange={(e) => updatePreference(category.id, e.target.checked)}
                      disabled={category.disabled}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                      ${category.disabled ? 'opacity-50 cursor-not-allowed' : 'peer-checked:bg-red-600'} 
                      peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5
                      after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => savePreferences()}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;