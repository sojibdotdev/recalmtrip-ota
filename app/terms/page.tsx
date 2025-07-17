"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl bai-jamjuree-bold text-gray-900">Terms of Service</CardTitle>
              <p className="text-gray-600 bai-jamjuree-regular">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6 text-gray-700 bai-jamjuree-regular">
                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using RecalmTrip's services, you accept and agree to be bound by the terms and
                    provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">2. Use License</h2>
                  <p>
                    Permission is granted to temporarily download one copy of the materials on RecalmTrip's website for
                    personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                    title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">3. Booking and Payment</h2>
                  <p>
                    All bookings made through RecalmTrip are subject to availability and confirmation. Payment must be
                    made in full at the time of booking unless otherwise specified. We accept various payment methods
                    including credit cards, debit cards, and digital wallets.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">4. Cancellation Policy</h2>
                  <p>
                    Cancellation policies vary depending on the service provider and type of booking. Please review the
                    specific cancellation terms for your booking before confirming your reservation. Refunds, if
                    applicable, will be processed according to the terms specified at the time of booking.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">5. Privacy Policy</h2>
                  <p>
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                    information when you use our services. By using our services, you agree to the collection and use of
                    information in accordance with our Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
                  <p>
                    RecalmTrip acts as an intermediary between you and travel service providers. We are not liable for
                    any direct, indirect, incidental, or consequential damages arising from your use of our services or
                    any travel arrangements made through our platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl bai-jamjuree-bold text-gray-900 mb-3">7. Contact Information</h2>
                  <p>
                    If you have any questions about these Terms of Service, please contact us at:
                    <br />
                    Email: support@recalmtrip.com
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
