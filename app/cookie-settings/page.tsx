'use client';
import React from 'react';
import { useCookie, CookieCategory } from '@/contexts/CookieContext';

export default function CookieSettingsPage() {
  const { preferences, updatePreference, savePreferences } = useCookie();

  const cookieCategories = [
    {
      id: 'necessary' as CookieCategory,
      title: 'Strictly Necessary Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.',
      required: true
    },
    {
      id: 'functional' as CookieCategory,
      title: 'Functional Cookies',
      description: 'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.'
    },
    {
      id: 'performance' as CookieCategory,
      title: 'Performance Cookies',
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.'
    },
    {
      id: 'targeting' as CookieCategory,
      title: 'Targeting Cookies',
      description: 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.'
    }
  ];

  const handleToggle = (category: CookieCategory, enabled: boolean) => {
    updatePreference(category, enabled);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cookie Preferences
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Customize your cookie preferences. You can change these settings at any time.
          </p>

          <div className="space-y-6">
            {cookieCategories.map(category => (
              <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    {category.required ? (
                      <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded">
                        Always Active
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggle(category.id, false)}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            !preferences[category.id]
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          Block
                        </button>
                        <button
                          onClick={() => handleToggle(category.id, true)}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            preferences[category.id]
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          Allow
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {category.description}
                </p>
                
                {/* Additional information for each category */}
                {category.id === 'necessary' && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.
                  </p>
                )}
                
                {category.id === 'functional' && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    If you do not allow these cookies then some or all of these services may not function properly.
                  </p>
                )}
                
                {category.id === 'performance' && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.
                  </p>
                )}
                
                {category.id === 'targeting' && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Current Preferences Summary */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Your Current Preferences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <span className="font-semibold block">Necessary:</span>
                <span className="text-green-600">✓ Always Active</span>
              </div>
              <div className="text-center">
                <span className="font-semibold block">Functional:</span>
                <span className={`${preferences.functional ? 'text-green-600' : 'text-red-600'}`}>
                  {preferences.functional ? '✓ Allowed' : '✗ Blocked'}
                </span>
              </div>
              <div className="text-center">
                <span className="font-semibold block">Performance:</span>
                <span className={`${preferences.performance ? 'text-green-600' : 'text-red-600'}`}>
                  {preferences.performance ? '✓ Allowed' : '✗ Blocked'}
                </span>
              </div>
              <div className="text-center">
                <span className="font-semibold block">Targeting:</span>
                <span className={`${preferences.targeting ? 'text-green-600' : 'text-red-600'}`}>
                  {preferences.targeting ? '✓ Allowed' : '✗ Blocked'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => savePreferences()}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Save Preferences
            </button>
            <button
              onClick={() => {
                // Reset to default preferences
                updatePreference('functional', false);
                updatePreference('performance', false);
                updatePreference('targeting', false);
              }}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Reset to Default
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              More Information About Cookies
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              To learn more about cookies, please read our{' '}
              <a href="/cookies-policy" className="underline hover:no-underline font-semibold">
                Cookies Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}