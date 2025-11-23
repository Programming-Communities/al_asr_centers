import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center">
            {/* Animated Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="text-5xl">🎪</div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce">
                <div className="w-4 h-4 bg-yellow-200 rounded-full m-2"></div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Islamic Events
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
              🚧 Under Construction 🚧
            </p>

            {/* Description */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We're preparing an exciting events calendar with Islamic conferences, seminars, 
                community gatherings, and spiritual programs to enrich your faith journey.
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Upcoming Events:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🕌</span>
                    <span className="text-gray-700 dark:text-gray-300">Friday Sermons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <span className="text-gray-700 dark:text-gray-300">Islamic Seminars</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <span className="text-gray-700 dark:text-gray-300">Youth Programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                    <span className="text-gray-700 dark:text-gray-300">Family Gatherings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌙</span>
                    <span className="text-gray-700 dark:text-gray-300">Ramadan Events</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <span className="text-gray-700 dark:text-gray-300">Eid Celebrations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Development Progress</span>
                <span>70%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-linear-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '70%' }}
                ></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-h-14"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 min-h-14"
              >
                <span>📅</span>
                Get Event Updates
              </Link>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-indigo-200 dark:border-indigo-800 max-w-md mx-auto">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Expected Launch
              </h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">15</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Days</div>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">08</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Hours</div>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">30</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Minutes</div>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">45</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Seconds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-linear-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
            <p className="mb-6 opacity-90">
              Get notified about upcoming Islamic events and programs
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-12">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}