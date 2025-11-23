import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function QuranClassesPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center">
            {/* Animated Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="text-5xl">📖</div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce">
                <div className="w-4 h-4 bg-yellow-200 rounded-full m-2"></div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Quran Classes
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
              🚧 Under Construction 🚧
            </p>

            {/* Description */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We're developing comprehensive Quran learning programs for all ages and levels, 
                from basic Tajweed to advanced Quranic studies with qualified teachers.
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Learning Programs:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👶</span>
                    <span className="text-gray-700 dark:text-gray-300">Kids Quran</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <span className="text-gray-700 dark:text-gray-300">Tajweed Rules</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧠</span>
                    <span className="text-gray-700 dark:text-gray-300">Quran Memorization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔊</span>
                    <span className="text-gray-700 dark:text-gray-300">Recitation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <span className="text-gray-700 dark:text-gray-300">Online Classes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👨‍🏫</span>
                    <span className="text-gray-700 dark:text-gray-300">Qualified Teachers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Development Progress</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-h-14"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 min-h-14"
              >
                <span>📧</span>
                Express Interest
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}