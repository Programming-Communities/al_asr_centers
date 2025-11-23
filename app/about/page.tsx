import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Target, 
  Eye, 
  BookOpen, 
  Heart, 
  Users, 
  GraduationCap,
  Calendar,
  Clock,
  HelpCircle,
  ArrowRight,
  Star,
  Shield,
  Globe
} from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    {
      icon: BookOpen,
      title: 'Quran & Sunnah',
      description: 'Guided by the Holy Quran and authentic teachings of Prophet Muhammad (PBUH)',
      color: 'text-blue-600'
    },
    {
      icon: Star,
      title: 'Spiritual Excellence',
      description: 'Focusing on inner purification and connection with Allah',
      color: 'text-amber-600'
    },
    {
      icon: Users,
      title: 'Community Service',
      description: 'Serving humanity with compassion and dedication',
      color: 'text-green-600'
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Promoting Islamic knowledge and lifelong learning',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Unity',
      description: 'Building bridges and fostering brotherhood among Muslims',
      color: 'text-indigo-600'
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Showing mercy and kindness to all of Allah\'s creation',
      color: 'text-pink-600'
    }
  ];

  const services = [
    { 
      name: 'Daily Prayers', 
      count: '5 Times', 
      icon: Clock,
      description: 'Regular congregational prayers'
    },
    { 
      name: 'Quran Classes', 
      count: 'All Ages', 
      icon: BookOpen,
      description: 'Comprehensive Quran education'
    },
    { 
      name: 'Islamic Events', 
      count: 'Monthly', 
      icon: Calendar,
      description: 'Spiritual gatherings & programs'
    },
    { 
      name: 'Community Help', 
      count: '24/7', 
      icon: HelpCircle,
      description: 'Support and guidance services'
    }
  ];

  const stats = [
    { number: '500+', label: 'Community Members' },
    { number: '50+', label: 'Weekly Programs' },
    { number: '10+', label: 'Qualified Teachers' },
    { number: '5+', label: 'Years of Service' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative py-20 bg-linear-to-r from-red-900 via-red-800 to-red-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Trusted Islamic Center</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                About <span className="text-red-200">Al-Asr</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-red-100 leading-relaxed mb-8 max-w-3xl mx-auto">
                Your trusted platform for authentic Islamic teachings, spiritual guidance, 
                and comprehensive community services. Serving with faith and dedication.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-red-200 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Mission */}
              <div className="group relative">
                <div className="absolute -inset-4 bg-linear-to-r from-red-600 to-red-700 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-center">
                    To provide authentic Islamic education, spiritual nourishment, and community 
                    services that help Muslims practice their faith with understanding and devotion. 
                    We strive to be a beacon of light and guidance for the ummah through comprehensive 
                    programs and compassionate service.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="group relative">
                <div className="absolute -inset-4 bg-linear-to-r from-green-600 to-green-700 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-center">
                    To establish a vibrant Islamic community center that serves as a hub for 
                    spiritual growth, educational excellence, and social harmony. We envision 
                    a community united in faith, empowered by knowledge, and dedicated to serving 
                    humanity with compassion and excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The principles that guide our service to the community and our relationship with Allah
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 ${value.color.replace('text', 'bg')} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                What We Offer
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive Islamic services designed to nurture your faith and strengthen our community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={index}
                    className="group text-center p-8 bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {service.name}
                    </h3>
                    <p className="text-red-600 dark:text-red-400 font-semibold text-lg mb-3">
                      {service.count}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Link 
                href="/services" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:gap-4"
              >
                Explore All Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-linear-to-r from-red-900 to-red-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Become part of our spiritual family and experience the beauty of Islamic brotherhood, 
                learning, and service together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/contact" 
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/services" 
                  className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-red-600 transition-all duration-300 font-semibold text-lg"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}