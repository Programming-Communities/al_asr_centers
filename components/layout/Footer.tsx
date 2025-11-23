"use client";
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  Users,
  Calendar,
  BookOpen,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Events", href: "/events" },
    { name: "Prayer Times", href: "/prayer-times" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Islamic Calendar", href: "/islamic-calendar" },
    { name: "Quran Classes", href: "/quran-classes" },
    { name: "Community Programs", href: "/community-programs" },
    { name: "Religious Guidance", href: "/religious-guidance" },
    { name: "Education Services", href: "/education-services" },
    { name: "Funeral Services", href: "/funeral-services" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/shiaquranteachers",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/shiaquranteachers/",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:bg-sky-500",
    },
    {
      icon: Youtube,
      href: "#",
      label: "YouTube",
      color: "hover:bg-red-600",
    },
    {
      icon: Mail,
      href: "mailto:info@al-asr.centers.pk",
      label: "Email",
      color: "hover:bg-green-600",
    },
  ];

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🕌</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Al-Asr</h3>
                  <p className="text-red-300 text-sm">Islamic Service Center</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted platform for Islamic services, community programs,
                and spiritual guidance. Serving the Muslim community with faith
                and dedication.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span className="text-sm">Islamic Center, City, Country</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span className="text-sm">0300-8055414</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span className="text-sm">0313-8055414</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span className="text-sm">info@al-asr.centers.pk</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-400" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-400" />
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Services Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-400" />
                Other Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/other-services"
                    className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    Other Services
                  </a>
                </li>
              </ul>

              {/* Newsletter & Social */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  Stay Connected
                </h4>

                {/* Newsletter Signup */}
                <div className="mb-6">
                  <p className="text-gray-300 text-sm mb-3">
                    Subscribe to our newsletter for updates
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <p className="text-gray-300 text-sm mb-3">
                    Follow us on social media
                  </p>
                  <div className="flex gap-2">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-all duration-200 ${social.color} transform hover:scale-110`}
                          aria-label={social.label}
                          title={social.label}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Auth Buttons */}
                <div className="mt-6 flex gap-3">
                  <a
                    href="/login"
                    className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 text-center text-sm font-medium"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 text-center text-sm font-medium"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              {/* Copyright - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-400 text-sm">
                <span>© {currentYear} Al-Asr Islamic Service Center.</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center justify-center gap-1 flex-wrap">
                  Made with{" "}
                  <Heart className="w-4 h-4 text-red-400 fill-current mx-1" />{" "}
                  for the community by{" "}
                  <a
                    href="https://programming.communities.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 underline transition-colors duration-200 font-medium ml-1"
                  >
                    Programming Communities
                  </a>
                </span>
              </div>

              {/* Legal Links - Mobile Optimized */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-red-400 transition-colors whitespace-nowrap"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-red-400 transition-colors whitespace-nowrap"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies-policy"
                  className="text-gray-400 hover:text-red-400 transition-colors whitespace-nowrap"
                >
                  Cookies Policy
                </a>
                <a
                  href="/sitemap-page"
                  className="text-gray-400 hover:text-red-400 transition-colors whitespace-nowrap"
                >
                  Sitemap
                </a>
                <a
                  href="/sitemap.xml"
                  className="text-gray-400 hover:text-red-400 transition-colors whitespace-nowrap"
                >
                  XML Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-red-600 via-red-500 to-red-600" />
    </footer>
  );
};

export default Footer;