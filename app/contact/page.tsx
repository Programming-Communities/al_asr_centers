'use client';
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Loader2,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['+92 300 1234567', '+92 321 7654321'],
      description: 'Call us for immediate assistance',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['info@al-asr.org', 'support@al-asr.org'],
      description: 'Send us an email anytime',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Islamic Street', 'Karachi, Pakistan 75500'],
      description: 'Come visit our center',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Mon-Sun: 8:00 AM - 10:00 PM', 'Friday: 1:00 PM - 3:00 PM Break'],
      description: 'We are here to serve you',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const socialMedia = [
    {
      icon: Facebook,
      name: 'Facebook',
      url: '#',
      color: 'hover:bg-blue-600'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: '#',
      color: 'hover:bg-pink-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: '#',
      color: 'hover:bg-sky-500'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      url: '#',
      color: 'hover:bg-red-600'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      url: '#',
      color: 'hover:bg-green-600'
    }
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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Contact <span className="text-red-200">Us</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-red-100 leading-relaxed mb-8 max-w-3xl mx-auto">
                Get in touch with Al-Asr Islamic Service. We're here to answer your questions, 
                provide spiritual guidance, and help you connect with our vibrant community.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    We're always happy to hear from our community members. 
                    Reach out to us through any of the following channels.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div 
                        key={index} 
                        className="group flex items-start space-x-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                      >
                        <div className={`w-14 h-14 ${info.bgColor} dark:bg-opacity-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-6 h-6 ${info.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {info.title}
                          </h3>
                          <div className="space-y-1 mb-3">
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-gray-700 dark:text-gray-300 font-medium">
                                {detail}
                              </p>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Social Media */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {socialMedia.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.url}
                          className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white transform hover:scale-110`}
                          aria-label={social.name}
                          title={social.name}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="group inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 font-semibold"
                    >
                      Send Another Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Fill out the form below and we'll respond as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="+92 300 1234567"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Subject *
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="">Select a subject</option>
                            <option value="prayer">Prayer Services</option>
                            <option value="education">Islamic Education</option>
                            <option value="counseling">Spiritual Counseling</option>
                            <option value="events">Events & Programs</option>
                            <option value="marriage">Marriage Services</option>
                            <option value="funeral">Funeral Services</option>
                            <option value="donation">Donation Inquiry</option>
                            <option value="volunteer">Volunteer Opportunity</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
                          placeholder="Please describe your inquiry, question, or request in detail. We're here to help!"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending Message...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-3">
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </span>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}