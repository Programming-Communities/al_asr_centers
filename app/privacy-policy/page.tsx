// app/privacy-policy/page.tsx
import Layout from '@/components/layout/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  At Al-Asr Education Services, we are committed to protecting your privacy. 
                  We collect minimal information necessary to provide our educational services.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Discord username and profile information (when you join our server)</li>
                  <li>Course enrollment and participation data</li>
                  <li>Communication history within our educational channels</li>
                  <li>Technical information (browser type, IP address) for analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>To provide and maintain our educational services</li>
                  <li>To communicate with you about course updates and announcements</li>
                  <li>To improve our courses and teaching methods</li>
                  <li>To ensure a safe and productive learning environment</li>
                  <li>To analyze usage patterns for service improvement</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Data Sharing and Disclosure
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect the rights and safety of our community</li>
                  <li>With service providers who assist in our operations (under strict confidentiality)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Data Security
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We implement appropriate security measures to protect your information. 
                  However, no method of transmission over the Internet is 100% secure. 
                  We use Discord's platform for communication and follow their security practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Your Rights
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of communications</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Cookies and Tracking
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Our website uses cookies to improve user experience. We use:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Third-Party Services
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Discord - for communication and course delivery</li>
                  <li>Google Analytics - for website analytics</li>
                  <li>Vercel - for website hosting</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Each service has its own privacy policy, and we encourage you to review them.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Children's Privacy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Our services are intended for users aged 13 and above. We do not knowingly 
                  collect personal information from children under 13. If we become aware of 
                  such collection, we will take steps to delete the information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Changes to This Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update this privacy policy from time to time. We will notify you of 
                  any changes by posting the new policy on this page and updating the 
                  "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
                  <li>Email: privacy@al-asr.centers.pk</li>
                  <li>Discord: Our official server</li>
                  <li>Website: https://al-asr.centers.pk</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}