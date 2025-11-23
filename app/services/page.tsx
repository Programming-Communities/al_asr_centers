import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { 
  Home,  // Mosque کی جگہ Home استعمال کریں
  BookOpen, 
  Users, 
  Calendar,
  Clock,
  Heart,
  GraduationCap,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      category: "Prayer Services",
      icon: Home,  // Mosque کی جگہ Home
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      services: [
        {
          title: "Five Daily Prayers",
          description: "Regular congregational prayers with jamat timing and spiritual atmosphere",
          features: ["Azan System", "Congregational Prayer", "Friday Sermon", "Taraweeh in Ramadan"],
          timing: "5 Times Daily",
          popular: true
        },
        {
          title: "Jumu'ah Prayer",
          description: "Friday congregational prayer with comprehensive khutbah and community gathering",
          features: ["Arabic/Urdu Khutbah", "Large Congregation", "Parking Facility", "Family Section"],
          timing: "Friday 1:00 PM",
          popular: true
        },
        {
          title: "Taraweeh Prayers",
          description: "Special Ramadan night prayers with complete Quran recitation",
          features: ["Complete Quran Recitation", "Experienced Huffaz", "Iftar Arrangements", "Qiyam ul Layl"],
          timing: "Ramadan Nights",
          popular: false
        }
      ]
    },
    {
      category: "Educational Services",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      services: [
        {
          title: "Quran Classes",
          description: "Learn Quran with proper Tajweed, Tarteel, and understanding",
          features: ["One-on-One Sessions", "Qualified Teachers", "Flexible Timing", "Online Option"],
          timing: "Daily Classes",
          popular: true
        },
        {
          title: "Islamic Studies",
          description: "Comprehensive Islamic education covering all essential aspects of faith",
          features: ["Aqeedah & Fiqh", "Seerah Studies", "Islamic History", "Contemporary Issues"],
          timing: "Weekend Classes",
          popular: false
        },
        {
          title: "Arabic Language",
          description: "Master Arabic to understand Quran and Hadith directly",
          features: ["Modern Arabic", "Quranic Arabic", "Conversational Skills", "Grammar Focus"],
          timing: "Evening Classes",
          popular: false
        }
      ]
    },
    {
      category: "Community Services",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      services: [
        {
          title: "Marriage Services",
          description: "Islamic marriage ceremonies with proper guidance and counseling",
          features: ["Nikah Arrangements", "Pre-Marital Counseling", "Family Guidance", "Documentation"],
          timing: "By Appointment",
          popular: true
        },
        {
          title: "Funeral Services",
          description: "Complete Islamic funeral arrangements with dignity and respect",
          features: ["Ghusl Facilities", "Janazah Prayer", "Burial Assistance", "Family Support"],
          timing: "24/7 Available",
          popular: false
        },
        {
          title: "Counseling Services",
          description: "Professional Islamic counseling for spiritual and personal matters",
          features: ["Family Issues", "Spiritual Guidance", "Youth Counseling", "Crisis Support"],
          timing: "By Appointment",
          popular: false
        }
      ]
    },
    {
      category: "Special Programs",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      services: [
        {
          title: "Ramadan Programs",
          description: "Complete Ramadan services including iftar, prayers, and spiritual activities",
          features: ["Daily Iftar", "Qiyam ul Layl", "Quran Competition", "Charity Programs"],
          timing: "Ramadan Month",
          popular: true
        },
        {
          title: "Eid Celebrations",
          description: "Joyful Eid prayers and community gatherings for families",
          features: ["Eid Prayer", "Family Activities", "Community Feast", "Children Programs"],
          timing: "Eid Days",
          popular: true
        },
        {
          title: "Islamic Lectures",
          description: "Regular Islamic lectures by renowned scholars and speakers",
          features: ["Guest Scholars", "Q&A Sessions", "Youth Programs", "Women Sessions"],
          timing: "Weekly/Monthly",
          popular: false
        }
      ]
    }
  ];

  const stats = [
    { number: "1000+", label: "Community Members" },
    { number: "200+", label: "Weekly Participants" },
    { number: "15+", label: "Qualified Teachers" },
    { number: "7+", label: "Years Serving" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative py-20 bg-linear-to-r from-red-900 via-red-800 to-red-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Trusted Islamic Services</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Our <span className="text-red-200">Services</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-red-100 leading-relaxed mb-8 max-w-3xl mx-auto">
                Comprehensive Islamic services designed to nurture your faith, strengthen your connection with Allah, 
                and build a vibrant Muslim community through authentic teachings and compassionate service.
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

        {/* Services Grid */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {services.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <section key={categoryIndex} className="scroll-mt-20">
                    <div className="flex items-center justify-center mb-12">
                      <div className={`w-16 h-16 ${category.bgColor} dark:bg-opacity-20 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${category.color}`} />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {category.category}
                      </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.services.map((service, serviceIndex) => (
                        <div 
                          key={serviceIndex} 
                          className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
                        >
                          {service.popular && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                Popular
                              </span>
                            </div>
                          )}
                          
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors pr-4">
                                {service.title}
                              </h3>
                            </div>
                            
                            <div className="mb-4">
                              <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {service.timing}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                              {service.description}
                            </p>

                            <div className="space-y-3 mb-6">
                              {service.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-3">
                              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-all duration-300 text-sm font-semibold text-center group/btn">
                                <span className="flex items-center justify-center gap-2">
                                  Learn More
                                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                              </button>
                              <button className="flex-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 text-sm font-semibold text-center">
                                Enroll Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Highlights */}
        <section className="py-20 bg-linear-to-r from-red-600 to-red-700 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Our Services?</h2>
              <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
                Experience the difference of authentic Islamic services delivered with compassion, excellence, and dedication to the community
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: GraduationCap,
                  title: "Qualified Scholars",
                  description: "Learn from certified Islamic scholars with decades of teaching experience"
                },
                {
                  icon: BookOpen,
                  title: "Authentic Teachings",
                  description: "Pure Quran and Sunnah based teachings without any innovations or deviations"
                },
                {
                  icon: Heart,
                  title: "Community Focus",
                  description: "Services designed to strengthen family bonds and build a supportive community"
                }
              ].map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div key={index} className="text-center p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{highlight.title}</h3>
                    <p className="text-red-100 leading-relaxed">{highlight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of community members who have transformed their lives through our authentic Islamic services
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link 
                  href="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  Contact Us Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/about" 
                  className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all duration-300 font-semibold text-lg"
                >
                  <Mail className="w-5 h-5" />
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Quick Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+92 300 1234567</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@al-asr.org</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Open 24/7 for Emergencies</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}