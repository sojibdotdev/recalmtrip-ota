"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl bai-jamjuree-bold text-gray-900">Privacy Policy</CardTitle>
              <p className="text-gray-600 bai-jamjuree-regular">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6 text-gray-700 bai-jamjuree-regular">
                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">1. Information We Collect</h2>
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Create an account or profile</li>
                    <li>Make a booking or purchase</li>
                    <li>Contact us for customer support</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Communicate with you about products, services, and events</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">3. Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your
                    consent, except as described in this policy. We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Travel service providers to complete your bookings</li>
                    <li>Payment processors to handle transactions</li>
                    <li>Service providers who assist us in operating our platform</li>
                    <li>Law enforcement when required by law</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">4. Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                    or electronic storage is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">5. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience on our website. You can
                    control cookie settings through your browser preferences, but disabling cookies may affect the
                    functionality of our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">6. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">7. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                    <br />
                    Email: privacy@recalmtrip.com
                    <br />
                    Phone: +880-1234-567890
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
