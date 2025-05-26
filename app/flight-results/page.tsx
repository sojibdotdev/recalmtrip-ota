"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSkeleton from "@/components/loading-skeleton"
import { useState, useEffect } from "react"
import SearchFilters from "@/components/search-filters"
import SearchSummary from "@/components/search-summary"

export default function FlightResults() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)

  const searchData = {
    from: searchParams?.get("from") || "Dhaka",
    to: searchParams?.get("to") || "Bangkok",
    departDate: searchParams?.get("departDate") || "2024-05-30",
    returnDate: searchParams?.get("returnDate") || "2024-06-01",
    travelers: searchParams?.get("travelers") || "1",
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const flightResults = [
    {
      id: 1,
      airline: "Thai Airways",
      logo: "/placeholder.svg?height=40&width=40&text=TG",
      departure: { time: "10:30", airport: "DAC", city: "Dhaka" },
      arrival: { time: "14:45", airport: "BKK", city: "Bangkok" },
      duration: "4h 15m",
      stops: "Non-stop",
      price: "৳35,000",
      class: "Economy",
      available: 8,
    },
    {
      id: 2,
      airline: "Emirates",
      logo: "/placeholder.svg?height=40&width=40&text=EK",
      departure: { time: "23:45", airport: "DAC", city: "Dhaka" },
      arrival: { time: "06:30+1", airport: "BKK", city: "Bangkok" },
      duration: "8h 45m",
      stops: "1 stop in Dubai",
      price: "৳42,500",
      class: "Economy",
      available: 12,
    },
    {
      id: 3,
      airline: "Malaysia Airlines",
      logo: "/placeholder.svg?height=40&width=40&text=MH",
      departure: { time: "08:15", airport: "DAC", city: "Dhaka" },
      arrival: { time: "13:30", airport: "BKK", city: "Bangkok" },
      duration: "7h 15m",
      stops: "1 stop in Kuala Lumpur",
      price: "৳28,900",
      class: "Economy",
      available: 5,
    },
    {
      id: 4,
      airline: "Singapore Airlines",
      logo: "/placeholder.svg?height=40&width=40&text=SQ",
      departure: { time: "16:20", airport: "DAC", city: "Dhaka" },
      arrival: { time: "22:10", airport: "BKK", city: "Bangkok" },
      duration: "7h 50m",
      stops: "1 stop in Singapore",
      price: "৳38,700",
      class: "Economy",
      available: 15,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Summary */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 mb-6 shadow-sm"
        >
          <SearchSummary type="flight" searchData={searchData} />
        </motion.div>

        {/* Results Header */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters type="flight" />
          </div>

          {/* Results Content */}
          <div className="flex-1">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-6"
            >
              <h1 className="text-2xl bai-jamjuree-bold text-gray-900">
                {loading ? "Searching flights..." : `${flightResults.length} flights found`}
              </h1>
              <div className="text-sm text-gray-500 bai-jamjuree-regular">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </motion.div>

            {/* Results */}
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {flightResults.map((flight, index) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                          {/* Airline Info */}
                          <div className="flex items-center space-x-3">
                            <img
                              src={flight.logo || "/placeholder.svg"}
                              alt={flight.airline}
                              className="w-10 h-10 rounded"
                            />
                            <div>
                              <div className="bai-jamjuree-semibold text-gray-900">{flight.airline}</div>
                              <div className="text-sm text-gray-500">{flight.class}</div>
                            </div>
                          </div>

                          {/* Flight Details */}
                          <div className="lg:col-span-2">
                            <div className="flex items-center justify-between">
                              <div className="text-center">
                                <div className="text-xl bai-jamjuree-bold text-gray-900">{flight.departure.time}</div>
                                <div className="text-sm text-gray-500">{flight.departure.airport}</div>
                                <div className="text-xs text-gray-400">{flight.departure.city}</div>
                              </div>

                              <div className="flex-1 px-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <div className="flex-1 border-t border-gray-300"></div>
                                  <Plane className="w-4 h-4 text-blue-600" />
                                  <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <div className="text-center mt-1">
                                  <div className="text-xs text-gray-500">{flight.duration}</div>
                                  <div className="text-xs text-gray-400">{flight.stops}</div>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-xl bai-jamjuree-bold text-gray-900">{flight.arrival.time}</div>
                                <div className="text-sm text-gray-500">{flight.arrival.airport}</div>
                                <div className="text-xs text-gray-400">{flight.arrival.city}</div>
                              </div>
                            </div>
                          </div>

                          {/* Price and Book */}
                          <div className="text-center lg:text-right">
                            <div className="text-2xl bai-jamjuree-bold text-blue-600 mb-1">{flight.price}</div>
                            <div className="text-xs text-gray-500 mb-3">per person</div>
                            <Badge variant="secondary" className="mb-3">
                              {flight.available} seats left
                            </Badge>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold">
                                Select Flight
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Results Message */}
            {!loading && flightResults.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl bai-jamjuree-semibold text-gray-600 mb-2">No flights found</h2>
                <p className="text-gray-500 bai-jamjuree-regular">Try adjusting your search criteria or dates</p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
