// app/terms-of-service/page.tsx
import Layout from '@/components/layout/Layout';

export default function TermsOfService() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
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
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  By accessing and using Al-Asr Education Services ("we," "our," or "us"), 
                  you agree to be bound by these Terms of Service. If you disagree with any 
                  part of these terms, you may not access our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Educational Services
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We provide free educational services including:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Programming and AI courses</li>
                  <li>Design and development tutorials</li>
                  <li>Language learning programs</li>
                  <li>Community-based learning through Discord</li>
                  <li>Educational resources and materials</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  All services are provided free of cost as part of our open-source initiative.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. User Responsibilities
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  As a user of our services, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Provide accurate information when required</li>
                  <li>Maintain the security of your Discord account</li>
                  <li>Respect other community members and instructors</li>
                  <li>Not engage in harassment, spam, or inappropriate behavior</li>
                  <li>Use educational resources for personal learning purposes</li>
                  <li>Comply with Discord's Terms of Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Code of Conduct
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our community is built on mutual respect and learning. Prohibited behaviors include:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Harassment or discrimination of any kind</li>
                  <li>Sharing inappropriate or offensive content</li>
                  <li>Spamming or flooding chat channels</li>
                  <li>Impersonating instructors or staff</li>
                  <li>Sharing malicious software or links</li>
                  <li>Commercial solicitation without permission</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Intellectual Property
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  All educational content, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Course materials and curriculum</li>
                  <li>Tutorial videos and presentations</li>
                  <li>Code examples and projects</li>
                  <li>Documentation and guides</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  are provided under open-source licenses for educational purposes. 
                  You may use these materials for learning but may not claim them as your own.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Disclaimer of Warranties
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Our services are provided "as is" and "as available" without any warranties. 
                  We do not guarantee that:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
                  <li>The services will be uninterrupted or error-free</li>
                  <li>The educational content will meet your specific needs</li>
                  <li>You will achieve any particular learning outcomes</li>
                  <li>The services will be available at all times</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  To the fullest extent permitted by law, Al-Asr Education Services shall not 
                  be liable for any indirect, incidental, special, consequential, or punitive 
                  damages resulting from your use or inability to use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Termination
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may terminate or suspend your access to our services immediately, without 
                  prior notice, for conduct that we believe violates these Terms of Service or 
                  is harmful to other users.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Changes to Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We reserve the right to modify these terms at any time. We will notify users 
                  of significant changes through our Discord server and website. Continued use 
                  of our services after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Governing Law
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  These Terms shall be governed by and construed in accordance with the laws of 
                  Pakistan, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. Contact Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  For any questions about these Terms of Service, please contact us:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
                  <li>Email: legal@al-asr.centers.pk</li>
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