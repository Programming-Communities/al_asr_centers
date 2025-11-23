// components/education/EducationCard.tsx
'use client';
import React from 'react';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  time: string;
  schedule: string;
  level: string;
  discordLink: string;
  color: string;
  icon: string;
}

interface EducationCardProps {
  course: Course;
}

const EducationCard: React.FC<EducationCardProps> = ({ course }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Gradient Header */}
      <div className={`${course.color} h-2 w-full`}></div>
      
      <div className="p-6">
        {/* Course Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{course.icon}</div>
            <div>
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {course.level}
              </span>
            </div>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <span className="text-sm">👨‍🏫 {course.instructor}</span>
        </div>

        {/* Course Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span className="w-6">🕐</span>
            <span className="font-medium">{course.time}</span>
          </div>
          <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
            <span className="w-6 mt-1">📅</span>
            <span>{course.schedule}</span>
          </div>
        </div>

        {/* Join Button */}
        <a
          href={course.discordLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg text-sm"
        >
          <span className="mr-2">🎯</span>
          Join Class
        </a>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400 rounded-2xl transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default EducationCard;