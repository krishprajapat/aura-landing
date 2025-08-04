import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="font-anonymous text-4xl md:text-5xl font-bold text-brand-dark-brown mb-4">
            Privacy Policy
          </h1>
          <p className="font-dm-sans text-gray-600 text-lg">
            Last updated: January 1, 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none font-dm-sans">
          <p className="text-gray-700 leading-relaxed mb-8">
            At Vecteur, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
          </p>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              1. Information We Collect
            </h2>
            
            <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-3">
              Personal Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
              <li>Create an account on our website</li>
              <li>Make a purchase or attempt to make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us for customer support</li>
              <li>Participate in surveys, contests, or promotions</li>
            </ul>

            <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-3">
              Information We Collect Automatically
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
              <li>Processing and fulfilling your orders</li>
              <li>Providing customer service and support</li>
              <li>Sending you important information about your account or orders</li>
              <li>Personalizing your shopping experience</li>
              <li>Improving our website and services</li>
              <li>Marketing and promotional communications (with your consent)</li>
              <li>Fraud prevention and security</li>
              <li>Compliance with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              3. Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Types of cookies we use include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
              <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              6. Your Rights and Choices
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              7. Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              8. International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your information may be transferred to and processed in countries other than your own. We ensure that appropriate safeguards are in place to protect your personal information in accordance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-brand-warm-beige p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Email:</strong> privacy@vecteur.com
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Address:</strong> 123 Fashion District Street, New York, NY 10013, United States
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
