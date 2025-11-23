import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ReligiousGuidancePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center">
            {/* Animated Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="text-5xl">🕌</div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce">
                <div className="w-4 h-4 bg-yellow-200 rounded-full m-2"></div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Religious Guidance
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-purple-600 dark:text-purple-400 font-semibold mb-4">
              🚧 Under Construction 🚧
            </p>

            {/* Description */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We're building a comprehensive religious guidance platform with Islamic scholars, 
                fatwa services, counseling sessions, and educational resources for your spiritual journey.
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Guidance Services:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👨‍⚖️</span>
                    <span className="text-gray-700 dark:text-gray-300">Islamic Scholars</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📜</span>
                    <span className="text-gray-700 dark:text-gray-300">Fatwa Services</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <span className="text-gray-700 dark:text-gray-300">Counseling</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <span className="text-gray-700 dark:text-gray-300">Islamic Rulings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🕋</span>
                    <span className="text-gray-700 dark:text-gray-300">Spiritual Advice</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌙</span>
                    <span className="text-gray-700 dark:text-gray-300">Religious Queries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Development Progress</span>
                <span>50%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-linear-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '50%' }}
                ></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-h-14"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 min-h-14"
              >
                <span>📧</span>
                Seek Guidance
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}