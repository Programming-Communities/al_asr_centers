// app/other-services/page.tsx
import Layout from "@/components/layout/Layout";
import BlogList from "@/components/blog/BlogList";
import ContactCard from "@/components/ui/ContactCard";

export default function OtherServices() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-green-600 to-emerald-700 dark:from-green-700 dark:to-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Other Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Explore our additional Islamic educational services and community programs beyond Quran classes
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ContactCard 
            title="Online Quran Tuition Academies"
            subtitle="دین اور قرآن مجید پڑھنے اور سمجھنے کے بہترین مراکز"
            contacts={["+923005121412", "+923174009812"]}
            websites={["pakquranacademy.com", "www.shiaquranteachers.com"]}
            description="For online Quran classes please contact us. Join our comprehensive Quran learning programs with qualified teachers."
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Additional Services
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Islamic Studies:</strong> Comprehensive courses on Islamic history, theology, and jurisprudence
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Arabic Language:</strong> Learn Arabic to understand Quran in its original language
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Tajweed & Tarteel:</strong> Perfect your Quran recitation with proper pronunciation
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Memorization (Hifz):</strong> Structured program for Quran memorization
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Islamic Counseling:</strong> Spiritual guidance and personal counseling
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Articles & Updates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay updated with our latest educational content and community news
            </p>
          </div>
          <BlogList />
        </div>

        {/* Features Section */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Services?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Qualified Teachers</h3>
              <p className="text-gray-600 dark:text-gray-300">Learn from certified and experienced Islamic scholars</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Flexible Timing</h3>
              <p className="text-gray-600 dark:text-gray-300">Classes available according to your schedule</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Safe Environment</h3>
              <p className="text-gray-600 dark:text-gray-300">Secure and comfortable learning platform for all ages</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;