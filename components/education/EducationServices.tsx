// components/education/EducationServices.tsx
'use client';
import React from 'react';
import EducationCard, { Course } from './EducationCard';

const EducationServices: React.FC = () => {
  const educationData: Course[] = [
    {
      id: 1,
      title: "Modern AI Python",
      instructor: "Minahil Nawaz",
      time: "01:15 AM - 02:15 AM",
      schedule: "Saturday Sunday off",
      level: "Old Batch March",
      discordLink: "https://discord.gg/GuTYUPh7Dp",
      color: "bg-gradient-to-r from-purple-500 to-blue-500",
      icon: "🤖"
    },
    {
      id: 2,
      title: "AI Agent 201",
      instructor: "Laraib Nawaz",
      time: "02:00 AM - 03:00 AM",
      schedule: "Sunday off",
      level: "Old Batch",
      discordLink: "https://discord.gg/3BW7QYymNX",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
      icon: "🚀"
    },
    {
      id: 3,
      title: "WordPress Development",
      instructor: "Raja Danyal Mushtaq",
      time: "10:00 AM - 11:00 AM+",
      schedule: "Daily",
      level: "New Batch April",
      discordLink: "https://discord.gg/wBvQdZXhrT",
      color: "bg-gradient-to-r from-blue-500 to-indigo-500",
      icon: "💻"
    },
    {
      id: 4,
      title: "Flutter Development",
      instructor: "Jahanzeb Naseer",
      time: "07:00 PM - 08:00 PM",
      schedule: "Sunday off",
      level: "New Batch April",
      discordLink: "https://discord.gg/uDKrK6JVcf",
      color: "bg-gradient-to-r from-sky-400 to-blue-600",
      icon: "📱"
    },
    {
      id: 5,
      title: "English Speaking",
      instructor: "Ma'am Rabia Noreen",
      time: "07:00 PM - 08:00 PM",
      schedule: "Sunday off",
      level: "New Batch 21 April",
      discordLink: "https://discord.gg/7Pg7Y2zhPJ",
      color: "bg-gradient-to-r from-red-400 to-pink-500",
      icon: "🎯"
    },
    {
      id: 6,
      title: "Figma Design",
      instructor: "Shahbaz Asif",
      time: "07:00 PM - 08:00 PM",
      schedule: "Sunday off",
      level: "New Batch 21 April",
      discordLink: "https://discord.gg/TqJGcQxk4X",
      color: "bg-gradient-to-r from-orange-400 to-red-500",
      icon: "🎨"
    },
    {
      id: 7,
      title: "Quran Class",
      instructor: "Areeba Nawaz",
      time: "08:00 PM - 08:30 PM",
      schedule: "Wed, Thu, Sun off",
      level: "New Batch April",
      discordLink: "https://discord.gg/HMsv4HwW68",
      color: "bg-gradient-to-r from-emerald-500 to-green-600",
      icon: "📖"
    },
    {
      id: 8,
      title: "AI Agent Q3",
      instructor: "PIAIC Students",
      time: "09:00 PM - 10:00 PM+",
      schedule: "Mon, Tue, Fri, Sat",
      level: "Old Batch",
      discordLink: "https://discord.gg/AZSWdR4ZvG",
      color: "bg-gradient-to-r from-violet-500 to-purple-600",
      icon: "🧠"
    },
    {
      id: 9,
      title: "Python Collaboration",
      instructor: "Muhammad Uzair & Minahil Nawaz",
      time: "09:00 PM - 10:00 PM",
      schedule: "Mon, Tue, Fri, Sat",
      level: "New Batch April",
      discordLink: "https://discord.gg/T2nkvNHErU",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      icon: "🐍"
    },
    {
      id: 10,
      title: "Modern AI Python",
      instructor: "Ahmed Awan",
      time: "09:00 PM - 10:00 PM+",
      schedule: "Sunday off",
      level: "New Batch 21 April",
      discordLink: "https://discord.gg/94Jzgttrd8",
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
      icon: "🤖"
    },
    {
      id: 11,
      title: "IELTS Preparatory",
      instructor: "Humais Sheikh",
      time: "09:00 PM - 09:30 PM",
      schedule: "Mon:Reading, Tue:Writing, Wed:Listening, Thu:Speaking",
      level: "New Batch April",
      discordLink: "https://discord.gg/EwSZxTfFnt",
      color: "bg-gradient-to-r from-rose-500 to-pink-600",
      icon: "🎓"
    },
    {
      id: 12,
      title: "Fast API",
      instructor: "Muhammad Tahir",
      time: "10:00 PM - 11:30 PM+",
      schedule: "Daily",
      level: "New Batch April",
      discordLink: "https://discord.gg/rjuZm7a6Ak",
      color: "bg-gradient-to-r from-lime-500 to-green-500",
      icon: "⚡"
    },
    {
      id: 13,
      title: "Python GSI",
      instructor: "Syed Shoaib Sherazi",
      time: "10:30 PM - 11:30 PM",
      schedule: "Sunday off",
      level: "New Batch 17 April",
      discordLink: "https://discord.gg/CwncR7KnSQ",
      color: "bg-gradient-to-r from-amber-500 to-yellow-500",
      icon: "🏆"
    },
    {
      id: 14,
      title: "JavaScript & TypeScript",
      instructor: "Muhammad Uzair",
      time: "11:30 PM - 12:30 AM",
      schedule: "Sunday off",
      level: "New Batch April",
      discordLink: "https://discord.gg/3UutHj6xuy",
      color: "bg-gradient-to-r from-blue-600 to-indigo-700",
      icon: "📘"
    },
    {
      id: 15,
      title: "Full Stack Development",
      instructor: "Muhammad Uzair",
      time: "11:30 PM - 12:30 AM",
      schedule: "Sunday off",
      level: "New Batch April",
      discordLink: "https://discord.gg/Gtw2eCw2dv",
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
      icon: "💼"
    },
    {
      id: 16,
      title: "C++ Programming",
      instructor: "Hamna",
      time: "11:00 PM - 11:59 PM",
      schedule: "Sunday off",
      level: "New Batch 17 April",
      discordLink: "https://discord.gg/rtZCnY5BYK",
      color: "bg-gradient-to-r from-gray-600 to-gray-800",
      icon: "⚙️"
    },
    {
      id: 17,
      title: "NextJS Development",
      instructor: "Muhammad Fahad Jabbar",
      time: "12:00 AM - 01:00 AM",
      schedule: "Next class 21 April",
      level: "Old Batch",
      discordLink: "https://discord.gg/vAAmjeWw4m",
      color: "bg-gradient-to-r from-black to-gray-800",
      icon: "▲"
    },
    {
      id: 18,
      title: "Portfolio Development",
      instructor: "Professional Team",
      time: "Few weeks break",
      schedule: "Coming Soon",
      level: "New Batch April",
      discordLink: "https://discord.gg/RFVEw3ZS5f",
      color: "bg-gradient-to-r from-indigo-500 to-purple-600",
      icon: "💎"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Education Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our free Discord education server with professional courses in programming, 
            AI, design, and more. Open source and free for everyone!
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
              🎓 100% Free & Open Source
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600">18+</div>
            <div className="text-gray-600 dark:text-gray-300">Courses</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600">Free</div>
            <div className="text-gray-600 dark:text-gray-300">Cost</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Support</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-orange-600">Expert</div>
            <div className="text-gray-600 dark:text-gray-300">Instructors</div>
          </div>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {educationData.map((course) => (
            <EducationCard key={course.id} course={course} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Join our Discord community today and access all these courses for free!
          </p>
          <a
            href="https://discord.com/servers/programming-communities-1317258064105308261"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg"
          >
            <span className="mr-3">🎮</span>
            Join Discord Server
          </a>
        </div>
      </div>
    </div>
  );
};

export default EducationServices;