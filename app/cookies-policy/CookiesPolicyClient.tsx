'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCookie } from '@/contexts/CookieContext';

export default function CookiesPolicyClient() {
  const { acceptAll, rejectAll, savePreferences, preferences } = useCookie();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('visited_cookies_policy');
    if (!hasVisited) {
      sessionStorage.setItem('visited_cookies_policy', 'true');
    }
  }, []);

  const handleAllowFunctional = () => {
    savePreferences({ ...preferences, functional: true });
  };

  const handleAllowPerformance = () => {
    savePreferences({ ...preferences, performance: true });
  };

  const handleBlockTargeting = () => {
    savePreferences({ ...preferences, targeting: false });
  };

  const handleConfirmChoices = () => {
    savePreferences();
    alert('Your preferences have been saved!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 dark:text-green-600 mb-4">
            Cookies Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-4">
              Understanding Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you visit our website, it may store or retrieve information on your browser, 
              mostly in the form of cookies. This information might be about you, your preferences, 
              or your device and is primarily used to make the site work as you expect it to.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The information does not usually directly identify you, but it can give you a more 
              personalized web experience. Because we respect your right to privacy, you can choose 
              not to allow some types of cookies.
            </p>
          </section>

          {/* Cookie Preferences */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-4">
              Manage Your Cookie Preferences
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700 dark:text-yellow-300">
                <strong>Your Opt Out Preference Signal is Honored</strong>
              </p>
            </div>

            {/* Cookie Management CTA */}
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Control Your Cookie Preferences
              </h3>
              <p className="text-green-800 dark:text-green-200 mb-3">
                You can modify your cookie preferences at any time:
              </p>
              <Link 
                href="/cookie-settings" 
                className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors min-h-12 font-semibold"
                aria-label="Modify cookie preferences"
              >
                Modify Cookie Preferences
              </Link>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-6">
              {/* Strictly Necessary Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Strictly Necessary Cookies
                    </h3>
                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-2 py-1 rounded mt-2">
                      Always Active
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These cookies are necessary for the website to function and cannot be switched off 
                  in our systems. They are usually only set in response to actions made by you which 
                  amount to a request for services, such as setting your privacy preferences, logging 
                  in or filling in forms.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  You can set your browser to block or alert you about these cookies, but some parts 
                  of the site will not then work. These cookies do not store any personally identifiable 
                  information.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Functional Cookies
                  </h3>
                  <button 
                    onClick={handleAllowFunctional}
                    className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition-colors min-h-12 font-semibold"
                    aria-label={`${preferences.functional ? 'Disable' : 'Enable'} functional cookies`}
                  >
                    {preferences.functional ? 'Allowed' : 'Allow'}
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These cookies enable the website to provide enhanced functionality and personalisation. 
                  They may be set by us or by third party providers whose services we have added to our pages.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  If you do not allow these cookies then some or all of these services may not function properly.
                </p>
              </div>

              {/* Performance Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Performance Cookies
                  </h3>
                  <button 
                    onClick={handleAllowPerformance}
                    className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition-colors min-h-12 font-semibold"
                    aria-label={`${preferences.performance ? 'Disable' : 'Enable'} performance cookies`}
                  >
                    {preferences.performance ? 'Allowed' : 'Allow'}
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These cookies allow us to count visits and traffic sources so we can measure and 
                  improve the performance of our site. They help us to know which pages are the most 
                  and least popular and see how visitors move around the site.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  All information these cookies collect is aggregated and therefore anonymous. If you 
                  do not allow these cookies we will not know when you have visited our site, and will 
                  not be able to monitor its performance.
                </p>
              </div>

              {/* Targeting Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Targeting Cookies
                  </h3>
                  <button 
                    onClick={handleBlockTargeting}
                    className={`px-6 py-3 rounded transition-colors min-h-12 font-semibold ${
                      preferences.targeting 
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500' 
                        : 'bg-red-700 text-white hover:bg-red-800'
                    }`}
                    aria-label={`${preferences.targeting ? 'Block' : 'Unblock'} targeting cookies`}
                  >
                    {preferences.targeting ? 'Block' : 'Blocked'}
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These cookies may be set through our site by our advertising partners. They may be 
                  used by those companies to build a profile of your interests and show you relevant 
                  adverts on other sites.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  They do not store directly personal information, but are based on uniquely identifying 
                  your browser and internet device. If you do not allow these cookies, you will experience 
                  less targeted advertising.
                </p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={acceptAll}
              className="bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 transition-colors font-semibold min-h-12"
              aria-label="Allow all cookies"
            >
              Allow All Cookies
            </button>
            <button 
              onClick={rejectAll}
              className="bg-gray-700 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold min-h-12"
              aria-label="Reject all cookies"
            >
              Reject All
            </button>
            <button 
              onClick={handleConfirmChoices}
              className="bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold min-h-12"
              aria-label="Confirm my cookie choices"
            >
              Confirm My Choices
            </button>
          </div>

          {/* Additional Information */}
          <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-4">
              Additional Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  How to Manage Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You can manage your cookie preferences through your browser settings. Most browsers 
                  allow you to refuse cookies or delete existing ones.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Contact Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  If you have any questions about our Cookies Policy, please contact us through 
                  our contact page.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors min-h-10"
                  aria-label="Visit contact page"
                >
                  Visit Contact Page
                </Link>
              </div>
            </div>
          </section>

          {/* Current Preferences Status */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Your Current Preferences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <span className="font-semibold">Necessary:</span>
                <span className="ml-2 text-green-600">✓ Active</span>
              </div>
              <div className="text-center">
                <span className="font-semibold">Functional:</span>
                <span className={`ml-2 ${preferences.functional ? 'text-green-600' : 'text-red-600'}`}>
                  {preferences.functional ? '✓ Active' : '✗ Inactive'}
                </span>
              </div>
              <div className="text-center">
                <span className="font-semibold">Performance:</span>
                <span className={`ml-2 ${preferences.performance ? 'text-green-600' : 'text-red-600'}`}>
                  {preferences.performance ? '✓ Active' : '✗ Inactive'}
                </span>
              </div>
              <div className="text-center">
                <span className="font-semibold">Targeting:</span>
                <span className={`ml-2 ${preferences.targeting ? 'text-green-600' : 'text-red-600'}`}>
                  {preferences.targeting ? '✓ Active' : '✗ Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}