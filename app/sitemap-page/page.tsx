import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap - Al-Asr Canvas',
  description: 'Complete sitemap of Al-Asr Canvas website',
};

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Cookies Policy', href: '/cookies-policy' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Education Services', href: '/education-services' },
        { name: 'Quran Classes', href: '/quran-classes' },
        { name: 'Religious Guidance', href: '/religious-guidance' },
        { name: 'Funeral Services', href: '/funeral-services' },
        { name: 'Community Programs', href: '/community-programs' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Prayer Times', href: '/prayer-times' },
        { name: 'Islamic Calendar', href: '/islamic-calendar' },
        { name: 'Events', href: '/events' },
        { name: 'Blog Posts', href: '/posts' },
        { name: 'Search', href: '/search' },
      ]
    },
    {
      title: 'Islamic Services',
      links: [
        { name: 'Daily Prayers', href: '/services/daily-prayers' },
        { name: 'Friday Sermons', href: '/services/friday-sermons' },
        { name: 'Islamic Lectures', href: '/services/lectures' },
        { name: 'Quran Recitation', href: '/services/quran-recitation' },
        { name: 'Islamic Counseling', href: '/services/counseling' },
      ]
    },
    {
      title: 'Educational Programs',
      links: [
        { name: 'Quran Memorization', href: '/education/quran-memorization' },
        { name: 'Arabic Language', href: '/education/arabic-language' },
        { name: 'Islamic Studies', href: '/education/islamic-studies' },
        { name: 'Children Programs', href: '/education/children' },
        { name: 'Adult Education', href: '/education/adult' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Volunteer Opportunities', href: '/community/volunteer' },
        { name: 'Charity Programs', href: '/community/charity' },
        { name: 'Youth Activities', href: '/community/youth' },
        { name: 'Family Events', href: '/community/family-events' },
        { name: 'Community Outreach', href: '/community/outreach' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Al-Asr Canvas Sitemap</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore all the pages and services available on our website. Find what you're looking for quickly and easily.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-green-700 mb-4 pb-2 border-b border-gray-200">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-700 hover:text-green-600 transition-colors flex items-center group"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:bg-green-600 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Link href="/" className="bg-green-50 text-green-700 py-3 rounded-lg hover:bg-green-100 transition-colors">
              Home
            </Link>
            <Link href="/about" className="bg-green-50 text-green-700 py-3 rounded-lg hover:bg-green-100 transition-colors">
              About
            </Link>
            <Link href="/services" className="bg-green-50 text-green-700 py-3 rounded-lg hover:bg-green-100 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="bg-green-50 text-green-700 py-3 rounded-lg hover:bg-green-100 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for?{' '}
            <Link href="/contact" className="text-green-600 hover:text-green-700 font-semibold">
              Contact us for assistance
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}