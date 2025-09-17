"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FlightDeals() {
  const deals = [
    {
      route: "Dhaka to Bangkok",
      price: "৳35,000",
      dates: "May 30 - Jun 6",
      airline: "Thai Airways",
    },
    {
      route: "Dhaka to Dubai",
      price: "৳42,000",
      dates: "Jun 1 - Jun 8",
      airline: "Emirates",
    },
    {
      route: "Dhaka to Kuala Lumpur",
      price: "৳28,000",
      dates: "May 28 - Jun 4",
      airline: "Malaysia Airlines",
    },
    {
      route: "Chittagong to Cox's Bazar",
      price: "৳8,500",
      dates: "Jun 2 - Jun 5",
      airline: "US-Bangla",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl bai-jamjuree-bold text-gray-900">Find flight deals to popular destinations</h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="bai-jamjuree-semibold">
            See all flights
          </Button>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {deals.map((deal, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="text-lg bai-jamjuree-semibold text-gray-900">{deal.route}</h3>
                  <div className="text-2xl bai-jamjuree-bold text-blue-600">{deal.price}</div>
                  <div className="text-sm text-gray-600 bai-jamjuree-regular">{deal.dates}</div>
                  <div className="text-sm text-gray-500 bai-jamjuree-regular">{deal.airline}</div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold">View Deal</Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  )
}
